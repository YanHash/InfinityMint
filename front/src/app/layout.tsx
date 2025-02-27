//app/layout.tsx
import CustomRainbowKitProvider from "@/provider/CustomRainbowKitProvider";
import {Inter} from "next/font/google";
import "./globals.css";
import {MainMenubar} from "@/components/ui/menubar";
import React, {ReactNode} from "react";

const inter = Inter({subsets: ["latin"]});
export const metadata = {
    title: "Infinity Mint",
    description: "A marketplace for NFTs",
};

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <MainMenubar/>
        <CustomRainbowKitProvider>
            {children}
        </CustomRainbowKitProvider>
        </body>
        </html>
    );
}
