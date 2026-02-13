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
  const [musicPlayed, setMusicPlayed] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const { scrollY } = useScroll();

  // Calculate opacity for each section based on scroll position
  const section1Opacity = useTransform(scrollY, [0, 300, 600], [1, 0, 0]);
  const section2Opacity = useTransform(scrollY, [300, 600, 1200], [0, 1, 0]);
  const section3Opacity = useTransform(scrollY, [1200, 1500, 1800], [0, 1, 0]);
  const section4Opacity = useTransform(scrollY, [1800, 2100, 3000], [0, 1, 1]);

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
      
      // Play music when reaching section 4
      if (window.scrollY > 1800 && !musicPlayed && audioEnabled) {
        setMusicPlayed(true);
        const audio = document.getElementById('valentine-music');
        if (audio) {
          audio.volume = 0.5;
          audio.play().catch(err => console.log('Audio play failed:', err));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showConfetti, musicPlayed, audioEnabled]);

  const enableAudio = () => {
    setAudioEnabled(true);
    // Try to play immediately if already scrolled past the threshold
    if (window.scrollY > 1800 && !musicPlayed) {
      setMusicPlayed(true);
      const audio = document.getElementById('valentine-music');
      if (audio) {
        audio.volume = 0.5;
        audio.play().catch(err => console.log('Audio play failed:', err));
      }
    }
  };

  return (
    <>
      {showConfetti && <Confetti />}
      
      {/* Audio enable button */}
      {!audioEnabled && (
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={enableAudio}
          className="fixed top-4 right-4 z-50 bg-deep-red text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center gap-2 pointer-events-auto"
        >
          <span className="text-lg">🎵</span>
          <span className="text-sm font-serif">Enable Music</span>
        </motion.button>
      )}
      
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

      {/* Section 4 - Flower with black background */}
      <motion.section
        style={{ opacity: section4Opacity }}
        className="h-screen flex items-center justify-center fixed top-0 left-0 right-0 pointer-events-none"
      >
        {/* Pure black background */}
        <div className="absolute inset-0 bg-black" style={{ backgroundColor: '#000000' }}></div>
        
        <motion.div 
          className="relative w-full h-full flex items-center justify-center z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <img 
            src="/valentine/flower.png" 
            alt="Flower for my valentine" 
            className="max-w-[80%] max-h-[80vh] object-contain filter drop-shadow-2xl"
          />
          
          {/* Subtle glow effect */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2.5, delay: 0.5 }}
          >
            <div className="w-96 h-96 bg-deep-red opacity-10 blur-3xl rounded-full"></div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Audio element */}
      <audio id="valentine-music" loop>
        <source src="/valentine/music.mp3" type="audio/mpeg" />
      </audio>

      {/* Spacer for scroll */}
      <div className="h-[400vh]"></div>
    </>
  );
};

export default ScrollStory;
