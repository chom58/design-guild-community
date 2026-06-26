"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe8b_ynVU1_TqQuoV472_eVFScWgj2WWaeRWFZDmKjkIKQi7Q/viewform";

const members = [
  {
    name: "ちょむ",
    tagline: "クリエイターにやたらと縁がある人",
    role: "ファウンダー / コミュニティマネージャー",
    image: "/images/chomu.png",
    message:
      "クリエイターでない私が、なぜかクリエイターに囲まれて生きてきました。その不思議な縁を活かして、異分野のクリエイターが出会い、新しい価値を生み出す場を作りたいと思っています",
    accent: "#0099ff",
  },
  {
    name: "野澤",
    tagline: "雑誌の凄腕アートディレクター",
    role: "クリエイティブディレクター",
    image: "/images/nozawa.png",
    message:
      "雑誌を中心としたエディトリアルデザインを中心に関わってきました。でも一番面白いのは、異なる分野の人と話すこと。そこから生まれる化学反応が、次の時代のデザインを作ると信じています",
    accent: "#7c3aed",
  },
];

export default function Team() {
  return (
    <section id="team" className="relative px-6 py-32">
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
            運営<span className="rainbow-text">メンバー</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mb-16 max-w-lg text-center text-text-secondary"
          >
            異なる分野で活動するクリエイターが出会うことで、今までにない価値が生まれる瞬間を何度も目撃してきました
          </motion.p>

          <div className="grid gap-6 sm:grid-cols-3">
            {members.map((member) => (
              <motion.div
                key={member.name}
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="card-shadow group overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:border-border-hover"
              >
                <div
                  className="h-1"
                  style={{
                    background: `linear-gradient(90deg, ${member.accent}, ${member.accent}00)`,
                  }}
                />
                <div className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div
                      className="relative h-24 w-24 overflow-hidden rounded-full"
                      style={{
                        border: `2px solid ${member.accent}60`,
                        boxShadow: `0 0 20px ${member.accent}20`,
                      }}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-center text-lg font-semibold">
                    {member.name}
                  </h3>
                  <p
                    className="mt-1 text-center text-xs font-medium"
                    style={{ color: member.accent }}
                  >
                    {member.tagline}
                  </p>
                  <p className="mt-1 text-center text-xs text-text-muted">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                    「{member.message}」
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div
              variants={scaleIn}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="animated-border group flex flex-col items-center justify-center"
            >
              <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-surface p-6">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-accent-pink/40">
                  <span className="rainbow-text text-4xl font-bold">?</span>
                </div>
                <h3 className="text-center text-lg font-semibold">
                  次は<span className="gradient-text">あなた</span>？
                </h3>
                <p className="mt-1 text-center text-xs font-medium" style={{ color: "#f43f5e" }}>
                  Design Guildを一緒に作る仲間
                </p>
                <p className="mt-1 text-center text-xs text-text-muted">
                  運営メンバー募集中
                </p>
                <p className="mt-4 text-center text-sm leading-relaxed text-text-secondary">
                  「Design Guildは参加者全員で作るコミュニティです。運営に興味がある方、イベント企画をしたい方、一緒にこの場を育てていきませんか？」
                </p>
                <a
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 rounded-full bg-gradient-to-r from-accent via-accent-purple to-accent-pink px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  仲間になる
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
