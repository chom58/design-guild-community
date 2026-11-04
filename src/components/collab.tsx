"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

const collabs = [
  {
    left: "グラフィックデザイナー",
    right: "エンジニア",
    result: "インタラクティブポスター",
    title: "動くポスターの未来",
    description:
      "静的なグラフィックに命を吹き込み、見る人の動きに反応する新しい広告体験を想像してみませんか？",
    tags: ["アイデア", "未来の広告"],
    accent: "#0099ff",
  },
  {
    left: "ファッションデザイナー",
    right: "データサイエンティスト",
    result: "感情反応する服",
    title: "感情を纏う服",
    description:
      "バイタルデータと連動して色やパターンが変化する服。あなたの感情を表現する新しいファッションの形",
    tags: ["感情表現", "スマートウェア"],
    accent: "#7c3aed",
  },
  {
    left: "マジシャン",
    right: "UXデザイナー",
    result: "驚きのインターフェース",
    title: "驚きのUI体験",
    description:
      "マジックの原理をUIに応用。予想を裏切り、でも心地よい。新しいインターフェース体験のデザイン",
    tags: ["サプライズ", "UX革新"],
    accent: "#f43f5e",
  },
];

export default function Collab() {
  return (
    <section id="about" className="relative px-6 py-32">
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
            分野を越えると、何ができる？
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mb-16 max-w-lg text-center text-text-secondary"
          >
            まだ実現していない、コラボレーションのアイデアです。
          </motion.p>

          <div className="grid gap-6 md:grid-cols-3">
            {collabs.map((collab) => (
              <motion.div
                key={collab.title}
                variants={scaleIn}
                className="h-full rounded-2xl border border-border-hover bg-surface"
              >
                <div className="p-6">
                  <div className="mb-6 text-center">
                    <span className="text-sm text-text-secondary">
                      {collab.left}
                    </span>
                    <span
                      className="mx-2 text-xl font-black"
                      style={{ color: collab.accent }}
                    >
                      ×
                    </span>
                    <span className="text-sm text-text-secondary">
                      {collab.right}
                    </span>
                  </div>

                  <div className="mb-4 text-center">
                    <span
                      className="text-xs font-semibold tracking-wider uppercase"
                      style={{ color: collab.accent }}
                    >
                      = {collab.result}
                    </span>
                  </div>

                  <div className="border-t border-border pt-4">
                    <h3 className="mb-2 text-lg font-semibold">
                      {collab.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                      {collab.description}
                    </p>
                    <div className="flex gap-2">
                      {collab.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full px-3 py-1 text-xs font-medium"
                          style={{
                            color: collab.accent,
                            backgroundColor: `${collab.accent}18`,
                            border: `1px solid ${collab.accent}30`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
