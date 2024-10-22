/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2024-10-22 15:39:07
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2024-10-22 16:07:15
 * @FilePath: /openspace_web3modal/app/context/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'

import { wagmiAdapter, projectId } from '@/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from "@reown/appkit/react";
import { mainnet, arbitrum } from '@reown/appkit/networks'
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

const queryClient = new QueryClient;

const metadata = {
    name: 'Appkit-OpenSpace',
    description: 'AppKit OpenSpace Example',
    url: 'https://openspaceweb3modal.vercel.app/', // origin must match your domain & subdomain
    icons: ['https://teal-gigantic-bison-996.mypinata.cloud/ipfs/Qmao6i91DisXaTvFS8cDjzVEtcSs7kuNquB9yfeCT2T9P1']
  }

createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [
        mainnet, arbitrum
    ],
    defaultNetwork: mainnet,
    metadata,
    features: {
        analytics: true
    }
})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)
  
    return (
      <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </WagmiProvider>
    )
  }
  
  export default ContextProvider