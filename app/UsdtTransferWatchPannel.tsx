/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2024-10-29 15:21:26
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2024-10-29 15:52:46
 * @FilePath: /openspace_web3modal/app/UsdtWatchPannel.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { createPublicClient, http, parseAbiItem, formatUnits, PublicClient, OnBlockNumberParameter } from "viem";
import { mainnet } from "viem/chains";

interface ITransferProp {
    blockNumber: string, // 转换为字符串
    transactionHash: string,
    from: string,
    to: string,
    value: string
}

// USDT 合约地址
const USDT_CONTRACT_ADDRESS = '0xdac17f958d2ee523a2206206994597c13d831ec7';

// Transfer 事件的 ABI 格式
const TRANSFER_EVENT_ABI = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)');

export default function UsdtTransferWatchPannel() {

    const clientRef = useRef<PublicClient>();

    const [block, setBlock] = useState<{ number: number, hash: string }>({ number: 0, hash: '' });
    const [transfers, setTransfers] = useState<Array<ITransferProp>>([]);

    async function initRecentlyBlockData() {
        const latestBlock = (await clientRef.current?.getBlock({ blockTag: 'latest' }))!;
        return {
            number: Number(latestBlock.number),
            hash: latestBlock.hash
        }
    }

    async function onWatchBlockNumber(blockNumber: OnBlockNumberParameter) {
        if (!blockNumber) return
        const safeBlockNumber = BigInt(blockNumber); // 提供默认值
        const logs = (await clientRef.current?.getLogs({
            address: USDT_CONTRACT_ADDRESS,
            event: TRANSFER_EVENT_ABI,
            fromBlock: safeBlockNumber,
            toBlock: safeBlockNumber,
        }))!;
        if (!logs) return
        const newTransfers = logs.map(log => {
            const { from, to, value } = log.args || {};
            return {
                blockNumber: log.blockNumber.toString(), // 转换为字符串
                transactionHash: log.transactionHash,
                from,
                to,
                value: value ? Number(formatUnits(value, 6)).toFixed(5) : '0.00000' // 处理 value 可能为 undefined 的情况
            } as ITransferProp;
        });
        setTransfers(newTransfers);
    }

    async function subscribeToEvent() {
        clientRef.current?.watchBlockNumber({
            onBlockNumber: onWatchBlockNumber,
            onError(error) {
                console.log(error);
            },
        })
    }

    useEffect(() => {
        clientRef.current = createPublicClient({ chain: mainnet, transport: http('https://rpc.flashbots.net'),});
        subscribeToEvent();
        initRecentlyBlockData().then(setBlock)
    }, [])

    return (
        <div>
            <h1>最新区块信息</h1>
            <p>区块高度: {block?.number}</p>
            <p>区块哈希值: {block?.hash}</p>
            <h2>最新 USDT 转账记录</h2>
            {transfers.map((transfer, index) => (
                <div key={index}>
                    <p>在 {transfer.blockNumber} 区块 {transfer.transactionHash} 交易中从 {transfer?.from} 转账 {transfer.value} USDT 到 {transfer.to}</p>
                </div>
            ))}
        </div>
    )
}