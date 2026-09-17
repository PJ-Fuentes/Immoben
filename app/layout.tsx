import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Immoben - Suivi des pannes locatives",
  description: "Plateforme de gestion des demandes de pannes pour gestionnaires immobiliers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
