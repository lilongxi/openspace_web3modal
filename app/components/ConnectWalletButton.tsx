/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2024-11-01 17:23:21
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2024-11-01 17:23:48
 * @FilePath: /openspace_web3modal/app/components/ConnectWalletButton.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useAppKit } from '@reown/appkit/react'

export function ConnectWalletButton() {
    const { open } = useAppKit()
    return (
      <div>
      <span onClick={() => open()}>Open Connect Modal</span>
      <br />
      <span onClick={() => open({ view: 'Networks' })}>Open Network Modal</span>
      </div>
    )
}