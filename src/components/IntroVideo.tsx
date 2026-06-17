'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface IntroVideoProps {
  onComplete: () => void
}

export default function IntroVideo({ onComplete }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [visible, setVisible] = useState(true)
  const [videoError, setVideoError] = useState(false)

  const dismiss = () => {
    setVisible(false)
    setTimeout(onComplete, 800)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const tryPlay = async () => {
      try {
        await video.play()
      } catch {
        setVideoError(true)
        setTimeout(dismiss, 1200)
      }
    }

    tryPlay()
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {!videoError ? (
            <video
              ref={videoRef}
              src="/intro.mp4"
              muted
              playsInline
              preload="auto"
              onEnded={dismiss}
              onError={() => {
                setVideoError(true)
                setTimeout(dismiss, 800)
              }}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(1)' }}
            />
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-sky-400 to-purple-600 animate-pulse" />
              <p className="text-white/50 text-sm">Carregando...</p>
            </div>
          )}

          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            onClick={dismiss}
            className="absolute bottom-8 right-8 flex items-center gap-2 text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm bg-white/5 hover:bg-white/10 pointer-events-auto"
          >
            Pular Intro
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-8 left-8 pointer-events-none"
          >
            <span className="text-white/30 text-xs tracking-widest uppercase font-light">
              Volvera Solutions
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
