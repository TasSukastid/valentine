import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';

const VintagePhotobooth = () => {
  const webcamRef = useRef(null);
  const photoStripRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [showFlash, setShowFlash] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [showPhotoStrip, setShowPhotoStrip] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [requestingCamera, setRequestingCamera] = useState(true);

  const handleUserMedia = () => {
    console.log('Camera ready!');
    setCameraReady(true);
    setCameraError(null);
    setRequestingCamera(false);
  };

  const handleUserMediaError = (error) => {
    console.error('Camera error:', error);
    let errorMessage = 'Unable to access camera.';
    
    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
      errorMessage = '❌ Camera permission denied. Please allow camera access in your browser settings.';
    } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
      errorMessage = '❌ No camera found. Please connect a camera.';
    } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
      errorMessage = '❌ Camera is busy. Please close other apps using the camera.';
    } else {
      errorMessage = `❌ Camera error: ${error.message || 'Unknown error'}`;
    }
    
    setCameraError(errorMessage);
    setCameraReady(false);
    setRequestingCamera(false);
  };

  const startPhotobooth = async () => {
    if (!cameraReady || !webcamRef.current) {
      setCameraError('Camera not ready. Please wait...');
      return;
    }

    setIsActive(true);
    setShowPhotoStrip(false);
    setCapturedPhotos([]);
    setCameraError(null);
    
    // Start countdown
    await new Promise(resolve => setTimeout(resolve, 500));
    setCountdown(3);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCountdown(2);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCountdown(1);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCountdown(null);

    // Capture 4 photos
    setIsCapturing(true);
    const photos = [];
    
    for (let i = 0; i < 4; i++) {
      try {
        // Check if webcam is still available
        if (!webcamRef.current) {
          setCameraError('Camera connection lost. Please try again.');
          setIsCapturing(false);
          setIsActive(false);
          return;
        }

        // Flash effect
        setShowFlash(true);
        const imageSrc = webcamRef.current.getScreenshot();
        
        if (imageSrc) {
          photos.push(imageSrc);
        } else {
          throw new Error('Failed to capture photo');
        }
        
        await new Promise(resolve => setTimeout(resolve, 200));
        setShowFlash(false);
        
        if (i < 3) {
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      } catch (error) {
        console.error('Error capturing photo:', error);
        setCameraError('Failed to capture photo. Please try again.');
        setIsCapturing(false);
        setIsActive(false);
        return;
      }
    }

    if (photos.length === 4) {
      setCapturedPhotos(photos);
      setIsCapturing(false);
      setShowPhotoStrip(true);
    } else {
      setCameraError('Not all photos were captured. Please try again.');
      setIsCapturing(false);
      setIsActive(false);
    }
  };

  const downloadPhotoStrip = useCallback(async () => {
    if (photoStripRef.current) {
      try {
        const canvas = await html2canvas(photoStripRef.current, {
          backgroundColor: '#ffffff',
          scale: 2,
        });
        
        const link = document.createElement('a');
        link.download = `valentine-photobooth-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('Error downloading photo strip:', error);
      }
    }
  }, []);

  const resetPhotobooth = () => {
    setIsActive(false);
    setShowPhotoStrip(false);
    setCapturedPhotos([]);
    setCameraError(null);
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 relative bg-gradient-to-b from-off-white to-gray-100">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="inline-block relative">
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-2">
              Capture the Moment
            </h2>
            <div className="flex justify-center items-center gap-2 mt-3">
              <div className="w-10 h-px bg-deep-red"></div>
              <span className="text-deep-red text-lg">♥</span>
              <div className="w-10 h-px bg-deep-red"></div>
            </div>
            <p className="font-handwritten text-xl text-gray-600 mt-2">
              Vintage Photobooth Experience
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {!showPhotoStrip ? (
            <div className="bg-charcoal p-4 md:p-6 rounded-lg shadow-2xl border-4 border-black max-w-sm mx-auto">
              {/* Photobooth Screen */}
              <div className="relative aspect-[9/16] bg-black rounded overflow-hidden mb-4 film-grain border-2 border-gray-700" style={{ maxHeight: '480px' }}>
                {/* Webcam is always mounted for camera access */}
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  className="w-full h-full object-cover"
                  style={{
                    filter: 'grayscale(100%) contrast(135%) brightness(105%) saturate(0%)',
                    visibility: isActive ? 'visible' : 'hidden',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                  videoConstraints={{
                    facingMode: 'user',
                    width: { ideal: 1280 },
                    height: { ideal: 1920 },
                  }}
                  onUserMedia={handleUserMedia}
                  onUserMediaError={handleUserMediaError}
                  screenshotQuality={1}
                  mirrored={true}
                />
                
                {/* Scan lines overlay for vintage effect */}
                {isActive && (
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.06) 2px, rgba(0,0,0,.06) 4px)',
                      opacity: 0.4,
                    }}
                  />
                )}
                
                {/* Camera status indicator */}
                {!cameraReady && isActive && (
                  <div className="absolute top-2 right-2 bg-yellow-500 bg-opacity-80 text-black text-[10px] px-2 py-1 rounded font-bold z-10">
                    LOADING
                  </div>
                )}
                {cameraReady && isActive && (
                  <div className="absolute top-2 right-2 bg-green-500 bg-opacity-80 text-white text-[10px] px-2 py-1 rounded font-bold z-10 animate-pulse">
                    READY
                  </div>
                )}
                
                {/* Countdown Overlay */}
                <AnimatePresence>
                  {countdown && (
                    <motion.div
                      key={countdown}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.5, opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
                    >
                      <span className="font-serif text-7xl md:text-9xl text-white">
                        {countdown}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Flash Effect */}
                <AnimatePresence>
                  {showFlash && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className="absolute inset-0 bg-white z-30"
                    />
                  )}
                </AnimatePresence>
                
                {/* Idle screen overlay (shown when not active) */}
                {!isActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
                  <div className="text-center p-6">
                    <div className="text-5xl md:text-6xl mb-4 animate-pulse">📷</div>
                    <p className="text-white font-serif text-lg md:text-xl mb-2">
                      Ready for your
                    </p>
                    <p className="text-deep-red font-serif text-xl md:text-2xl font-bold mb-3">
                      Vintage Photobooth?
                    </p>
                    <div className="flex justify-center gap-1 text-white text-xs opacity-60">
                      <span>♥</span>
                      <span>♥</span>
                      <span>♥</span>
                    </div>
                    
                    {/* Camera status messages */}
                    {requestingCamera && !cameraError && (
                      <div className="mt-3 text-yellow-300 text-xs animate-pulse">
                        🔄 Requesting camera access...
                      </div>
                    )}
                    {cameraReady && !cameraError && (
                      <div className="mt-3 text-green-400 text-xs">
                        ✓ Camera ready!
                      </div>
                    )}
                    {cameraError && (
                      <div className="mt-3 text-yellow-400 text-xs max-w-[200px] mx-auto leading-relaxed">
                        {cameraError}
                      </div>
                    )}
                  </div>
                </div>
                )}
              </div>

              {/* Control Buttons */}
              <div className="flex gap-4 justify-center">
                {!isActive && !isCapturing && (
                  <motion.button
                    whileHover={{ scale: cameraReady ? 1.05 : 1 }}
                    whileTap={{ scale: cameraReady ? 0.95 : 1 }}
                    onClick={startPhotobooth}
                    disabled={!cameraReady}
                    className={`px-6 py-3 rounded-lg font-serif text-lg transition-colors shadow-xl border-2 border-black ${
                      cameraReady 
                        ? 'bg-deep-red text-white hover:bg-red-700 cursor-pointer' 
                        : 'bg-gray-500 text-gray-300 cursor-not-allowed opacity-50'
                    }`}
                  >
                    📷 {cameraReady ? 'Start Photo Booth' : 'Loading Camera...'}
                  </motion.button>
                )}
                
                {isCapturing && (
                  <div className="text-white font-serif text-lg animate-pulse flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    Capturing...
                  </div>
                )}
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              {/* Photo Strip Container with Red Background */}
              <div className="bg-deep-red p-4 md:p-6 rounded-lg">
                {/* Photo Strip */}
                <div
                  ref={photoStripRef}
                  className="bg-white shadow-2xl relative mx-auto"
                  style={{ 
                    width: '240px',
                    padding: '16px 12px',
                  }}
                >
                  {/* Header */}
                  <div className="text-center mb-3 pb-2 border-b border-gray-300">
                    <p className="text-[9px] font-bold text-charcoal leading-tight">It was always you, Giffin.</p>
                    <p className="text-[9px] font-bold text-deep-red mt-0.5">Always.</p>
                  </div>
                  
                  {/* Photos */}
                  <div className="space-y-2">
                    {capturedPhotos.map((photo, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="relative"
                      >
                        <div className="border-[3px] border-black shadow-md film-grain relative overflow-hidden">
                          <img
                            src={photo}
                            alt={`Capture ${index + 1}`}
                            className="w-full"
                            style={{
                              filter: 'grayscale(100%) contrast(130%) brightness(105%) saturate(0%)',
                              mixBlendMode: 'normal',
                            }}
                          />
                          {/* Scan lines overlay */}
                          <div 
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.03) 2px, rgba(0,0,0,.03) 4px)',
                              opacity: 0.5,
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Footer / Signature */}
                  <div className="mt-3 pt-2 border-t border-gray-300">
                    <div className="text-center">
                      <p className="font-handwritten text-2xl text-charcoal leading-none">
                        My Valentines
                      </p>
                      <p className="text-[8px] text-gray-500 mt-1.5 tracking-wide">
                        {new Date().toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        }).toUpperCase()}
                      </p>
                      <div className="flex justify-center gap-1 mt-1.5">
                        <span className="text-deep-red text-[10px]">♥</span>
                        <span className="text-deep-red text-[10px]">♥</span>
                        <span className="text-deep-red text-[10px]">♥</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Vintage texture overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /%3E%3CfeColorMatrix type="saturate" values="0"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)" opacity="0.4"/%3E%3C/svg%3E")',
                      mixBlendMode: 'multiply',
                    }}
                  />
                </div>
              </div>

              {/* Download and Retry Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadPhotoStrip}
                  className="bg-white text-charcoal px-5 py-2.5 rounded font-serif text-base hover:bg-gray-100 transition-colors border-2 border-charcoal shadow-lg"
                >
                  💾 Save Photo Strip
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetPhotobooth}
                  className="bg-charcoal text-white px-5 py-2.5 rounded font-serif text-base hover:bg-gray-800 transition-colors border-2 border-charcoal shadow-lg"
                >
                  📸 Take Another
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Instructions */}
        {!isActive && !showPhotoStrip && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-center px-4"
          >
            <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-lg p-4 border border-gray-300 shadow-md inline-block max-w-sm">
              <p className="font-serif text-xs text-charcoal leading-relaxed">
                <span className="text-deep-red font-bold">①</span> Start 
                <span className="mx-1 text-gray-400">•</span>
                <span className="text-deep-red font-bold">②</span> Get ready 
                <span className="mx-1 text-gray-400">•</span>
                <span className="text-deep-red font-bold">③</span> Pose 
                <span className="mx-1 text-gray-400">•</span>
                <span className="text-deep-red font-bold">④</span> 4 photos
              </p>
              <div className="mt-2 flex justify-center gap-1.5 text-[10px] text-gray-500">
                <span>♥</span>
                <span>Make memories together</span>
                <span>♥</span>
              </div>
              {requestingCamera && (
                <div className="mt-3 text-[10px] text-gray-600 pt-2 border-t border-gray-300">
                  💡 Please allow camera access when prompted
                </div>
              )}
              {cameraError && (
                <div className="mt-3 text-[10px] text-red-600 pt-2 border-t border-gray-300">
                  ⚠️ Camera access issue detected
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default VintagePhotobooth;
