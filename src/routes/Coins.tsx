import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api'

const Container = styled.div`
    padding: 20px 20px;
    max-width: 480px;
    margin: 0 auto;
`
const Header = styled.header``
const CoinsList = styled.ul``
const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.textColor};
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        display: flex;
        align-items: center;
        padding: 5px;
        transition: color 0.2s ease-in;
        /* display: block; */
    }
    &:hover {
        a {
            color:${props => props.theme.accentColor};
        }
    }
`
const Title = styled.h1`
    font-size:48px;
    color:${props => props.theme.accentColor};
    text-align:center;
`
const Loader = styled.span`
    text-align: center;
    display: block;
`
const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`
interface Icoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}
interface ICoinsProps {

}
function Coins({ }: ICoinsProps) {
    const { isLoading, data } = useQuery<Icoin[]>("allCoins", fetchCoins)
    return (
        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
            {isLoading ? (<Loader>Loading...</Loader>) :
                (<CoinsList>
                    {data?.slice(0, 100).map(coin => (
                        <Coin key={coin.id}>
                            <Link to={{ pathname: `/${coin.id}`, state: { name: coin.name } }}>
                                <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>)
            }
        </Container >
    )
}

export default Coins;
// Link 에 to 와 state 를 분리해서 넣어주어야 하나보다