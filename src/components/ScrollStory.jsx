import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FloatingHeart = ({ delay }) => {
  return (
    <motion.div
      className="absolute text-deep-red opacity-30"
      initial={{ y: 0, x: 0, opacity: 0 }}
      animate={{
        y: [-20, -100],
        x: [0, Math.random() * 40 - 20],
        opacity: [0, 0.3, 0],
      }}
      transition={{
        duration: 3,
        delay: delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
      }}
      style={{
        left: `${Math.random() * 80 + 10}%`,
        top: '60%',
        fontSize: `${Math.random() * 20 + 15}px`,
      }}
    >
      ♥
    </motion.div>
  );
};

const Confetti = () => {
  const hearts = Array.from({ length: 50 }, (_, i) => i);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {hearts.map((i) => (
        <motion.div
          key={i}
          className="absolute text-deep-red"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -50,
            rotate: Math.random() * 360,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: window.innerHeight + 100,
            rotate: Math.random() * 360 + 360,
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            ease: 'linear',
            delay: Math.random() * 0.5,
          }}
          style={{ fontSize: `${Math.random() * 20 + 15}px` }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
};

const ScrollStory = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const { scrollY } = useScroll();

  // Calculate opacity for each section based on scroll position
  const section1Opacity = useTransform(scrollY, [0, 300, 600], [1, 0, 0]);
  const section2Opacity = useTransform(scrollY, [300, 600, 900], [0, 1, 0]);
  const section3Opacity = useTransform(scrollY, [600, 900, 1200], [0, 1, 1]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800 && !showConfetti) {
        setShowConfetti(true);
        // Flash effect
        document.body.style.backgroundColor = '#ffffff';
        setTimeout(() => {
          document.body.style.backgroundColor = '#f0f0f0';
        }, 200);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showConfetti]);

  return (
    <>
      {showConfetti && <Confetti />}
      
      {/* Section 1 */}
      <motion.section
        style={{ opacity: section1Opacity }}
        className="h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="text-center z-10 relative px-4">
          {/* Decorative corner elements */}
          <div className="absolute -top-8 -left-8 md:-top-12 md:-left-12 text-4xl md:text-6xl text-deep-red opacity-30">❦</div>
          <div className="absolute -top-8 -right-8 md:-top-12 md:-right-12 text-4xl md:text-6xl text-deep-red opacity-30">❦</div>
          <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 text-4xl md:text-6xl text-deep-red opacity-30">❦</div>
          <div className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 text-4xl md:text-6xl text-deep-red opacity-30">❦</div>
          
          <h1 className="font-serif text-5xl md:text-8xl text-charcoal mb-4 drop-shadow-sm">
            Will you be
          </h1>
          <h1 className="font-serif text-5xl md:text-8xl text-deep-red drop-shadow-md">
            my Valentine?
          </h1>
          
          {/* Vintage decorative line */}
          <div className="mt-6 md:mt-8 flex justify-center items-center gap-2 md:gap-3">
            <div className="w-12 md:w-16 h-px bg-charcoal opacity-30"></div>
            <span className="text-deep-red text-xl md:text-2xl">♥</span>
            <div className="w-12 md:w-16 h-px bg-charcoal opacity-30"></div>
          </div>
        </div>
        
        {/* Floating hearts */}
        {Array.from({ length: 8 }).map((_, i) => (
          <FloatingHeart key={i} delay={i * 0.3} />
        ))}
        
        {/* Vintage corner frame */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 w-16 h-16 md:w-24 md:h-24 border-t-2 border-l-2 border-charcoal opacity-20"></div>
        <div className="absolute top-4 right-4 md:top-8 md:right-8 w-16 h-16 md:w-24 md:h-24 border-t-2 border-r-2 border-charcoal opacity-20"></div>
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-16 h-16 md:w-24 md:h-24 border-b-2 border-l-2 border-charcoal opacity-20"></div>
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-16 h-16 md:w-24 md:h-24 border-b-2 border-r-2 border-charcoal opacity-20"></div>
      </motion.section>

      {/* Section 2 */}
      <motion.section
        style={{ opacity: section2Opacity }}
        className="h-screen flex items-center justify-center fixed top-0 left-0 right-0 pointer-events-none"
      >
        <div className="text-center px-4">
          <h2 className="font-serif text-4xl md:text-7xl text-charcoal italic">
            Oh...
          </h2>
        </div>
      </motion.section>

      {/* Section 3 */}
      <motion.section
        style={{ opacity: section3Opacity }}
        className="h-screen flex items-center justify-center fixed top-0 left-0 right-0 pointer-events-none"
      >
        <div className="text-center px-4 relative">
          {/* Decorative vintage frame */}
          <div className="absolute -top-12 md:-top-16 left-1/2 transform -translate-x-1/2 text-deep-red opacity-40">
            <svg width="60" height="30" viewBox="0 0 80 40" fill="currentColor" className="md:w-20 md:h-10">
              <path d="M40 0 L42 8 L50 10 L42 12 L40 20 L38 12 L30 10 L38 8 Z" />
              <path d="M20 15 L22 20 L27 22 L22 24 L20 29 L18 24 L13 22 L18 20 Z" />
              <path d="M60 15 L62 20 L67 22 L62 24 L60 29 L58 24 L53 22 L58 20 Z" />
            </svg>
          </div>
          
          <h2 className="font-serif text-3xl md:text-6xl text-charcoal mb-4 md:mb-6 drop-shadow-sm">
            My valentine has always been
          </h2>
          <h2 className="font-serif text-4xl md:text-7xl text-deep-red drop-shadow-lg">
            Kongkwaun.
          </h2>
          
          {/* Decorative bottom element */}
          <div className="mt-6 md:mt-8 flex justify-center items-center gap-3 md:gap-4">
            <span className="text-deep-red text-2xl md:text-3xl">♥</span>
            <div className="font-handwritten text-xl md:text-2xl text-charcoal opacity-60">forever & always</div>
            <span className="text-deep-red text-2xl md:text-3xl">♥</span>
          </div>
        </div>
      </motion.section>

      {/* Spacer for scroll */}
      <div className="h-[200vh]"></div>
    </>
  );
};

export default ScrollStory;
