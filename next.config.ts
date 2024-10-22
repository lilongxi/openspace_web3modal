/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2024-10-22 15:05:26
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2024-10-22 15:55:31
 * @FilePath: /openspace_web3modal/next.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  }
};

export default nextConfig;
