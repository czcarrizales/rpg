import { useDispatch, useSelector } from 'react-redux'
import './Backpack.css'
import { RootState } from './store'
import { setShowBackpack } from './slices/gameSlice'

const Backpack = () => {
    const heroTreasure = useSelector((state: RootState) => state.hero.treasure)
    const dispatch = useDispatch()
    return (
        <div id='backpack-container'>
            <div>
            <h1>Backpack</h1>
            <button className='hero-button' onClick={() => dispatch(setShowBackpack(false))}>Go Back</button>
            </div>
            
            {
            heroTreasure.length > 0
            ?
            heroTreasure.map((item) => (
                <div>
                    <h2>{item.name}</h2>
                    <p>Value: {item.money}</p>
                </div>

            ))
            :
            <p>No items</p>
            }
        </div>
    )
}

export default Backpack