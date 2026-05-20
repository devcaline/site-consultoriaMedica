"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { ChevronRight, Users, Zap, Globe, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { RotatingText } from './RotatingText';
import { copy } from '@/content/copy';
import { assetUrl } from '@/lib/utils';

interface Dot {
    x: number;
    y: number;
    baseColor: string;
    targetOpacity: number;
    currentOpacity: number;
    opacitySpeed: number;
    baseRadius: number;
    currentRadius: number;
}

const GetStartedButton = () => {
    const phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE || '5571999999999';
    const rawMessage = import.meta.env.VITE_WHATSAPP_MESSAGE || 'Olá! Vi o site e gostaria de saber como vocês podem me ajudar!';
    const message = encodeURIComponent(rawMessage);
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${message}&type=phone_number&app_absent=0`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center bg-[#C9C5B1] text-black rounded-lg border border-[#C9C5B1] shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer"
        >
            {/* Loading Animation Overlay */}
            <div className="absolute inset-0 bg-[#d9d2b6] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>

            {/* Main Button Section */}
            <div className="relative z-10 px-8 py-4 text-lg font-medium group-hover:opacity-0 transition-opacity duration-300">
                Começar Agora
            </div>

            {/* Icon that appears on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <ChevronRight size={24} strokeWidth={2} className="text-black" />
            </div>
        </a>
    );
};

const ModernHeroSection = ({ title, subtitle }: { title?: string; subtitle?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameId = useRef<number | null>(null);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 10);
    });

    const dotsRef = useRef<Dot[]>([]);
    const gridRef = useRef<Record<string, number[]>>({});
    const canvasSizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });
    const mousePositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

    const DOT_SPACING = 30;
    const BASE_OPACITY_MIN = 0.3;
    const BASE_OPACITY_MAX = 0.6;
    const BASE_RADIUS = 1.5;
    const INTERACTION_RADIUS = 120;
    const INTERACTION_RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;
    const OPACITY_BOOST = 0.7;
    const RADIUS_BOOST = 3;
    const GRID_CELL_SIZE = Math.max(50, Math.floor(INTERACTION_RADIUS / 1.5));

    const handleMouseMove = useCallback((event: globalThis.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) {
            mousePositionRef.current = { x: null, y: null };
            return;
        }
        const rect = canvas.getBoundingClientRect();
        const canvasX = event.clientX - rect.left;
        const canvasY = event.clientY - rect.top;
        mousePositionRef.current = { x: canvasX, y: canvasY };
    }, []);

    const createDots = useCallback(() => {
        const { width, height } = canvasSizeRef.current;
        if (width === 0 || height === 0) return;

        const newDots: Dot[] = [];
        const newGrid: Record<string, number[]> = {};
        const cols = Math.ceil(width / DOT_SPACING);
        const rows = Math.ceil(height / DOT_SPACING);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const x = i * DOT_SPACING + DOT_SPACING / 2;
                const y = j * DOT_SPACING + DOT_SPACING / 2;
                const cellX = Math.floor(x / GRID_CELL_SIZE);
                const cellY = Math.floor(y / GRID_CELL_SIZE);
                const cellKey = `${cellX}_${cellY}`;

                if (!newGrid[cellKey]) {
                    newGrid[cellKey] = [];
                }

                const dotIndex = newDots.length;
                newGrid[cellKey].push(dotIndex);

                const baseOpacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN;
                newDots.push({
                    x,
                    y,
                    baseColor: `rgba(75, 85, 99, ${BASE_OPACITY_MAX})`,
                    targetOpacity: baseOpacity,
                    currentOpacity: baseOpacity,
                    opacitySpeed: (Math.random() * 0.005) + 0.002,
                    baseRadius: BASE_RADIUS,
                    currentRadius: BASE_RADIUS,
                });
            }
        }
        dotsRef.current = newDots;
        gridRef.current = newGrid;
    }, [DOT_SPACING, GRID_CELL_SIZE, BASE_OPACITY_MIN, BASE_OPACITY_MAX, BASE_RADIUS]);

    const handleResize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const container = canvas.parentElement;
        const width = container ? container.clientWidth : window.innerWidth;
        const height = container ? container.clientHeight : window.innerHeight;

        if (canvas.width !== width || canvas.height !== height ||
            canvasSizeRef.current.width !== width || canvasSizeRef.current.height !== height) {
            canvas.width = width;
            canvas.height = height;
            canvasSizeRef.current = { width, height };
            createDots();
        }
    }, [createDots]);

    const animateDots = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const dots = dotsRef.current;
        const grid = gridRef.current;
        const { width, height } = canvasSizeRef.current;
        const { x: mouseX, y: mouseY } = mousePositionRef.current;

        if (!ctx || !dots || !grid || width === 0 || height === 0) {
            animationFrameId.current = requestAnimationFrame(animateDots);
            return;
        }

        ctx.clearRect(0, 0, width, height);

        const activeDotIndices = new Set<number>();
        if (mouseX !== null && mouseY !== null) {
            const mouseCellX = Math.floor(mouseX / GRID_CELL_SIZE);
            const mouseCellY = Math.floor(mouseY / GRID_CELL_SIZE);
            const searchRadius = Math.ceil(INTERACTION_RADIUS / GRID_CELL_SIZE);
            for (let i = -searchRadius; i <= searchRadius; i++) {
                for (let j = -searchRadius; j <= searchRadius; j++) {
                    const checkCellX = mouseCellX + i;
                    const checkCellY = mouseCellY + j;
                    const cellKey = `${checkCellX}_${checkCellY}`;
                    if (grid[cellKey]) {
                        grid[cellKey].forEach(dotIndex => activeDotIndices.add(dotIndex));
                    }
                }
            }
        }

        dots.forEach((dot, index) => {
            dot.currentOpacity += dot.opacitySpeed;
            if (dot.currentOpacity >= dot.targetOpacity || dot.currentOpacity <= BASE_OPACITY_MIN) {
                dot.opacitySpeed = -dot.opacitySpeed;
                dot.currentOpacity = Math.max(BASE_OPACITY_MIN, Math.min(dot.currentOpacity, BASE_OPACITY_MAX));
                dot.targetOpacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN;
            }

            let interactionFactor = 0;
            dot.currentRadius = dot.baseRadius;

            if (mouseX !== null && mouseY !== null && activeDotIndices.has(index)) {
                const dx = dot.x - mouseX;
                const dy = dot.y - mouseY;
                const distSq = dx * dx + dy * dy;

                if (distSq < INTERACTION_RADIUS_SQ) {
                    const distance = Math.sqrt(distSq);
                    interactionFactor = Math.max(0, 1 - distance / INTERACTION_RADIUS);
                    interactionFactor = interactionFactor * interactionFactor;
                }
            }

            const finalOpacity = Math.min(1, dot.currentOpacity + interactionFactor * OPACITY_BOOST);
            dot.currentRadius = dot.baseRadius + interactionFactor * RADIUS_BOOST;

            ctx.beginPath();
            ctx.fillStyle = `rgba(75, 85, 99, ${finalOpacity.toFixed(3)})`;
            ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
            ctx.fill();
        });

        animationFrameId.current = requestAnimationFrame(animateDots);
    }, [GRID_CELL_SIZE, INTERACTION_RADIUS, INTERACTION_RADIUS_SQ, OPACITY_BOOST, RADIUS_BOOST, BASE_OPACITY_MIN, BASE_OPACITY_MAX, BASE_RADIUS]);

    useEffect(() => {
        handleResize();
        const canvasElement = canvasRef.current;
        const handleMouseLeave = () => {
            mousePositionRef.current = { x: null, y: null };
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('resize', handleResize);
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);

        animationFrameId.current = requestAnimationFrame(animateDots);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [handleResize, handleMouseMove, animateDots]);

    const contentDelay = 0.3;
    const itemDelayIncrement = 0.15;

    const heroVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 40 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1 } }
    };

    const shapeVariants = {
        hidden: { opacity: 0, scale: 0.8, rotate: -10 },
        visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1.2 } }
    };

    const mainTitle = typeof title === 'object' && title !== null ? (title as any).fixo : title;
    const rotatingTexts = (typeof title === 'object' && title !== null && (title as any).dinamicos?.length > 0)
        ? (title as any).dinamicos
        : copy.hero.rotating;

    return (
        <div className="relative bg-background dark:bg-[#0E0F10] text-foreground dark:text-[#E7E7E7] min-h-screen flex flex-col overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />

            {/* Formas abstratas decorativas */}
            <motion.div
                className="absolute top-20 right-10 w-32 h-32 bg-gray-500/20 rounded-full blur-xl"
                variants={shapeVariants}
                initial="hidden"
                animate="visible"
                custom={0.5}
            />
            <motion.div
                className="absolute top-40 left-20 w-24 h-24 bg-gray-600/30 rounded-lg rotate-45 blur-lg"
                variants={shapeVariants}
                initial="hidden"
                animate="visible"
                custom={0.8}
            />
            <motion.div
                className="absolute bottom-32 right-32 w-40 h-40 bg-gray-400/15 rounded-full blur-2xl"
                variants={shapeVariants}
                initial="hidden"
                animate="visible"
                custom={1.1}
            />

            <main className="flex-grow flex items-center justify-center relative z-10 pt-20 md:pt-24">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Coluna de conteúdo */}
                        <div className="space-y-8 w-full hero-conteudo-centralizado">
                            <motion.div
                                variants={heroVariants}
                                initial="hidden"
                                animate="visible"
                                custom={contentDelay}
                                className="space-y-6 w-full"
                            >
                                <div className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-24 sm:mt-8 md:mt-0 font-poppins w-full">
                                    <h1 className="hero-titulo text-black dark:text-[#E7E7E7]">{mainTitle || copy.hero.headline}</h1>
                                    <div className="flex w-full hero-flex-center">
                                        <span className="text-gray-800 dark:text-[#E7E7E7]">
                                            <RotatingText
                                                texts={rotatingTexts}
                                                mainClassName="text-black dark:text-[#E7E7E7]"
                                                staggerDuration={0.02}
                                                rotationInterval={5000}
                                            />
                                        </span>
                                    </div>
                                </div>

                                <p className="text-lg md:text-xl text-muted-foreground dark:text-[#B6B6B6] max-w-2xl font-inter font-light hero-paragrafo">
                                    {subtitle || copy.hero.paragraph}
                                </p>
                            </motion.div>

                            <motion.div
                                variants={heroVariants}
                                initial="hidden"
                                animate="visible"
                                custom={contentDelay + itemDelayIncrement}
                                className="flex w-full hero-flex-center"
                            >
                                <GetStartedButton />
                            </motion.div>

                            <motion.div
                                variants={heroVariants}
                                initial="hidden"
                                animate="visible"
                                custom={contentDelay + itemDelayIncrement * 2}
                                className="flex flex-wrap w-full items-center gap-4 sm:gap-8 pt-4 hero-flex-center"
                            >
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="h-4 w-4 text-gray-700 dark:text-[#B6B6B6]" />
                                    <span>300+ Clínicas</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Zap className="h-4 w-4 text-gray-700 dark:text-[#B6B6B6]" />
                                    <span>2x Faturamento</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Globe className="h-4 w-4 text-gray-700 dark:text-[#B6B6B6]" />
                                    <span>Brasil e Exterior</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Coluna de imagens */}
                        <motion.div
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                            className="relative"
                        >
                            {/* Badge de usuários */}
                            <div className="absolute top-0 right-0 bg-gray-100 dark:bg-[#15171A] px-4 py-2 rounded-xl shadow-lg dark:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.6)] z-10">
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                                        <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                                        <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-semibold text-gray-900 dark:text-gray-100">+127 novos</span>
                                        <br />
                                        <span className="text-gray-600 dark:text-gray-400 text-xs">usuários hoje</span>
                                    </div>
                                </div>
                            </div>

                            {/* Projeto concluído */}
                            <div className="absolute bottom-0 left-0 bg-white dark:bg-[#15171A] px-4 py-3 rounded-xl shadow-lg dark:shadow-[0_4px_30px_-8px_rgba(0,0,0,0.6)] z-10 animate-float-slow">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-200 dark:bg-[#1A1C1F] rounded-full flex items-center justify-center">
                                        <span className="text-gray-600 dark:text-[#B6B6B6] text-xs">✓</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-[#E7E7E7]">Projeto concluído!</p>
                                        <p className="text-xs text-gray-600 dark:text-[#B6B6B6]">há 2 minutos</p>
                                    </div>
                                </div>
                            </div>

                            {/* Grid de imagens */}
                            <div className="relative grid gap-4">
                                {/* Imagem principal */}
                                <div className="mb-4">
                                    <div className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-[#15171A] h-80">
                                        <img
                                            src={assetUrl('img/Storm-62.jpg')}
                                            alt="Storm Team"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Grid de imagens menores */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-[#15171A] h-32">
                                        <img
                                            src={assetUrl('img/Storm-73.jpg')}
                                            alt="Storm Team"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-[#15171A] h-32">
                                        <img
                                            src={assetUrl('img/Storm-69.jpg')}
                                            alt="Storm Team"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Elementos decorativos adicionais */}
                            <motion.div
                                className="absolute -top-4 -right-4 w-20 h-20 bg-gray-500/20 rounded-full blur-xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.6, 0.3]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <motion.div
                                className="absolute -bottom-6 -left-6 w-16 h-16 bg-gray-500/20 rounded-lg rotate-45 blur-lg"
                                animate={{
                                    rotate: [45, 90, 45],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ModernHeroSection;
