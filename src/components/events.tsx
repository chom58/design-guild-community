"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const events = [
  {
    type: "ワークショップ",
    title: "リミックス・ワークショップ",
    description:
      "参加者が持ち寄った作品を他分野のクリエイターがリミックス。グラフィックをインタラクティブに、ファッションをデータビジュアライゼーションに。新しい表現の可能性を探ります。",
  },
  {
    type: "ランチ会",
    title: "クリエイティブ・ランチ会",
    description:
      "カジュアルなランチタイムに少人数で集まり、特定のテーマについてアイデア交換。「AIとクリエイティブ」「失敗から学んだこと」など、毎回異なるトピックで深い対話を。",
  },
  {
    type: "プレゼン",
    title: "ポートフォリオ・ナイト",
    description:
      "異分野のクリエイター8名が各5分で作品を紹介。プレゼン後は投票で「コラボしたい人」を選出し、マッチングを促進。作品を通じて相性を発見する夜。",
  },
  {
    type: "実験",
    title: "実験室セッション",
    description:
      "「音×ビジュアル」「データ×ファッション」「マジック×UI」など、毎回異なる分野の組み合わせで実験的なワークショップを開催。未知の表現を一緒に探求しましょう。",
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
            企画している活動
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mb-16 max-w-lg text-center text-text-secondary"
          >
            異分野のクリエイターが出会うための企画案です。開催日程は決まり次第お知らせします。
          </motion.p>

          <div className="border-t border-border-hover">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                variants={fadeInUp}
                className="grid gap-3 border-b border-border-hover py-7 sm:grid-cols-[4rem_10rem_1fr] sm:gap-7 sm:py-8"
              >
                <span className="text-sm font-semibold text-[#3155bd]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="mb-1 text-xs font-medium text-text-secondary">{event.type}</p>
                  <h3 className="text-lg font-semibold text-text-primary">{event.title}</h3>
                </div>
                <p className="text-sm leading-[1.8] text-text-secondary">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
