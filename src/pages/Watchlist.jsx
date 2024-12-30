import React, { useEffect, useState } from 'react'

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([])

    useEffect(() => {
        // Load watchlist from local storage on mount
        const storedList = JSON.parse(localStorage.getItem('watchlist') || '[]')
        setWatchlist(storedList)
    }, [])

    // Optionally remove coin from watchlist
    const handleRemove = (coinId) => {
        const updated = watchlist.filter((c) => c.id !== coinId)
        setWatchlist(updated)
        localStorage.setItem('watchlist', JSON.stringify(updated))
    }

    if (!watchlist.length) {
        return (
            <div className="p-6 bg-primary-bg min-h-screen text-primary-text">
                <h1 className="text-3xl font-bold mb-6">Your Watchlist</h1>
                <p className="text-secondary-text">No coins in your watchlist yet.</p>
            </div>
        )
    }

    return (
        <div className="p-6 bg-primary-bg min-h-screen text-primary-text">
            <h1 className="text-3xl font-bold mb-6">Your Watchlist</h1>

            <div className="overflow-x-auto bg-white rounded-md shadow p-4">
                <table className="w-full text-left">
                    <thead className="border-b border-gray-200">
                        <tr>
                            <th className="py-2 px-3">Coin</th>
                            <th className="py-2 px-3">Price (USD)</th>
                            <th className="py-2 px-3">24h %</th>
                            <th className="py-2 px-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {watchlist.map((coin) => {
                            const priceChange = coin.price_change_percentage_24h || 0
                            const isPositive = priceChange >= 0

                            return (
                                <tr key={coin.id} className="border-b last:border-none">
                                    <td className="py-2 px-3 flex items-center space-x-2">
                                        <img
                                            src={coin.image}
                                            alt={coin.name}
                                            className="w-5 h-5"
                                        />
                                        <span className="font-medium">
                                            {coin.name} ({coin.symbol.toUpperCase()})
                                        </span>
                                    </td>
                                    <td className="py-2 px-3">
                                        ${coin.current_price.toLocaleString()}
                                    </td>
                                    <td className="py-2 px-3">
                                        <span
                                            className={`font-semibold ${isPositive ? 'text-positive' : 'text-negative'
                                                }`}
                                        >
                                            {priceChange.toFixed(2)}%
                                        </span>
                                    </td>
                                    <td className="py-2 px-3 text-right">
                                        <button
                                            onClick={() => handleRemove(coin.id)}
                                            className="bg-negative hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Watchlist
