import { useCallback, useEffect, useRef } from 'react';

interface TouchGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  onTap?: () => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
  threshold?: number;
  longPressDelay?: number;
}

export const useTouchGestures = (options: TouchGestureOptions = {}) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onPinch,
    onTap,
    onDoubleTap,
    onLongPress,
    threshold = 50,
    longPressDelay = 500
  } = options;

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapRef = useRef<number>(0);
  const doubleTapDelay = 300;

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };

    // Long press detection
    if (onLongPress) {
      longPressTimerRef.current = setTimeout(() => {
        onLongPress();
      }, longPressDelay);
    }
  }, [onLongPress, longPressDelay]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    // Cancel long press if user moves
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    // Cancel long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    touchEndRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };

    const deltaX = touchEndRef.current.x - touchStartRef.current.x;
    const deltaY = touchEndRef.current.y - touchStartRef.current.y;
    const deltaTime = touchEndRef.current.time - touchStartRef.current.time;

    // Determine if it's a swipe or tap
    const isSwipe = Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold;
    const isQuickTouch = deltaTime < 300;

    if (isSwipe) {
      // Horizontal swipe
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > threshold && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < -threshold && onSwipeLeft) {
          onSwipeLeft();
        }
      }
      // Vertical swipe
      else {
        if (deltaY > threshold && onSwipeDown) {
          onSwipeDown();
        } else if (deltaY < -threshold && onSwipeUp) {
          onSwipeUp();
        }
      }
    } else if (isQuickTouch && onTap) {
      // Double tap detection
      const now = Date.now();
      if (now - lastTapRef.current < doubleTapDelay && onDoubleTap) {
        onDoubleTap();
        lastTapRef.current = 0; // Reset to prevent triple tap
      } else {
        onTap();
        lastTapRef.current = now;
      }
    }

    // Reset touch references
    touchStartRef.current = null;
    touchEndRef.current = null;
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onTap, onDoubleTap, threshold]);

  const handlePinch = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2 && onPinch) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );

      // Store initial distance for comparison
      if (!touchStartRef.current) {
        touchStartRef.current = { x: distance, y: 0, time: Date.now() };
      } else {
        const scale = distance / touchStartRef.current.x;
        onPinch(scale);
      }
    }
  }, [onPinch]);

  return {
    touchHandlers: {
      onTouchStart: handleTouchStart as any,
      onTouchMove: handleTouchMove as any,
      onTouchEnd: handleTouchEnd as any,
      onTouchStartCapture: handlePinch as any
    }
  };
};

// Hook específico para navegação por swipe
export const useSwipeNavigation = () => {
  const { touchHandlers } = useTouchGestures({
    onSwipeLeft: () => {
      // Navegar para próxima seção
      const sections = document.querySelectorAll('section[id]');
      const currentSection = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)?.closest('section[id]');
      
      if (currentSection) {
        const currentIndex = Array.from(sections).indexOf(currentSection);
        const nextSection = sections[currentIndex + 1];
        
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    onSwipeRight: () => {
      // Navegar para seção anterior
      const sections = document.querySelectorAll('section[id]');
      const currentSection = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)?.closest('section[id]');
      
      if (currentSection) {
        const currentIndex = Array.from(sections).indexOf(currentSection);
        const prevSection = sections[currentIndex - 1];
        
        if (prevSection) {
          prevSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    threshold: 100
  });

  return touchHandlers;
};

// Hook para pull-to-refresh
export const usePullToRefresh = (onRefresh: () => void) => {
  const { touchHandlers } = useTouchGestures({
    onSwipeDown: () => {
      // Verificar se está no topo da página
      if (window.scrollY === 0) {
        onRefresh();
      }
    },
    threshold: 150
  });

  return touchHandlers;
};
