import { useDispatch, useSelector } from 'react-redux'
import './Backpack.css'
import { RootState } from './store'
import { setShowBackpack } from './slices/gameSlice'
import { gainMoney, healToFull, raiseHeroHealth, raiseMana, sellItemFromBackpack, setMana } from './slices/heroSlice'

const Backpack = () => {
    const heroBackpack = useSelector((state: RootState) => state.hero.backpack)
    const inShop = useSelector((state: RootState) => state.shop.inShop)
    const heroStats = useSelector((state: RootState) => state.hero)
    const dispatch = useDispatch()
    const handleItemUse = (item: any) => {
        const maxHealth = heroStats.maxHealth;
        const maxMana = heroStats.maxMana;
        const currentHealth = heroStats.health;
        const currentMana = heroStats.mana;
        if (item.type == 'USABLE') {
            switch (item.action) {
                case 'RAISEHEALTH':
                    const newHealth = currentHealth + item.points;
                    if (newHealth > maxHealth) {
                        dispatch(healToFull())
                    } else {
                        dispatch(raiseHeroHealth(item.points))
                    }
                    break;
                case 'RAISEMANA':
                    const newMana = currentMana + item.points;
                    if (newMana > maxMana) {
                        dispatch(setMana(maxMana))
                    } else {
                        dispatch(raiseMana(item.points))
                    }
                    
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
            <div className='backpack-container-top'>
            <h1>Backpack</h1>
            <button className='hero-button backpack-back-button' onClick={() => dispatch(setShowBackpack(false))}>Back</button>
            </div>
            <div className='backpack-all-items'>
            {
            heroBackpack.length > 0
            ?
            heroBackpack.map((item) => (
                <div className='backpack-item-details'>
                    <img className='backpack-item-image' src={item.image} alt="" />
                    <p className='backpack-item-description'>
                        {item.name}</p>
                        {item.type && <button className='take-button backpack-item-use-button' onClick={() => handleItemUse(item)}>Use</button>}
                        <p className='backpack-item-value'>(Value: {item.money})</p>
                    {inShop && <button className='take-button backpack-use-button' onClick={() => handleSellItem(item, item.money)}>Sell</button>}
                    
                </div>

            ))
            :
            <p>No items</p>
            
            }
            </div>
            
        </div>
    )
}

export default Backpack