import { useSelector } from 'react-redux'
import './Backpack.css'
import { RootState } from './store'

const Backpack = () => {
    const heroTreasure = useSelector((state: RootState) => state.hero.treasure)
    return (
        <div id='backpack-container'>
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