import { useDispatch } from 'react-redux'
import './ShopRoom.css'
import { goToMapRoom, setInRoom } from './slices/roomSlice'
const ShopRoom = () => {
  const dispatch = useDispatch()
  const goBack = () => {
    dispatch(goToMapRoom())
    dispatch(setInRoom(false))
  }
  // const shopItems = [
  //   {
  //     type: 'potion',
  //     name: 'healing potion',
  //     gainHealth: 20
  //   },
  //   {
  //     type: 'potion',
  //     name: 'mana potion',
  //     gainMana: 20
  //   }
  // ]
  return (
    <div className='shop-room-container'>
        <h1>Shop</h1>
        <button onClick={() => goBack()}>go back</button>
        {}
    </div>
  )
}

export default ShopRoom