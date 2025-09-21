
'use client';

import { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export function useLiquidCursor() {
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) {
      return;
    }

    const cursorRoot = document.createElement('div');
    cursorRoot.id = 'liquid-cursor-root';
    document.body.appendChild(cursorRoot);
    
    const cursor = document.createElement('div');
    cursor.id = 'liquid-cursor';
    cursorRoot.appendChild(cursor);

    const cursorText = document.createElement('span');
    cursorText.id = 'liquid-cursor-text';
    cursor.appendChild(cursorText);

    let mouse = { x: -100, y: -100 };
    let pos = { x: 0, y: 0 };
    const speed = 0.1;
    
    const springConfig = { damping: 25, stiffness: 300 };
    const x = useSpring(mouse.x, springConfig);
    const y = useSpring(mouse.y, springConfig);

    const updatePosition = () => {
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;
      cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

      const delta = Math.sqrt(Math.pow(mouse.x - pos.x, 2) + Math.pow(mouse.y - pos.y, 2));
      const rotation = Math.atan2(mouse.y - pos.y, mouse.x - pos.x) * (180 / Math.PI);
      const scale = Math.min(delta / 400 + 1, 1.5);
      
      cursor.style.setProperty('--scale', `${scale}`);
      cursor.style.setProperty('--rotation', `${rotation}deg`);

      requestAnimationFrame(updatePosition);
    };

    const updateCursor = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      x.set(e.clientX);
      y.set(e.clientY);
    };
    
    const onMouseEnter = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      cursor.classList.add('grow');
      
      const text = target.getAttribute('data-cursor-text');
      if (text) {
        cursorText.innerText = text;
        cursor.classList.add('text-visible');
      }
    };
    
    const onMouseLeave = () => {
      cursor.classList.remove('grow');
      cursor.classList.remove('text-visible');
      cursorText.innerText = '';
    };

    updatePosition();
    window.addEventListener('mousemove', updateCursor);
    
    const interactiveElements = document.querySelectorAll(
      'a, button, [data-cursor-size]'
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      cursorRoot.remove();
    };
  }, []);
}
