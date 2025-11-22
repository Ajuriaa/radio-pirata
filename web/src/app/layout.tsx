import type { Metadata } from "next";
import { Bangers, Roboto } from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  weight: "400",
  variable: "--font-manga",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["300", "400", "700"],
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RadioPirata | El Podcast del Rey de los Piratas",
  description: "El podcast definitivo para nakamas. Teorías, análisis, humor y debates sobre el mundo de Eiichiro Oda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${bangers.variable} ${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
