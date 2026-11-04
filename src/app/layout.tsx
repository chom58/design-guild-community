import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Design Guild - 混ざる、生まれる、未知なる表現",
  description:
    "異分野クリエイターが混ざり合い、新しい価値を創造するコミュニティプラットフォーム",
  openGraph: {
    title: "Design Guild - 混ざる、生まれる、未知なる表現",
    description:
      "異分野クリエイターが混ざり合い、新しい価値を創造するコミュニティプラットフォーム",
    type: "website",
    locale: "ja_JP",
    siteName: "Design Guild",
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Guild - 混ざる、生まれる、未知なる表現",
    description:
      "異分野クリエイターが混ざり合い、新しい価値を創造するコミュニティプラットフォーム",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="antialiased">
      <body className="bg-background text-foreground font-sans">{children}</body>
    </html>
  );
}
