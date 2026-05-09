import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useTransform, useSpring, useMotionValue } from 'motion/react';
import { cn } from '@/src/lib/utils';
const SLIDES = [
    {
        id: '01',
        image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1920&q=85',
        eyebrow: "Engineering Emotion",
        title: ["NOT EVERY CAR", "IS JUST A CAR"],
        description: "The pinnacle of performance curated for the elite. A drive that transcends reality.",
        stats: { hp: "650", top: "330 km/h", zeroToHundred: "2.7s", torque: "800 nm" }
    },
    {
        id: '02',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=85',
        eyebrow: "The New Standard",
        title: ["ENGINEERING", "PURE EMOTION"],
        description: "Defining a new era of automotive excellence. Where innovation meets heritage.",
        stats: { hp: "580", top: "315 km/h", zeroToHundred: "3.2s", torque: "720 nm" }
    }
];
export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const containerRef = useRef(null);
    // Mouse Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
    const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });
    const moveX = useTransform(springX, [-0.5, 0.5], ["-3%", "3%"]);
    const moveY = useTransform(springY, [-0.5, 0.5], ["-3%", "3%"]);
    const textX = useTransform(springX, [-0.5, 0.5], [20, -20]);
    const textY = useTransform(springY, [-0.5, 0.5], [20, -20]);
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            mouseX.set((e.clientX / innerWidth) - 0.5);
            mouseY.set((e.clientY / innerHeight) - 0.5);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);
    return (<section ref={containerRef} id="hero" className="relative h-[100dvh] w-full flex flex-col justify-end overflow-hidden select-none bg-bg-dark">
      <AnimatePresence mode="wait">
        <motion.div key={currentSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute inset-0 z-0">
          {/* Main Parallax Image */}
          <motion.div style={{ x: moveX, y: moveY, scale: 1.1, backgroundImage: `url(${SLIDES[currentSlide].image})` }} className="absolute inset-0 bg-cover bg-center sm:bg-center"/>

          {/* Futuristic Overlay Layers */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Tech Scan Ring */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vh] h-[70vh] sm:w-[110vh] sm:h-[110vh] border border-brand-red/[0.02] rounded-full">
              <div className="absolute inset-0 border-[0.5px] border-dashed border-white/[0.03] rounded-full scale-[0.85]"/>
              <div className="absolute top-0 left-1/2 w-0.5 h-6 sm:h-8 bg-brand-red shadow-[0_0_15px_rgba(195,7,63,0.6)] -translate-x-1/2"/>
            </motion.div>

            {/* Depth Text Layer (Oversized bg text) */}
            <motion.div style={{ x: textX, y: textY }} className="absolute top-1/2 left-0 -translate-y-1/2 font-display text-[35vw] sm:text-[30vw] text-white opacity-[0.015] leading-none select-none -translate-x-1/4">
              {SLIDES[currentSlide].title[0].split(' ')[0]}
            </motion.div>
          </div>

          {/* Cinematic Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-bg-dark/40"/>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(195,7,63,0.03)_0%,transparent_80%)]"/>
          
          {/* Glass Reflection Overlay */}
          <div className="absolute inset-0 bg-linear-to-tr from-white/[0.03] via-transparent to-transparent pointer-events-none"/>
          <div className="absolute inset-0 z-10 pointer-events-none">
             <div className="absolute top-0 left-1/2 w-px h-screen bg-linear-to-b from-transparent via-white/5 to-transparent -translate-x-[50vw]"/>
             <div className="absolute top-0 left-1/2 w-px h-screen bg-linear-to-b from-transparent via-white/5 to-transparent translate-x-[20vw]"/>
          </div>

          {/* Floating Glass Tech Cards */}
          <div className="absolute top-[30%] right-[8%] z-20 space-y-4 hidden xl:block">
            {Object.entries(SLIDES[currentSlide].stats).map(([key, val], i) => (<motion.div key={key} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + i * 0.1 }} className="bg-white/[0.03] backdrop-blur-md border border-white/[0.05] p-5 rounded-sm min-w-[200px] flex items-center justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-brand-red uppercase mb-1">{key === 'zeroToHundred' ? '0-100' : key}</p>
                  <p className="font-mono text-lg text-white/90">{val}</p>
                </div>
                <div className="w-1 h-8 bg-brand-red/[0.15] rounded-full overflow-hidden">
                  <motion.div initial={{ height: 0 }} animate={{ height: "100%" }} transition={{ duration: 1.5, delay: 1.5 + i * 0.2 }} className="w-full bg-brand-red"/>
                </div>
              </motion.div>))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 px-6 md:px-16 pt-32 pb-16 md:pb-32 max-w-screen-2xl mx-auto w-full flex flex-col justify-end min-h-0">
        <motion.div key={`content-${currentSlide}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="flex flex-col lg:flex-row items-end justify-between gap-8 md:gap-16">
          <div className="max-w-5xl w-full">
            <motion.div style={{ x: textX, y: textY }} className="flex items-center gap-4 mb-4 md:mb-8">
              <div className="w-12 h-px bg-brand-red"/>
              <span className="text-xs md:text-sm font-medium tracking-[0.5em] text-white/90 uppercase">
                {SLIDES[currentSlide].eyebrow}
              </span>
            </motion.div>

            <motion.h1 style={{ x: useTransform(springX, [-0.5, 0.5], [30, -30]), y: useTransform(springY, [-0.5, 0.5], [15, -15]) }} className="font-heavy text-4xl sm:text-5xl md:text-7xl lg:text-[clamp(50px,9vw,120px)] leading-[0.85] sm:leading-[0.8] tracking-tight text-white uppercase mb-6 md:mb-12 drop-shadow-2xl">
              {SLIDES[currentSlide].title.map((line, i) => (<span key={i} className="block overflow-hidden pb-1 md:pb-2">
                  <span className="flex flex-wrap md:justify-start items-center">
                    {line.split(' ').map((word, j) => {
                const isHighlighted = word === 'JUST' || word === 'EMOTION' || word === 'BEYOND' || word === 'PRECISION';
                return (<span key={j} className="inline-block overflow-hidden mr-[0.2em] sm:mr-[0.25em]">
                          <span className="inline-block">
                            {word.split('').map((char, k) => (<motion.span key={k} initial={{ y: "110%", rotate: 10, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} transition={{
                            delay: 0.3 + i * 0.2 + j * 0.1 + k * 0.02,
                            duration: 1.2,
                            ease: [0.19, 1, 0.22, 1]
                        }} className={cn("inline-block origin-bottom-left", isHighlighted && "font-serif italic font-light text-brand-red lowercase tracking-normal")}>
                                {char}
                              </motion.span>))}
                          </span>
                        </span>);
            })}
                  </span>
                </span>))}
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center relative">
              {/* Geometric Line Accent */}
              <motion.div initial={{ width: 0 }} animate={{ width: 120 }} transition={{ delay: 1.2, duration: 1 }} className="absolute -top-8 left-0 h-px bg-linear-to-r from-brand-red to-transparent hidden md:block"/>
              
              <p className="text-sm md:text-base font-light tracking-[0.2em] text-white/95 uppercase max-w-md leading-relaxed">
                {SLIDES[currentSlide].description}
              </p>
              
              <div className="flex gap-4 w-full md:w-auto">
                <button onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })} className="clickable w-full md:w-auto bg-brand-red hover:bg-white hover:text-bg-dark text-white px-8 md:px-14 py-4 md:py-6 text-[10px] md:text-[11px] font-medium tracking-[0.6em] uppercase transition-all duration-500 relative overflow-hidden group shadow-[0_0_40px_rgba(195,7,63,0.4)]">
                  <span className="relative z-10">DISCOVER</span>
                  <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-[0.19, 1, 0.22, 1]"/>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Phase Indicators */}
          <div className="hidden lg:flex flex-col items-end gap-12 pb-4">
             <div className="space-y-6">
                {SLIDES.map((_, i) => (<button key={i} onClick={() => setCurrentSlide(i)} className="group relative flex items-center gap-8">
                    <span className={cn("text-[10px] tracking-[0.4em] transition-all duration-500 uppercase", currentSlide === i ? "text-brand-red opacity-100" : "text-white/20")}>
                      {SLIDES[i].id}
                    </span>
                    <div className={cn("h-px transition-all duration-700 relative", currentSlide === i ? "w-20 bg-brand-red shadow-[0_0_10px_rgb(195,7,63)]" : "w-10 bg-white/10 group-hover:bg-white/30")}/>
                  </button>))}
             </div>
             
             <div className="text-right border-r border-brand-red/60 pr-6">
                <span className="block font-mono text-[9px] tracking-[0.2em] text-white/60 mb-2 uppercase">CHASSIS PHASE</span>
                <span className="block font-display text-5xl text-white/80">{SLIDES[currentSlide].id}<span className="text-brand-red/50 italic">/</span>02</span>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Atmospheric Glare */}
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-brand-red/10 to-transparent pointer-events-none opacity-50 blur-[100px]"/>
    </section>);
}
