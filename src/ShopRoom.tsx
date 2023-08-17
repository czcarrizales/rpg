import { useDispatch, useSelector } from 'react-redux'
import './ShopRoom.css'
import { goToMapRoom, setInRoom } from './slices/roomSlice'
import { RootState } from './store'
import { buyItemForBackpack } from './slices/heroSlice'
import { useEffect } from 'react'
import { removeFromShop, setInShop } from './slices/shopSlice'
import shopAppears from '../public/sounds/shopAppears.mp3'
const ShopRoom = () => {
  const dispatch = useDispatch()
  const shopItems = useSelector((state: RootState) => state.shop.shopItems)
  const heroMoney = useSelector((state: RootState) => state.hero.money)
  const goBack = () => {
    dispatch(goToMapRoom())
    dispatch(setInRoom(false))
    dispatch(setInShop(false))
  }
  const buyItem = (money: any, item: any) => {
    if (heroMoney - money >= 0) {
      dispatch(buyItemForBackpack({money: money, item: item}))
      dispatch(removeFromShop(item.id))
    }
  }

  const playSound = () => {
    const audio = new Audio(shopAppears)
    audio.volume = 0.35
    audio.play()
  }

  useEffect(() => {
    dispatch(setInShop(true))
    playSound()
  }, [])
  return (
    <div className='shop-room-container'>
        <h1>Shop</h1>
        <button className='hero-button' onClick={() => goBack()}>go back</button>
        {shopItems.map(item => (
          <div className='shop-item-details'>
            <img className='shop-item-image' src={item.image} alt="" />
            <p>{item.name}</p>
            <p>Cost: {item.money}</p>
            <button className='take-button' onClick={() => buyItem(item.money, item)}>Buy</button>
            </div>
        ))}
    </div>
  )
}

export default ShopRoom