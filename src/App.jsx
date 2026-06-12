import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useInView } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, ArrowUpRight } from 'lucide-react';
import Lenis from 'lenis';
import HeroSlider from './components/HeroSlider';
import Experience from './components/Experience';
import Cursor from './components/Cursor';
import { cn } from './lib/utils';
gsap.registerPlugin(ScrollTrigger);
function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const handleNavClick = (e, id) => {
        e.preventDefault();
        setMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            if (id === 'exp-wrap') {
                const rect = element.getBoundingClientRect();
                window.scrollTo({
                    top: window.scrollY + rect.top,
                    behavior: 'smooth'
                });
            }
            else {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };
    return (<>
      <nav className={cn("fixed top-0 left-0 right-0 z-[100] px-4 md:px-16 py-4 md:py-6 transition-all duration-500", scrolled ? "bg-bg-dark/95 backdrop-blur-xl border-b border-brand-red/10 py-3 md:py-4" : "bg-transparent")}>
        <div className="flex items-center justify-between">
          <a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
  className="flex items-center"
>
  <img
    src="/go-sarthii-logo-final.png"
    alt="Go Sarthi"
    className="
      h-16 md:h-20
      w-auto
      object-contain
      brightness-125
      contrast-125
      drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]
      hover:scale-105
      transition-all
      duration-500
    "
  />
</a>
          
          <div className="hidden lg:flex items-center gap-10">
            {['Experience', 'Founder', 'Collection', 'Gallery', 'Contact'].map((item) => (<a key={item} href={`#${item.toLowerCase()}`} onClick={(e) => handleNavClick(e, item.toLowerCase() === 'experience' ? 'exp-wrap' : item.toLowerCase())} className="text-[12px] font-medium tracking-[0.2em] text-white/70 hover:text-brand-red uppercase transition-colors relative group py-2">
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-brand-red transition-all duration-300 group-hover:w-full"/>
              </a>))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="clickable hidden sm:flex items-center gap-2 px-5 py-2 md:px-6 md:py-2.5 border border-white/30 hover:border-brand-red/50 text-[11px] md:text-sm font-medium tracking-widest uppercase transition-all duration-300 rounded-full bg-white/[0.05] text-white">
              Get in Touch
            </button>
            
            <button onClick={() => setMenuOpen(!menuOpen)} className="clickable lg:hidden flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
              <motion.div animate={menuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-white origin-center"/>
              <motion.div animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-0.5 bg-white"/>
              <motion.div animate={menuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-white origin-center"/>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (<motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed inset-0 z-[90] bg-bg-dark flex flex-col items-center justify-center gap-8 lg:hidden">
            <div className="flex flex-col items-center gap-8">
              {['Experience', 'Founder', 'Collection', 'Gallery', 'Contact'].map((item) => (<a key={item} href={`#${item.toLowerCase()}`} onClick={(e) => handleNavClick(e, item.toLowerCase() === 'experience' ? 'exp-wrap' : item.toLowerCase())} className="text-2xl font-display tracking-[0.3em] text-white hover:text-brand-red uppercase transition-colors">
                  {item}
                </a>))}
            </div>
            
            <button onClick={() => {
                setMenuOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }} className="mt-8 px-8 py-4 border border-brand-red text-brand-red text-sm font-medium tracking-widest uppercase transition-all">
              Get in Touch
            </button>
          </motion.div>)}
      </AnimatePresence>
    </>);
}
function Collection() {
    const [activeBg, setActiveBg] = useState(0);
    const collections = [
        {
            id: '01',
            brand: 'PORSCHE',
            model: '911',
            tag: 'Precision engineered emotion.',
            img: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=85',
            bgImg: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1920&q=80',
            accentColor: '#C3073F',
            specs: [
                { label: '0-100 km/h', value: '3.4s', top: '30%', left: '40%' },
                { label: 'Top Speed', value: '306 km/h', top: '50%', left: '60%' }
            ]
        },
        {
            id: '02',
            brand: 'MERCEDES',
            model: 'S-CLASS',
            tag: 'Executive comfort redefined.',
            img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85',
            bgImg: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1920&q=80',
            accentColor: '#4A5568',
            specs: [
                { label: 'Engine', value: 'V8 Bi-Turbo', top: '40%', left: '30%' },
                { label: 'Interior', value: 'Nappa Leather', top: '60%', left: '50%' }
            ]
        },
        {
            id: '03',
            brand: 'BMW',
            model: 'M SERIES',
            tag: 'Performance with attitude.',
            img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85',
            bgImg: 'https://images.unsplash.com/photo-1533167649158-6d508895b680?auto=format&fit=crop&w=1920&q=80',
            accentColor: '#1E40AF',
            specs: [
                { label: 'Power', value: '510 HP', top: '35%', left: '55%' },
                { label: 'Drivetrain', value: 'M xDrive', top: '55%', left: '45%' }
            ]
        },
    ];
    const currentAccent = collections[activeBg].accentColor;
    return (<section id="collection" className="bg-bg-dark pt-32 pb-48 px-6 md:px-16 overflow-hidden relative">
      {/* Dynamic Background Wrapper */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div key={activeBg} initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }} className="absolute inset-0 grayscale scale-110 pointer-events-none blur-[2px]">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${collections[activeBg].bgImg})` }}/>
          </motion.div>
        </AnimatePresence>

        {/* Generative Texture & Color Shift Layers */}
        <motion.div animate={{
            backgroundColor: `${currentAccent}08`,
        }} className="absolute inset-0 transition-colors duration-1000"/>

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 z-1 opacity-[0.1] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"/>
        </div>
        
        {/* Animated Glow Globes */}
        <motion.div animate={{
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.1, 0.9, 1],
        }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ backgroundColor: currentAccent }} className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full blur-[180px] opacity-10 pointer-events-none"/>
        
        <motion.div animate={{
            x: [0, -40, 40, 0],
            y: [0, 50, -50, 0],
            scale: [1, 1.2, 0.8, 1],
        }} transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }} style={{ backgroundColor: currentAccent }} className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[200px] opacity-10 pointer-events-none"/>

        {/* Scanning Line Effect */}
        <motion.div animate={{
            y: ["-100%", "200%"],
        }} transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
        }} className="absolute inset-0 bg-linear-to-b from-transparent via-brand-red/5 to-transparent h-[50%] blur-3xl pointer-events-none z-1"/>

        {/* Generative Grain/Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
          <svg width="100%" height="100%" className="absolute inset-0">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
          </svg>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-transparent to-bg-dark"/>
      </div>

      <div className="max-w-7xl mx-auto mb-20 text-center md:text-left relative z-10">
        <div className="flex items-center gap-3 mb-6 md:justify-start justify-center">
          <div className="w-8 h-px bg-brand-red"/>
          <span className="text-[11px] tracking-[0.65em] text-brand-red uppercase">The Fleet</span>
        </div>
        <h2 className="font-display text-5xl md:text-8xl lg:text-[clamp(60px,7vw,110px)] leading-none uppercase mb-6">
          CURATED <span className="font-serif italic font-light text-brand-red">Luxury</span>
        </h2>
        <div className="w-16 h-px bg-linear-to-r from-brand-red to-transparent mb-8 mx-auto md:mx-0"/>
        <p className="text-base font-light tracking-widest text-white/70 uppercase max-w-lg leading-relaxed">
          A handpicked collection of luxury automobiles curated for performance, elegance and presence.
        </p>
      </div>

      <div className="space-y-48 relative z-10">
        {collections.map((item, i) => (<CollectionItem key={i} item={item} index={i} onInView={() => setActiveBg(i)}/>))}
      </div>
    </section>);
}
function CollectionItem({ item, index, onInView }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });
    useEffect(() => {
        if (isInView) {
            onInView();
        }
    }, [isInView, onInView]);
    return (<div ref={ref} className="group relative flex flex-col items-center md:items-stretch">
       <div className="w-full lg:w-[80%] ml-auto aspect-video md:aspect-auto md:h-[60vh] overflow-hidden relative cursor-crosshair">
          <motion.img initial={{ scale: 1.15 }} whileInView={{ scale: 1 }} transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }} src={item.img} alt={item.model} className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 pointer-events-none"/>
          <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/20 to-transparent pointer-events-none transition-opacity duration-700 group-hover:opacity-0"/>
          
          {/* Hotspots - Hidden on mobile for cleaner UI */}
          <div className="hidden md:block">
            {item.specs.map((spec, sIdx) => (<motion.div key={sIdx} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + sIdx * 0.2 }} className="absolute z-20 group/hotspot" style={{ top: spec.top, left: spec.left }}>
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-brand-red/40 animate-ping absolute inset-0"/>
                  <div className="w-4 h-4 rounded-full bg-brand-red shadow-[0_0_15px_rgba(195,7,63,0.8)] relative z-10"/>
                  
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover/hotspot:opacity-100 translate-x-4 group-hover/hotspot:translate-x-0 transition-all duration-500 pointer-events-none whitespace-nowrap bg-bg-card/90 backdrop-blur-md border border-brand-red/20 p-4 rounded-sm">
                    <p className="text-[10px] tracking-[0.2em] text-text-muted uppercase mb-1">{spec.label}</p>
                    <p className="font-display text-xl tracking-wider text-white">{spec.value}</p>
                  </div>
                </div>
              </motion.div>))}
          </div>
       </div>
       
       <div className="md:absolute static bottom-10 left-0 z-10 max-w-sm lg:max-w-md mt-8 md:mt-0 px-6 md:px-0 text-center md:text-left bg-linear-to-r from-bg-dark/80 via-bg-dark/40 to-transparent md:bg-none p-4 md:p-0">
          <span className="font-sans text-[11px] md:text-xs tracking-[0.55em] text-brand-red mb-4 md:mb-6 block">{item.id} / 05</span>
          <h3 className="font-display text-4xl sm:text-5xl md:text-8xl leading-[0.85] mb-6 text-white text-shadow-xl">
            {item.brand}<br />{item.model}
          </h3>
          <p className="font-serif italic text-lg md:text-2xl text-white/80 mb-6">{item.tag}</p>
          <div className="w-10 h-px bg-brand-red mb-8 mx-auto md:mx-0"/>
          <button className="clickable group/btn flex items-center gap-4 text-[11px] md:text-xs tracking-[0.3em] uppercase mx-auto md:mx-0 py-2">
            View Specifications <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1"/>
          </button>
          
          {/* Mobile Specs Display */}
          <div className="flex md:hidden flex-wrap justify-center gap-6 mt-10 p-6 border border-white/5 bg-white/[0.02]">
            {item.specs.map((spec, sIdx) => (<div key={sIdx} className="text-left">
                <p className="text-[11px] tracking-[0.2em] text-brand-red uppercase mb-1">{spec.label}</p>
                <p className="font-display text-xl text-white">{spec.value}</p>
              </div>))}
          </div>
       </div>
    </div>);
}
function Founder() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    return (<SectionReveal id="founder" ref={ref} className="relative min-h-screen py-24 md:py-32 px-6 md:px-16 bg-bg-dark overflow-hidden flex flex-col justify-center">
      {/* Immersive Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]) }} className="absolute inset-0 opacity-10 grayscale brightness-50">
          <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover" alt=""/>
        </motion.div>
        {/* Animated Gradient Meshes */}
        <motion.div animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1]
        }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-red/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3"/>
        <div className="absolute inset-0 bg-linear-to-b from-bg-dark via-transparent to-bg-dark"/>
      </div>

      {/* Editorial Background Text */}
      <motion.div style={{ y: bgY }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heavy text-[20vw] text-white/[0.012] whitespace-nowrap pointer-events-none select-none z-0">
        THE VISIONARY
      </motion.div>
      
      <motion.div initial="initial" whileInView="visible" viewport={{ once: true }} variants={{
            visible: { transition: { staggerChildren: 0.1 } }
        }} className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">
          
          {/* Left Side: Editorial Image Layout */}
          <motion.div variants={{
            initial: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] } }
        }} className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative group">
              {/* Decorative Frame Elements */}
              <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} transition={{ duration: 1, delay: 0.5 }} className="absolute -top-4 -left-4 w-24 h-px bg-brand-red origin-left"/>
              <motion.div initial={{ scaleY: 0 }} animate={isInView ? { scaleY: 1 } : {}} transition={{ duration: 1, delay: 0.7 }} className="absolute -top-4 -left-4 w-px h-24 bg-brand-red origin-top"/>

              <div className="clickable aspect-[4/5] overflow-visible relative shadow-2xl">
                <motion.img style={{ scale: 1.1, y: imgY }} src="/riyank.jpg" alt="Riyank Motta" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"/>
                {/* Metallic Scanning Sweep */}
                <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }} className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent skew-x-[-30deg] pointer-events-none"/>
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent opacity-60"/>
                
                {/* Floating Detail Card */}
                <motion.div initial={{ x: 50, opacity: 0 }} animate={isInView ? { x: 0, opacity: 1 } : {}} transition={{ delay: 1, duration: 0.8 }} className="absolute bottom-6 -right-2 md:bottom-10 md:-right-4 lg:-right-12 bg-bg-card/90 backdrop-blur-xl border border-white/10 p-5 md:p-8 max-w-[220px] md:max-w-[280px] z-20">
                  <p className="text-brand-red font-serif italic text-lg md:text-2xl mb-2 leading-tight">"Automobiles are not just machines; they are legacies in motion."</p>
                  <div className="w-8 h-px bg-brand-red/50 mb-3 md:mb-4"/>
                  <p className="text-[10px] md:text-[11px] tracking-[0.4em] text-white/60 uppercase">Philosophical Directive</p>
                </motion.div>
              </div>
              
              {/* Accent Circles */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-brand-red/10 rounded-full animate-pulse-slow pointer-events-none"/>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <div className="lg:col-span-6 lg:pl-12 lg:ml-auto order-1 lg:order-2 mb-12 lg:mb-0">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-brand-red"/>
              <span className="text-[11px] tracking-[0.7em] text-brand-red uppercase font-light">Founder & Lead Consultant</span>
            </motion.div>
            
            <motion.h2 initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }} className="font-display text-5xl md:text-8xl leading-[0.85] mb-12 text-white">
              RIYANK <br /> MOTTA
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 px-1">
              <motion.div variants={{
            initial: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
        }}>
                <h4 className="text-[10px] tracking-[0.5em] text-brand-red mb-4 font-mono">Biography</h4>
                <p className="text-base font-light tracking-wider text-white/70 leading-relaxed">
                  With 16 years forged in the high-stakes world of luxury automotive sales — across Porsche, Mercedes-Benz, and Audi — Riyank Motta founded Go Sarthi to bridge the gap between transaction and relationship.
                </p>
              </motion.div>
              <motion.div variants={{
            initial: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
        }}>
                <h4 className="text-[10px] tracking-[0.5em] text-brand-red mb-4 font-mono">Expertise</h4>
                <p className="text-base font-light tracking-wider text-white/70 leading-relaxed">
                  Specializing in portfolio management for ultra-premium pre-owned assets, ensuring every handover is a curated celebration of success.
                </p>
              </motion.div>
            </div>
            
            <motion.div variants={{
            initial: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }} className="space-y-6">
               {[
            { brand: "Porsche Centre Mumbai", role: "Sales Manager", year: "2023 — 2025" },
            { brand: "Mercedes-Benz Landmark Cars", role: "Senior Manager Sales", year: "2017 — 2023" },
            { brand: "Audi", role: "Sales Consultant", year: "2009 — 2017" }
        ].map((job, idx) => (<motion.div key={idx} variants={{
                initial: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
            }} className="group border-b border-white/5 pb-8 hover:pl-6 transition-all duration-500 cursor-default">
                    <div className="flex justify-between items-center">
                       <div>
                          <div className="flex items-center gap-4 mb-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-brand-red group-hover:scale-150 transition-transform duration-300"/>
                             <h5 className="font-display text-xl md:text-2x tracking-widest text-white group-hover:text-brand-red transition-colors">{job.brand}</h5>
                          </div>
                          <span className="text-[10px] tracking-[0.3em] text-text-muted uppercase pl-6">{job.role}</span>
                       </div>
                       <span className="font-serif italic text-sm text-brand-red/60">{job.year}</span>
                    </div>
                 </motion.div>))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </SectionReveal>);
}
// ─── Instagram Posts — replace with your actual post URLs ────────────────────
const INSTAGRAM_POSTS = [
  { url: "https://www.instagram.com/p/REPLACE_1/", img: "", type: "IMAGE" },
  { url: "https://www.instagram.com/p/REPLACE_2/", img: "", type: "IMAGE" },
  { url: "https://www.instagram.com/p/REPLACE_3/", img: "", type: "IMAGE" },
  { url: "https://www.instagram.com/p/REPLACE_4/", img: "", type: "VIDEO" },
  { url: "https://www.instagram.com/p/REPLACE_5/", img: "", type: "IMAGE" },
  { url: "https://www.instagram.com/p/REPLACE_6/", img: "", type: "IMAGE" },
];

function Gallery() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!document.getElementById('instagram-embed-script')) {
      const script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => window.instgrm?.Embeds.process();
    } else {
      window.instgrm?.Embeds.process();
    }
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="bg-bg-dark pt-32 pb-24 px-6 md:px-16 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r from-transparent via-brand-red/20 to-transparent" />
      <motion.div
        animate={{ opacity: [0.05, 0.12, 0.05], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-red/10 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 text-center md:text-left">
          <div className="flex items-center gap-3 mb-6 md:justify-start justify-center">
            <div className="w-8 h-px bg-brand-red" />
            <span className="text-[11px] tracking-[0.65em] text-brand-red uppercase">On Instagram</span>
          </div>
          <h2 className="font-display text-5xl md:text-8xl lg:text-[clamp(60px,7vw,110px)] leading-none uppercase mb-6">
            BEHIND THE <span className="font-serif italic font-light text-brand-red">Wheel</span>
          </h2>
          <div className="w-16 h-px bg-linear-to-r from-brand-red to-transparent mb-8 mx-auto md:mx-0" />
          <p className="text-base font-light tracking-widest text-white/70 uppercase max-w-lg leading-relaxed">
            Real moments. Real machines. Follow our journey.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {INSTAGRAM_POSTS.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="break-inside-avoid mb-4 overflow-hidden rounded-sm border border-white/5 hover:border-brand-red/20 transition-all duration-500"
            >
              <blockquote
                className="instagram-media !min-w-0 !w-full !m-0 !border-0"
                data-instgrm-permalink={post.url}
                data-instgrm-version="14"
                style={{ background: '#0d0d0d', border: 0, margin: 0, padding: 0, width: '100%' }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://www.instagram.com/gosarthii/"
            target="_blank"
            rel="noopener noreferrer"
            className="clickable flex items-center gap-3 px-10 py-4 border border-white/20 hover:border-brand-red hover:text-brand-red text-white text-[11px] font-medium tracking-[0.4em] uppercase transition-all duration-300 hover:scale-105"
          >
            <Instagram className="w-4 h-4" /> Follow @gosarthii
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
    return (<section id="contact" ref={ref} className="relative min-h-[90vh] flex items-center justify-center py-32 px-6 overflow-hidden">
       <div className="absolute inset-0 z-0">
         <motion.img style={{ y: bgY, scale: 1.2 }} src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1920&q=85" className="w-full h-full object-cover opacity-20 grayscale scale-110" alt="Contact background"/>
         <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-bg-dark"/>
       </div>

       <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }} className="relative z-10 text-center max-w-5xl">
          <h2 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-[clamp(60px,8vw,110px)] leading-[0.9] text-white/90">
            YOUR NEXT <br />
            <motion.span initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 1 }} className="inline-block font-serif italic font-light text-brand-red text-3xl sm:text-5xl md:text-[clamp(40px,7vw,90px)]">
              Legend
            </motion.span> <br />
            AWAITS
          </h2>
          <p className="text-[11px] md:text-sm font-extralight tracking-[0.4em] text-white/60 uppercase mt-12 mb-16">
            Experience luxury automotive consultation <br /> curated entirely around you.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mb-20 px-4 md:px-0">
            <button className="clickable w-full sm:w-auto bg-brand-red hover:bg-brand-red-light text-white px-8 md:px-12 py-4 md:py-5 text-[10px] md:text-xs font-medium tracking-[0.4em] uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(195,7,63,0.3)]">
              Schedule Consultation
            </button>
            <button className="clickable w-full sm:w-auto flex items-center justify-center gap-4 px-8 md:px-12 py-4 md:py-5 border border-white/20 hover:border-brand-red hover:text-brand-red text-white text-[10px] md:text-xs font-medium tracking-[0.4em] uppercase transition-all duration-300 transform hover:scale-105 active:scale-95">
              <Instagram className="w-4 h-4 md:w-5 md:h-5"/> Follow Instagram
            </button>
          </div>

          <div className="flex flex-col gap-4 text-[10px] tracking-[0.5em] text-white/40">
             <span>MUMBAI, INDIA</span>
             <span>GO SARTHII — WE DELIVER EXPERIENCES</span>
          </div>
       </motion.div>
    </section>);
}
const SectionReveal = React.forwardRef(({ children, className, id }, ref) => {
    return (<motion.section ref={ref} id={id} initial={{ opacity: 0, y: 100, rotateX: 10, filter: "blur(10px)", scale: 0.95 }} whileInView={{
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            scale: 1,
            transition: {
                duration: 1.5,
                ease: [0.19, 1, 0.22, 1],
                staggerChildren: 0.2
            }
        }} viewport={{ once: true, margin: "-10% 0px" }} className={cn("relative perspective-1000 transform-style-3d", className)}>
        {children}
      </motion.section>);
});
SectionReveal.displayName = 'SectionReveal';
export default function App() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    const [loading, setLoading] = useState(true);
    const [loaderIndex, setLoaderIndex] = useState(0);
    useEffect(() => {
        const loaderInterval = setInterval(() => {
            setLoaderIndex((prev) => (prev + 1) % 5);
        }, 1500);
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => {
            clearTimeout(timer);
            clearInterval(loaderInterval);
            lenis.destroy();
        };
    }, []);
    return (<div className="relative">
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-linear-to-r from-brand-red to-brand-red-light z-[10001] origin-left" style={{ scaleX }}/>
      
      <Cursor />
      <div className="grain"/>
      
      {loading && (<div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center gap-10 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div key={loaderIndex} initial={{ opacity: 0, scale: 1.1, x: -30 }} animate={{ opacity: 0.2, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9, x: 30 }} transition={{ duration: 1.2, ease: "easeInOut" }} className="absolute inset-0">
                <img src={[
                "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1920&q=80",
                "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1920&q=80",
                "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80",
                "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1920&q=80",
                "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1920&q=80"
            ][loaderIndex]} className="w-full h-full object-cover grayscale brightness-50" alt=""/>
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black"/>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial-gradient from-brand-red/10 via-transparent to-transparent pointer-events-none"/>
          
          <div className="relative">
            <motion.div initial={{ opacity: 0, scale: 0.95, letterSpacing: "1.5em" }} animate={{ opacity: 1, scale: 1, letterSpacing: "0.5em" }} transition={{ duration: 2.5, ease: [0.19, 1, 0.22, 1] }} className="font-heavy text-4xl md:text-[100px] text-white/90 relative z-10 text-center whitespace-nowrap">
              GO SARTHII
              {/* Metallic Sweep */}
              <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] mix-blend-overlay pointer-events-none"/>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} className="text-[10px] md:text-sm font-extralight tracking-[0.8em] text-white/30 uppercase z-10">
            WE DELIVER EXPERIENCES
          </motion.div>

          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-48 h-px bg-white/5 overflow-hidden">
            <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }} className="w-full h-full bg-linear-to-r from-transparent via-brand-red to-transparent"/>
          </div>
        </div>)}

      <div className={cn("transition-opacity duration-1000", loading ? "opacity-0" : "opacity-100")}>
        <Navbar />
        
        <main>
          <HeroSlider />
          
          <div id="exp-wrap">
            <Experience />
          </div>


          <Founder />

          <SectionReveal>
            <Collection />
          </SectionReveal>

          <SectionReveal>
            <Gallery />
          </SectionReveal>

          <SectionReveal>
            <Contact />
          </SectionReveal>
        </main>

        <footer className="py-24 md:py-32 border-t border-white/5 text-center bg-bg-dark relative overflow-hidden">
           {/* Ambient Glow */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r from-transparent via-brand-red/30 to-transparent"/>
           
           <div className="mb-12 flex justify-center">
             <a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
  className="flex items-center"
>
  <img
    src="/go-sarthii-logo-final.png"
    alt="Go Sarthi"
    className="
      h-16 md:h-20
      w-auto
      object-contain
      brightness-125
      contrast-125
      drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]
      hover:scale-105
      transition-all
      duration-500
    "
  />
</a>
           </div>

           <p className="text-[10px] sm:text-xs tracking-[0.6em] text-white/20 uppercase mb-4">
             &copy; 2026 GO SARTHII ALL RIGHTS RESERVED.
           </p>
           <p className="text-[9px] tracking-[0.4em] text-white/10 uppercase">
             Crafted with Precision & Passion for Automobiles.
           </p>
        </footer>
      </div>
    </div>);
}
