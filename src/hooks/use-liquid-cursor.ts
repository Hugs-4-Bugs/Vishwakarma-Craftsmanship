
'use client';

import { useEffect } from 'react';
import { useSpring } from 'framer-motion';

export function useLiquidCursor() {
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    // Check for touch devices
    if ('ontouchstart' in window) {
      return;
    }
    
    // Create cursor elements only on client-side
    let cursorRoot = document.getElementById('liquid-cursor-root');
    if (!cursorRoot) {
      cursorRoot = document.createElement('div');
      cursorRoot.id = 'liquid-cursor-root';
      document.body.appendChild(cursorRoot);
    }
    
    // SVG filter for the gooey effect
    cursorRoot.innerHTML = `
      <svg id="goo-filter" width="0" height="0" style="position:absolute; top: -9999px; left: -9999px;">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div id="liquid-cursor-container">
        <div id="liquid-cursor"></div>
      </div>
    `;

    const cursorContainer = document.getElementById('liquid-cursor-container')!;
    const cursor = document.getElementById('liquid-cursor')!;

    const onMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const unsubscribeX = x.on("change", (latest) => {
        cursor.style.setProperty('--x', `${latest}px`);
    });
    const unsubscribeY = y.on("change", (latest) => {
        cursor.style.setProperty('--y', `${latest}px`);
    });

    const onMouseEnter = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      cursor.classList.add('grow');
      target.classList.add('cursor-hover-target');
    };
    
    const onMouseLeave = (e: MouseEvent) => {
       const target = e.currentTarget as HTMLElement;
      cursor.classList.remove('grow');
      target.classList.remove('cursor-hover-target');
    };

    window.addEventListener('mousemove', onMouseMove);
    
    const interactiveElements = document.querySelectorAll(
      'a, button, [data-cursor-interactive]'
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      if (document.body.contains(cursorRoot!)) {
        // document.body.removeChild(cursorRoot!);
      }
      unsubscribeX();
      unsubscribeY();
    };
  }, []);
}
