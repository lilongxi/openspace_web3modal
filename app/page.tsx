/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2024-10-22 15:05:26
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2024-10-22 16:20:41
 * @FilePath: /openspace_web3modal/app/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

'use client'

import Image from "next/image";
import { useAppKit } from '@reown/appkit/react'
import { useReadContract } from 'wagmi'
import ERC721ABI from '@openzeppelin/contracts/build/contracts/ERC721.json';

function ConnectWalletButton() {
  const { open } = useAppKit()
  return (
    <>
    <button onClick={() => open()}>Open Connect Modal</button>
    <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button>
  </>
  )
}

function ReactNFT() {
  const nftProp: Record<string, unknown> = {
    abi: ERC721ABI.abi,
    address: '0x0483b0dfc6c78062b9e999a82ffb795925381415',
    args: [1],
  }
  const { data: owner, isError: ownerError } = useReadContract({
   ...nftProp,
    functionName: 'ownerOf',
  })
  const { data: tokenURI, isError: tokenURIError } = useReadContract({
   ...nftProp,
    functionName: 'tokenURI',
  });
  if (ownerError || tokenURIError) return <div>Failed to fetch data</div>;
  return (
    <div>
      <h3>
        NFT:
      </h3>
      <p>Owner of token: {owner as string}</p>
      <p>Metadata URI of token: {tokenURI as string}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ConnectWalletButton />
        <ReactNFT />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
