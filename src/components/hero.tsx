"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe8b_ynVU1_TqQuoV472_eVFScWgj2WWaeRWFZDmKjkIKQi7Q/viewform";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
            y: [0, -15, 0],
          }}
          transition={{
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative h-[550px] w-[550px] sm:h-[700px] sm:w-[700px] lg:h-[850px] lg:w-[850px]"
          style={{
            maskImage: "radial-gradient(circle, black 20%, transparent 65%)",
            WebkitMaskImage: "radial-gradient(circle, black 20%, transparent 65%)",
          }}
        >
          <Image
            src="/images/hero-crystal.jpg"
            alt=""
            fill
            priority
            className="object-contain opacity-95 mix-blend-screen"
          />
        </motion.div>
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-[400px] w-[400px] rounded-full blur-[80px] sm:h-[500px] sm:w-[500px]"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, rgba(0,153,255,0.15) 40%, rgba(244,63,94,0.08) 70%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8f7ff] via-[#f8f7ff]/30 to-[#f8f7ff] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f7ff] via-transparent to-[#f8f7ff] opacity-60" />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-6 text-sm tracking-[0.3em] text-text-secondary uppercase"
        >
          Cross-disciplinary Creator Community
        </motion.p>

        <motion.h1
          variants={fadeInUp}
          className="mb-4 text-5xl font-bold leading-tight tracking-tight sm:text-7xl lg:text-8xl"
        >
          <span className="block">混ざる、生まれる、</span>
          <span className="gradient-text block">未知なる表現</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mx-auto mb-12 max-w-xl text-lg text-text-secondary sm:text-xl"
        >
          異分野のクリエイターが出会い、新しい価値を創造する
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent via-accent-purple to-accent-pink px-8 py-3.5 text-base font-medium whitespace-nowrap text-white transition-all hover:opacity-90 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] sm:w-auto"
          >
            参加する
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
          <a
            href="#about"
            className="inline-flex w-full items-center justify-center rounded-full border border-border px-8 py-3.5 text-base whitespace-nowrap text-text-secondary transition-all hover:border-border-hover hover:text-text-primary sm:w-auto"
          >
            もっと知る
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-accent-purple/30 p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-1.5 w-1 rounded-full bg-accent-purple"
          />
        </div>
      </motion.div>
    </section>
  );
}
