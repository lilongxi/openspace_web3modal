/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2024-11-01 17:24:06
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2024-11-01 17:24:36
 * @FilePath: /openspace_web3modal/app/components/ReadNFT.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useReadContract } from 'wagmi'
import ERC721ABI from '@openzeppelin/contracts/build/contracts/ERC721.json';

export function ReadNFT() {
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
  