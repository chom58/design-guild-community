const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe8b_ynVU1_TqQuoV472_eVFScWgj2WWaeRWFZDmKjkIKQi7Q/viewform";

const paths = [
  {
    number: "01",
    title: "コラボのアイデアを見る",
    description: "分野をかけ合わせた、まだ実現していない構想",
    href: "#about",
  },
  {
    number: "02",
    title: "企画している活動を見る",
    description: "ワークショップや交流の企画案",
    href: "#events",
  },
  {
    number: "03",
    title: "運営メンバーを知る",
    description: "この場をつくる人たちの紹介",
    href: "#team",
  },
];

export default function ParticipationPaths() {
  return (
    <section aria-labelledby="participation-paths-heading" className="px-6 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.7fr)] lg:gap-20">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.16em] text-[#3155bd]">
            参加の入口
          </p>
          <h2 id="participation-paths-heading" className="text-2xl font-bold leading-snug text-text-primary sm:text-3xl">
            興味のあるところから。
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-text-secondary">
            アイデアや企画、運営する人たちを紹介します。
          </p>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-[#3155bd] underline decoration-[#3155bd]/40 underline-offset-4 hover:decoration-[#3155bd] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3155bd]"
          >
            参加登録へ <span aria-hidden="true">↗</span>
          </a>
        </div>

        <nav aria-label="Design Guildの見どころ" className="border-t border-border-hover">
          {paths.map((path) => (
            <a
              key={path.href}
              href={path.href}
              className="group grid min-h-24 grid-cols-[2rem_minmax(0,1fr)_1.5rem] items-center gap-3 border-b border-border-hover py-5 transition-colors hover:bg-surface/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3155bd] sm:gap-6"
            >
              <span className="self-start pt-1 text-xs font-semibold text-[#3155bd]" aria-hidden="true">
                {path.number}
              </span>
              <span>
                <span className="block text-base font-semibold text-text-primary sm:text-lg">
                  {path.title}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-text-secondary">
                  {path.description}
                </span>
              </span>
              <span className="text-xl text-[#3155bd] transition-transform group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
