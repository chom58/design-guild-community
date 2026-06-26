import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});

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
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable} antialiased`}
    >
      <body className="bg-background text-foreground font-sans">{children}</body>
    </html>
  );
}
