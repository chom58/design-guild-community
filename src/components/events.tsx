"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

const events = [
  {
    type: "ワークショップ",
    title: "リミックス・ワークショップ",
    description:
      "参加者が持ち寄った作品を他分野のクリエイターがリミックス。グラフィックをインタラクティブに、ファッションをデータビジュアライゼーションに。新しい表現の可能性を探ります。",
    features: ["作品の相互リミックス", "異分野の視点"],
    accent: "#0099ff",
  },
  {
    type: "ランチ会",
    title: "クリエイティブ・ランチ会",
    description:
      "カジュアルなランチタイムに少人数で集まり、特定のテーマについてアイデア交換。「AIとクリエイティブ」「失敗から学んだこと」など、毎回異なるトピックで深い対話を。",
    features: ["リラックスした雰囲気", "深いディスカッション"],
    accent: "#f43f5e",
  },
  {
    type: "プレゼン",
    title: "ポートフォリオ・ナイト",
    description:
      "異分野のクリエイター8名が各5分で作品を紹介。プレゼン後は投票で「コラボしたい人」を選出し、マッチングを促進。作品を通じて相性を発見する夜。",
    features: ["ライトニングトーク", "マッチング投票"],
    accent: "#eab308",
  },
  {
    type: "実験",
    title: "実験室セッション",
    description:
      "「音×ビジュアル」「データ×ファッション」「マジック×UI」など、毎回異なる分野の組み合わせで実験的なワークショップを開催。未知の表現を一緒に探求しましょう。",
    features: ["実験的アプローチ", "新しい組み合わせ"],
    accent: "#22c55e",
  },
];

export default function Events() {
  return (
    <section id="events" className="relative px-6 py-32">
      <div className="relative mx-auto max-w-6xl">
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
            アップカミング<span className="rainbow-text">イベント</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mb-16 max-w-lg text-center text-text-secondary"
          >
            出会いと発見が生まれる場を、さまざまな形で用意しています
          </motion.p>

          <div className="grid gap-6 sm:grid-cols-2">
            {events.map((event) => (
              <motion.div
                key={event.title}
                variants={scaleIn}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="glow-card group overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:border-border-hover hover:border-accent/20"
              >
                <div
                  className="h-1"
                  style={{
                    background: `linear-gradient(90deg, ${event.accent}, ${event.accent}00)`,
                  }}
                />
                <div className="p-6">
                  <span
                    className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      color: event.accent,
                      backgroundColor: `${event.accent}20`,
                      border: `1px solid ${event.accent}40`,
                    }}
                  >
                    {event.type}
                  </span>
                  <h3 className="mb-3 text-xl font-semibold">{event.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {event.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-border px-3 py-1 text-xs text-text-muted transition-colors group-hover:border-border-hover group-hover:text-text-secondary"
                      >
                        {feature}
                      </span>
                    ))}
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
