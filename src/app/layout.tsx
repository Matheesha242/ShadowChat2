import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "Shadow Chat | Encrypted Communication",
  description: "Zero-knowledge architecture, absolute device anonymity. The ultimate digital bunker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-mono`}>
        <AuthProvider>
          {children}
          <Toaster position="bottom-right" toastOptions={{ style: { background: '#1C2541', color: '#E0E0E0', border: '1px solid #48CAE4' } }} />
        </AuthProvider>
      </body>
    </html>
  );
}
