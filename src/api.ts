export async function fetchCoins() {
    const res = await fetch("https://api.coinpaprika.com/v1/coins")
    const json = await res.json()
    return json
}