const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe8b_ynVU1_TqQuoV472_eVFScWgj2WWaeRWFZDmKjkIKQi7Q/viewform";

const footerLinks = [
  {
    title: "活動内容",
    links: [
      { label: "はじめに", href: "#about" },
      { label: "イベント", href: "#events" },
      { label: "コミュニティ", href: "#community" },
    ],
  },
  {
    title: "参加する",
    links: [
      { label: "メンバー登録", href: FORM_URL, external: true },
      { label: "よくある質問", href: "#faq" },
      { label: "メンバー紹介", href: "#team" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-3">
          <div>
            <div className="mb-4 text-xl font-bold tracking-tight">
              <span className="font-light">Design</span>{" "}
              <span className="gradient-text">Guild</span>
            </div>
            <p className="text-sm text-text-secondary">
              混ざる、生まれる、未知なる表現
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-sm font-medium text-text-muted uppercase tracking-wider">
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Design Guild. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
