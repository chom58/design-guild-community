"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

const stats = [
  { value: 36, label: "交流会参加者", suffix: "人" },
  { value: 30, label: "初参加の割合", suffix: "%" },
  { value: 92, label: "満足度", suffix: "%" },
];

const professions = [
  { name: "グラフィックデザイナー", color: "#7c3aed" },
  { name: "Webデザイナー", color: "#7c3aed" },
  { name: "UI/UXデザイナー", color: "#7c3aed" },
  { name: "アートディレクター", color: "#7c3aed" },
  { name: "イラストレーター", color: "#7c3aed" },
  { name: "エンジニア", color: "#0099ff" },
  { name: "映像クリエイター", color: "#0099ff" },
  { name: "フォトグラファー", color: "#0099ff" },
  { name: "コピーライター", color: "#0099ff" },
  { name: "ミュージシャン", color: "#f43f5e" },
  { name: "マジシャン", color: "#f43f5e" },
  { name: "ダンサー", color: "#f43f5e" },
  { name: "ファッションデザイナー", color: "#f97316" },
  { name: "建築家", color: "#f97316" },
  { name: "服飾学生", color: "#f97316" },
  { name: "美容学生", color: "#f97316" },
];

function CountUp({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="gradient-text text-5xl font-bold sm:text-6xl">
      {count}
      <span className="text-3xl sm:text-4xl">{suffix}</span>
    </div>
  );
}

export default function Community() {
  return (
    <section id="community" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl"
          >
            クリエイターの<span className="gradient-text">交差点</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mb-16 max-w-lg text-center text-text-secondary"
          >
            グラフィックデザイナーからマジシャンまで、想像を超える多様な分野のクリエイターが集まっています
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mb-16 grid gap-6 sm:grid-cols-3"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="card-shadow relative overflow-hidden rounded-2xl border border-border bg-surface p-8 text-center transition-all hover:border-border-hover"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-accent/10 blur-[50px]" />
                </div>
                <div className="relative">
                  <CountUp
                    target={stat.value}
                    suffix={stat.suffix}
                  />
                  <p className="mt-2 text-sm text-text-secondary">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={scaleIn}>
            <h3 className="mb-6 text-center text-sm font-medium tracking-wider text-text-muted uppercase">
              参加者の多様な職種
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {professions.map((p, i) => (
                <motion.span
                  key={p.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.1,
                    y: -2,
                  }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                  viewport={{ once: true }}
                  className="rounded-full px-4 py-1.5 text-sm font-medium transition-shadow"
                  style={{
                    color: p.color,
                    backgroundColor: `${p.color}12`,
                    border: `1px solid ${p.color}30`,
                  }}
                >
                  {p.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
