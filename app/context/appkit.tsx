/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2024-10-22 16:01:38
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2024-10-22 16:03:33
 * @FilePath: /openspace_web3modal/app/context/appkit.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'

import { createAppKit } from '@reown/appkit/react'
import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5'
import { mainnet, arbitrum } from '@reown/appkit/networks'

// 1. Get projectId at https://cloud.reown.com
const projectId = 'YOUR_PROJECT_ID'

// 2. Create a metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 3. Create the AppKit instance
createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata: metadata,
  networks: [mainnet, arbitrum],
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})
