import { useDispatch, useSelector } from 'react-redux'
import './ShopRoom.css'
import { goToMapRoom, setInRoom } from './slices/roomSlice'
import { RootState } from './store'
import { buyItemForBackpack } from './slices/heroSlice'
const ShopRoom = () => {
  const dispatch = useDispatch()
  const shopItems = useSelector((state: RootState) => state.shop.shopItems)
  const heroMoney = useSelector((state: RootState) => state.hero.money)
  const goBack = () => {
    dispatch(goToMapRoom())
    dispatch(setInRoom(false))
  }
  const buyItem = (money: any, item: any) => {
    if (heroMoney - money >= 0) {
      dispatch(buyItemForBackpack({money: money, item: item}))
    }
    
  }
  return (
    <div className='shop-room-container'>
        <h1>Shop</h1>
        <button onClick={() => goBack()}>go back</button>
        {shopItems.map(item => (
          <div>
            <p>{item.name}</p>
            <p>{item.money}</p>
            <button onClick={() => buyItem(item.money, item)}>Buy</button>
            </div>
        ))}
    </div>
  )
}

export default ShopRoom