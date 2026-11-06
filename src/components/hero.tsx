"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe8b_ynVU1_TqQuoV472_eVFScWgj2WWaeRWFZDmKjkIKQi7Q/viewform";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center px-6 pb-16 pt-28 sm:pb-20 sm:pt-32">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.08fr] lg:gap-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-xl"
        >
          <motion.p
            variants={fadeInUp}
            className="mb-5 text-xs font-semibold tracking-[0.18em] text-text-secondary sm:text-sm"
          >
            異分野のクリエイターが出会う場所
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-[clamp(2.75rem,3.8vw,4.1rem)] font-bold leading-[1.25] tracking-normal text-text-primary"
          >
            <span className="block sm:inline">混ざる、</span>
            <span className="block sm:inline">生まれる、</span>
            <span className="block text-[#3155bd]">未知なる表現。</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-lg text-base leading-[1.8] text-text-secondary sm:text-lg"
          >
            デザイナーも、エンジニアも、まだ名前のない専門家も。
            分野を越えて話し、次の表現を一緒に探すコミュニティです。
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#3155bd] px-7 py-3 font-semibold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-[#24439b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3155bd]"
            >
              参加する <span aria-hidden="true">→</span>
            </a>
            <a
              href="#events"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-border-hover px-7 py-3 font-medium text-text-primary transition-[border-color,background-color] hover:border-[#3155bd] hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3155bd]"
            >
              企画を見る
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-[2rem] bg-[#222331] sm:aspect-[5/4] lg:aspect-[4/5]"
        >
          <Image
            src="/images/hero-crystal.jpg"
            alt="色と素材が交わるクリスタルのビジュアル"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 52vw"
            className="hero-crystal-image object-cover"
          />
          <div className="hero-crystal-facet hero-crystal-facet-left" aria-hidden="true" />
          <div className="hero-crystal-facet hero-crystal-facet-right" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
