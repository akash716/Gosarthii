import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const CARDS = [
    {
        num: "01",
        title: "Certified Luxury",
        text: "Every automobile undergoes a meticulous inspection before reaching you. Quality is never compromised — ever.",
        img: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80"
    },
    {
        num: "02",
        title: "Personalized Consultation",
        text: "We help you choose the right car, the right ownership experience and the right value. Every recommendation tailored to you.",
        img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80"
    },
    {
        num: "03",
        title: "Doorstep Experience",
        text: "From paperwork to delivery — everything handled personally by us. Your comfort and convenience are our priority throughout.",
        img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80"
    },
    {
        num: "04",
        title: "Premium Pre-Owned",
        text: "Handpicked luxury vehicles with verified history and uncompromised quality. Every car we present tells a story worth owning.",
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
    }
];
const Card = ({ card, i }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 30 });
    const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 30 });
    function handleMouseMove(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(px);
        mouseY.set(py);
    }
    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }
    return (<motion.div initial="initial" whileInView="visible" whileHover="hover" viewport={{ once: true, margin: "-50px" }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} transition={{
            duration: 0.8,
            delay: i * 0.1,
            ease: [0.19, 1, 0.22, 1]
        }} className="clickable group w-full md:min-w-[300px] lg:min-w-[380px] h-auto md:h-[420px] lg:h-[480px] bg-white/[0.02] border border-white/[0.08] p-8 md:p-10 flex flex-col justify-end relative overflow-hidden transition-all duration-700 ease-[0.19, 1, 0.22, 1] md:hover:-translate-y-4 hover:border-brand-red/60 hover:bg-white/[0.04] hover:shadow-[0_30px_60px_-15px_rgba(195,7,63,0.2)]" variants={{
            initial: { opacity: 0, scale: 0.92, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0 },
            hover: { y: -10, scale: 1.02 }
        }}>
      {/* Background Image with Parallax & Zoom */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden origin-center">
        <motion.div style={{ x, y }} className="w-[120%] h-[120%] -left-[10%] -top-[10%] absolute">
          <motion.img variants={{
            initial: { scale: 1, opacity: 0.05 },
            hover: { scale: 1.1, opacity: 0.2 }
        }} transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }} src={card.img} alt={card.title} className="w-full h-full object-cover grayscale"/>
        </motion.div>
        {/* Cinematic Gradient Fade */}
        <div className="absolute inset-0 bg-linear-to-t from-bg-card via-bg-card/80 to-transparent"/>
      </div>

      {/* Ambient Backlight Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-brand-red/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"/>
      
      <span className="absolute top-6 right-8 font-display text-8xl text-brand-red/[0.05] leading-none group-hover:text-brand-red/[0.12] transition-colors duration-500 z-10">
        {card.num}
      </span>

      <div className="relative z-10">
        <div className="w-8 h-px bg-brand-red mb-6"/>
        <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{
            visible: {
                transition: {
                    staggerChildren: 0.03,
                    delayChildren: 0.5 + (i * 0.1)
                }
            }
        }} className="font-display text-3xl tracking-wide mb-3 text-white">
          {card.title.split('').map((char, index) => (<motion.span key={index} variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
            }} transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }} className="inline-block">
              {char === ' ' ? '\u00A0' : char}
            </motion.span>))}
        </motion.h3>
        <p className="text-base font-light text-white/80 leading-relaxed tracking-wide group-hover:text-white transition-colors duration-500">
          {card.text}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-brand-red to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"/>
    </motion.div>);
};
export default function Experience() {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
    const lightX = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    useEffect(() => {
        const track = trackRef.current;
        const container = containerRef.current;
        if (!track || !container)
            return;
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
            const timer = setTimeout(() => {
                const totalWidth = track.scrollWidth - container.offsetWidth + 100;
                gsap.to(track, {
                    x: -totalWidth,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '#exp-wrap',
                        start: 'top top',
                        end: () => `+=${totalWidth}`,
                        scrub: 1,
                        pin: '#exp-stick',
                        pinSpacing: true,
                        invalidateOnRefresh: true,
                    },
                });
            }, 200);
            return () => clearTimeout(timer);
        });
        mm.add("(max-width: 767px)", () => {
            gsap.set(track, { x: 0 });
        });
        return () => mm.revert();
    }, []);
    return (<div ref={sectionRef} className="relative bg-bg-card overflow-hidden">
      {/* Immersive Section Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-[0.08] grayscale scale-125 brightness-50">
          <img src="https://images.unsplash.com/photo-1493238507139-91e8bef99c01?auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover" alt=""/>
        </motion.div>
        
        {/* Cinematic Light Leaks */}
        <motion.div style={{ x: lightX }} animate={{
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.1, 1]
        }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 -left-1/4 w-[80vw] h-[80vw] bg-brand-red/10 blur-[180px] rounded-full"/>
        
        <motion.div animate={{
            x: ["10%", "-10%"],
            opacity: [0.05, 0.1, 0.05]
        }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-brand-red/5 blur-[200px] rounded-full"/>

        {/* Technical Overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"/>
        
        <div className="absolute inset-0 bg-linear-to-b from-bg-card via-transparent to-bg-card"/>
        <div className="absolute inset-0 bg-linear-to-r from-bg-card via-transparent to-bg-card"/>
      </div>

      <div id="exp-stick" className="md:h-screen flex flex-col md:flex-row py-20 md:py-0 overflow-hidden relative z-10">
        {/* Left Fixed Panel */}
        <div className="w-full md:w-[300px] lg:w-[400px] md:h-full flex flex-col justify-center px-6 md:px-10 lg:px-16 z-10 bg-bg-card border-b md:border-b-0 md:border-r border-white/5 relative mb-12 md:mb-0">
          <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-linear-to-b from-transparent via-brand-red/30 to-transparent hidden md:block"/>
          
          <div className="mb-6 flex items-center gap-3">
             <div className="w-6 h-px bg-brand-red"/>
             <span className="text-[10px] tracking-[0.6em] text-brand-red uppercase">What We Offer</span>
          </div>
          
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] mb-6">
            WE DELIVER <br />
            <span className="font-serif italic font-light text-brand-red">Experiences</span>
          </h2>
          
          <div className="w-12 h-px bg-linear-to-r from-brand-red to-transparent mb-6"/>
          
          <p className="text-base font-light tracking-wider text-white/70 leading-relaxed max-w-xs">
            Luxury automotive consultation curated around trust, precision and personal attention.
          </p>
        </div>

        {/* Right Scrollable Panel */}
        <div ref={containerRef} className="flex-1 relative md:overflow-hidden md:h-full flex items-center">
          <div ref={trackRef} className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 px-6 md:px-12 lg:px-24 w-full md:w-auto">
            {CARDS.map((card, i) => (<Card key={i} card={card} i={i}/>))}
          </div>
        </div>
      </div>
    </div>);
}
