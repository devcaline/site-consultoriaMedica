import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalCarouselProps {
    children: React.ReactNode[];
    className?: string;
    showDots?: boolean;
    showArrows?: boolean;
    snapScroll?: boolean;
    autoPlay?: boolean;
    autoPlayInterval?: number;
    itemWidthClass?: string;
    gap?: number;
}

const HorizontalCarousel = ({
    children,
    className = '',
    showDots = true,
    showArrows = true,
    snapScroll = true,
    autoPlay = false,
    autoPlayInterval = 5000,
    itemWidthClass = 'w-80',
    gap = 32
}: HorizontalCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [, setContainerReady] = useState(false); // força re-render após mount
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    const totalItems = children.length;

    // Refs para evitar stale closures e race conditions
    const currentIndexRef = useRef(0);
    const isAnimatingRef = useRef(false);
    const scrollDebounceRef = useRef<NodeJS.Timeout | null>(null);
    const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Sincronizar ref com state
    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    // Forçar re-render após mount para recalcular padding com o ref disponível
    useEffect(() => {
        const timer = setTimeout(() => setContainerReady(true), 50);
        return () => clearTimeout(timer);
    }, []);

    // Cleanup ao desmontar
    useEffect(() => {
        return () => {
            if (scrollDebounceRef.current) clearTimeout(scrollDebounceRef.current);
            if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, []);

    // Calcular padding para centralização
    const getPaddingValue = () => {
        if (!snapScroll) return 0;
        const container = scrollContainerRef.current;
        if (!container || container.children.length === 0) return 16;

        const firstChild = container.children[0] as HTMLElement;
        const itemWidth = firstChild?.offsetWidth || 280;
        const containerW = container.clientWidth;

        return Math.max((containerW - itemWidth) / 2, 16);
    };

    const paddingValue = getPaddingValue();
    const paddingStyle = {
        paddingLeft: `${paddingValue}px`,
        paddingRight: `${paddingValue}px`
    };

    // ============================================================
    // MOTOR DE NAVEGAÇÃO — scrollToIndex
    // NÃO mexe no scrollSnapType — deixa o snap SEMPRE ativo
    // para que ele AJUDE a centralizar, em vez de lutar contra ele
    // ============================================================
    const scrollToIndex = useCallback((targetIndex: number) => {
        const container = scrollContainerRef.current;
        if (!container || isAnimatingRef.current) return;

        // Clampar índice
        const index = Math.max(0, Math.min(targetIndex, totalItems - 1));

        const targetItem = container.children[index] as HTMLElement;
        if (!targetItem) return;

        // Marcar como animando para bloquear handleScroll e cliques
        isAnimatingRef.current = true;

        // Atualizar índice imediatamente (feedback visual dos dots)
        setCurrentIndex(index);
        currentIndexRef.current = index;

        // Calcular posição de centralização
        const containerWidth = container.clientWidth;
        const itemWidth = targetItem.offsetWidth;
        const itemOffset = targetItem.offsetLeft;
        const scrollPosition = itemOffset - ((containerWidth - itemWidth) / 2);

        // Executar scroll — o snap nativo VAI ajudar a estabilizar no centro
        container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });

        // Limpar timeout anterior
        if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);

        // Liberar interação após animação
        animationTimeoutRef.current = setTimeout(() => {
            isAnimatingRef.current = false;
        }, 500);
    }, [totalItems]);

    // Navegação por botões — uma única chamada a scrollToIndex
    const goToPrevious = useCallback(() => {
        if (isAnimatingRef.current) return;
        const idx = currentIndexRef.current;
        const newIndex = idx > 0 ? idx - 1 : totalItems - 1;
        scrollToIndex(newIndex);
    }, [totalItems, scrollToIndex]);

    const goToNext = useCallback(() => {
        if (isAnimatingRef.current) return;
        const idx = currentIndexRef.current;
        const newIndex = idx < totalItems - 1 ? idx + 1 : 0;
        scrollToIndex(newIndex);
    }, [totalItems, scrollToIndex]);

    // Navegação por dots
    const goToIndex = useCallback((index: number) => {
        if (isAnimatingRef.current) return;
        scrollToIndex(index);
    }, [scrollToIndex]);

    // Auto-play
    useEffect(() => {
        if (autoPlay && totalItems > 1) {
            autoPlayRef.current = setInterval(() => {
                goToNext();
            }, autoPlayInterval);
        }

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [autoPlay, autoPlayInterval, goToNext, totalItems]);

    // ============================================================
    // HANDLER DE SCROLL — só roda para swipe manual do usuário
    // Com debounce de 150ms para evitar atualizações intermediárias
    // ============================================================
    const handleScroll = useCallback(() => {
        // Ignorar completamente durante animação programática
        if (isAnimatingRef.current) return;

        const container = scrollContainerRef.current;
        if (!container) return;

        // Debounce: só processar quando o scroll parar
        if (scrollDebounceRef.current) clearTimeout(scrollDebounceRef.current);
        scrollDebounceRef.current = setTimeout(() => {
            if (isAnimatingRef.current || !container) return;

            const scrollLeft = container.scrollLeft;
            const containerCenter = scrollLeft + (container.clientWidth / 2);

            // Encontrar o item mais próximo do centro
            let closestIndex = 0;
            let minDistance = Infinity;

            for (let i = 0; i < container.children.length; i++) {
                const child = container.children[i] as HTMLElement;
                const childCenter = child.offsetLeft + (child.offsetWidth / 2);
                const distance = Math.abs(containerCenter - childCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = i;
                }
            }

            if (closestIndex !== currentIndexRef.current && closestIndex >= 0 && closestIndex < totalItems) {
                setCurrentIndex(closestIndex);
                currentIndexRef.current = closestIndex;
            }
        }, 150);
    }, [totalItems]);

    return (
        <div className={`relative ${className} w-full overflow-hidden`}>
            {/* Container de scroll */}
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto pb-4 scrollbar-hide w-full"
                style={{
                    scrollSnapType: snapScroll ? 'x mandatory' : 'none',
                    scrollBehavior: 'smooth',
                    gap: `${gap}px`,
                    ...paddingStyle,
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    WebkitOverflowScrolling: 'touch',
                    maxWidth: '100%'
                }}
                onScroll={handleScroll}
            >
                {children.map((child, index) => {
                    return (
                        <div
                            key={index}
                            className={`flex-shrink-0 ${itemWidthClass}`}
                            style={{
                                scrollSnapAlign: snapScroll ? 'center' : 'none',
                                scrollSnapStop: 'always',
                            }}
                        >
                            {child}
                        </div>
                    );
                })}
            </div>

            {/* Botões de navegação */}
            {showArrows && totalItems > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-2 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white hover:bg-gray-50 shadow-lg border border-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-xl z-30"
                        aria-label="Item anterior"
                    >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-2 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white hover:bg-gray-50 shadow-lg border border-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-xl z-30"
                        aria-label="Próximo item"
                    >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700" />
                    </button>
                </>
            )}

            {/* Indicadores (dots) */}
            {showDots && totalItems > 1 && (
                <div className="flex justify-center mt-3 space-x-0.5">
                    {Array.from({ length: totalItems }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentIndex
                                ? 'bg-gray-600 w-4'
                                : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            aria-label={`Ir para item ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HorizontalCarousel;
