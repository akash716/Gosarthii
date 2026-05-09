import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
export default function Cursor() {
    const c1Ref = useRef(null);
    const c2Ref = useRef(null);
    const mgRef = useRef(null);
    useEffect(() => {
        const c1 = c1Ref.current;
        const c2 = c2Ref.current;
        const mg = mgRef.current;
        if (!c1 || !c2 || !mg)
            return;
        const moveCursor = (e) => {
            gsap.to(c1, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out',
            });
            gsap.to(c2, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.4,
                ease: 'power2.out',
            });
            gsap.to(mg, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
                ease: 'power2.out',
            });
        };
        const handleMouseEnter = () => {
            gsap.to(c2, { width: 56, height: 56, duration: 0.25, ease: 'power2.out' });
            gsap.to(c1, { opacity: 0, duration: 0.2 });
        };
        const handleMouseLeave = () => {
            gsap.to(c2, { width: 38, height: 38, duration: 0.3, ease: 'power2.out' });
            gsap.to(c1, { opacity: 1, duration: 0.2 });
        };
        window.addEventListener('mousemove', moveCursor);
        const interactables = document.querySelectorAll('button, a, .clickable');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });
        return () => {
            window.removeEventListener('mousemove', moveCursor);
            interactables.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);
    return (<div className="hidden lg:block">
      <div ref={c1Ref} className="fixed w-2 h-2 bg-brand-red rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"/>
      <div ref={c2Ref} className="fixed w-[38px] h-[38px] border border-brand-red/40 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"/>
      <div ref={mgRef} className="fixed w-[500px] h-[500px] rounded-full bg-radial-gradient from-brand-red/5 to-transparent pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2" style={{ background: 'radial-gradient(circle, rgba(195,7,63,.05) 0%, transparent 70%)' }}/>
    </div>);
}
