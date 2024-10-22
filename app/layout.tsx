/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2024-10-22 15:05:26
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2024-10-22 16:07:04
 * @FilePath: /openspace_web3modal/app/layout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { Metadata } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";

import ContextProvider from './context'
// import './context/appkit'

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'AppKit OpenSpace Example App',
  description: 'Powered by Reown'
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get('cookie')
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  );
}
