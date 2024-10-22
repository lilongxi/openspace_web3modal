/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2024-10-22 15:33:46
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2024-10-22 15:45:09
 * @FilePath: /openspace_web3modal/app/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, arbitrum } from "@reown/appkit/networks";

export const projectId = 'd055f5fe4129ec10d77fe8e68980e7fb'

export const networks = [
    mainnet,
    arbitrum
]

export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({ storage: cookieStorage }),
    ssr: true,
    projectId,
    networks
})

export const config = wagmiAdapter.wagmiConfig