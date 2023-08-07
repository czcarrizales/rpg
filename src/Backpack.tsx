import React from 'react'
import { useSelector } from 'react-redux'

const Backpack = () => {
    const heroTreasure = useSelector(state => state.hero.treasure)
    return (
        <div>
            <h1>Backpack</h1>
            {heroTreasure.map((item) => (
                <div>
                    <h2>{item.name}</h2>
                    <p>Value: {item.money}</p>
                </div>

            ))}
        </div>
    )
}

export default Backpack