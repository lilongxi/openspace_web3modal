/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2024-10-31 21:54:40
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2024-10-31 22:19:13
 * @FilePath: /openspace_web3modal/app/NFTMarketGraph.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

// https://api.studio.thegraph.com/query/90734/nftmarketgraphv1/v0.0.1
const APIURL = 'https://api.studio.thegraph.com/query/90734/nftmarketgraphv1/v0.0.1'
const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
  })

const listsOfQuery = `
    query {
        lists {
            id
            nft
            tokenId
            orderId
            seller
            payToken
            price
            deadline
            blockNumber
            blockTimestamp
            transactionHash
        }
        solds {
            id
            orderId
            buyer
            fee
            blockNumber
            blockTimestamp
            transactionHash
        }
    }
`

export default function NFTMarketGraph() {

    const [ graph, upateGraph ] = useState({})

    const listOfMarketGraph = useCallback(() => {
        client
        .query({
            query: gql(listsOfQuery),
        })
        .then((data) => {
            upateGraph(data)
        })
        .catch((err) => {
            console.log('Error fetching data: ', err)
        })
    }, [])

    useEffect(listOfMarketGraph, [])

    return (
        <div onClick={listOfMarketGraph}>
            <h3>NFTMarketGraph</h3>
            <code>{JSON.stringify(graph, null, 2)}</code>
        </div>
    )
}