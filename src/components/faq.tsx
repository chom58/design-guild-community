"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const faqColors = ["#0099ff", "#7c3aed", "#f43f5e", "#22c55e", "#f97316"];

const faqs = [
  {
    question: "初めての参加でも大丈夫ですか？",
    answer:
      "もちろん大丈夫です！約30%が初参加、70%がリピーターとまったり増えてきています。意識高い感じではまったくないので、気軽にご参加ください。",
  },
  {
    question: "参加費用はいくらですか？",
    answer:
      "会費はかかりませんのでご安心ください。交流もカジュアルなお店やカフェなどがメインです。",
  },
  {
    question: "参加するまでの流れを教えてください",
    answer:
      "1. イベントを選ぶ — SNSやこのサイトでイベント情報をチェック\n2. フォームから申し込み — 簡単なプロフィールを入力\n3. 当日参加 — 会場にお越しください。受付でお名前をお伝えください",
  },
  {
    question: "どんな人が参加していますか？",
    answer:
      "グラフィックデザイナー、Webデザイナー、UI/UXデザイナー、エンジニア、映像クリエイター、ミュージシャン、マジシャン、ファッションデザイナーなど、様々な分野のクリエイターが参加しています。年齢層は20代〜40代が中心で、フリーランスの方や経営者の方もいらっしゃいます。共通点は「新しい表現を探求したい」という想いです。",
  },
  {
    question: "デザイナーでなくても参加できますか？",
    answer:
      "もちろんです！「クリエイティブ」に興味がある方ならどなたでも歓迎です。エンジニア、マーケター、学生など、様々なバックグラウンドの方が参加しています。",
  },
];

function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const color = faqColors[index % faqColors.length];

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between py-5 text-left transition-colors"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-3 pr-4 text-base font-medium transition-colors group-hover:text-white">
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
            style={{
              color,
              backgroundColor: `${color}18`,
            }}
          >
            {index + 1}
          </span>
          {question}
        </span>
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm transition-all"
          style={{
            borderColor: isOpen ? color : undefined,
            color: isOpen ? color : undefined,
            border: `1px solid ${isOpen ? color : "#1a1a1a"}`,
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pl-9 text-sm leading-relaxed text-text-secondary whitespace-pre-line">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  return (
    <section id="faq" className="relative px-6 py-32">
      <div className="mx-auto max-w-2xl">
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
            よくある<span style={{ color: "#06b6d4" }}>質問</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mb-12 max-w-md text-center text-text-secondary"
          >
            初めての方からよくいただく質問をまとめました
          </motion.p>

          <motion.div variants={fadeInUp}>
            {faqs.map((faq, i) => (
              <FaqItem key={faq.question} {...faq} index={i} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
