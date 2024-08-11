import "./global.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {Toaster} from "sonner"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SujeitoPizza - A melhor pizzaria",
  description: "A melhor pizzaria do Brasil"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Toaster
        position="bottom-right"
        toastOptions={{
          style:{
            backgroundColor: "#f1f1f1",
            color: "#131313",
            borderColor: "rgba(255,255,255,0.5)"
          }
        }}
        />
        {children}
      </body>
    </html>
  );
}
