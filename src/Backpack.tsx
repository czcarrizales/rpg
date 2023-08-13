import { useDispatch, useSelector } from 'react-redux'
import './Backpack.css'
import { RootState } from './store'
import { setShowBackpack } from './slices/gameSlice'
import { gainMoney, raiseHeroHealth, raiseMana, sellItemFromBackpack } from './slices/heroSlice'

const Backpack = () => {
    const heroBackpack = useSelector((state: RootState) => state.hero.backpack)
    const inShop = useSelector((state: RootState) => state.shop.inShop)
    const dispatch = useDispatch()
    const handleItemUse = (item: any) => {
        if (item.type == 'USABLE') {
            switch (item.action) {
                case 'RAISEHEALTH':
                    dispatch(raiseHeroHealth(item.points))
                    break;
                case 'RAISEMANA':
                    dispatch(raiseMana(item.points))
                    break;
                default:
                    break;
            }
        } else if (item.type == 'TREASURE') {
            dispatch(sellItemFromBackpack(item))
            dispatch(gainMoney(item.money))
        }
    }

    const handleSellItem = (item: any, money: any) => {
        dispatch(sellItemFromBackpack(item))
        dispatch(gainMoney(money))
    }
    return (
        <div id='backpack-container'>
            <div>
            <h1>Backpack</h1>
            <button className='hero-button' onClick={() => dispatch(setShowBackpack(false))}>Go Back</button>
            </div>
            {
            heroBackpack.length > 0
            ?
            heroBackpack.map((item) => (
                <div>
                    <h2>{item.name}</h2>
                    <p>Value: {item.money}</p>
                    {item.type && <button onClick={() => handleItemUse(item)}>Use</button>}
                    {inShop && <button onClick={() => handleSellItem(item, item.money)}>Sell</button>}
                </div>

            ))
            :
            <p>No items</p>
            }
        </div>
    )
}

export default Backpack