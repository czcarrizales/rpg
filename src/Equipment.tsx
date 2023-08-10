import { useDispatch, useSelector } from 'react-redux'
import { equipArmor, equipWeapon } from './slices/heroSlice'
import './Equipment.css'
import { RootState } from './store'
import { setShowEquipment } from './slices/gameSlice'

const Equipment = ({}) => {
    const heroEquipment = useSelector((state: RootState) => state.hero.equipment)
    console.log(heroEquipment)
    const dispatch = useDispatch()

    const handleWeaponEquip = (weapon: any) => {
        dispatch(equipWeapon(weapon))
    }
    const handleArmorEquip = (armor: any) => {
        dispatch(equipArmor(armor))
    }
    const showAllEquipment = () => {
        return (
            heroEquipment.length > 0
            ?
            heroEquipment.map((item) => {
                return (
                    <div>
                        <h2>{item.name} ({item.type})</h2>
                        {item.type === 'weapon' && 'damage' in item && <p>Damage: {item.damage}</p>}
                        {item.type === 'armor' && 'defense' in item &&  <p>Defense: {item.defense}</p>}
                        {item.type == 'weapon' && <button onClick={() => handleWeaponEquip(item)}>Equip</button>}
                        {item.type == 'armor' && <button onClick={() => handleArmorEquip(item)}>Equip</button>}
                        
                    </div>
    
            )
            })
            :
            <p>No equipment</p>
        )
    }

    return (
        <div id='equipment-container'>
            <div>
            <h1>Equipment</h1>
            <button onClick={() => dispatch(setShowEquipment(false))}>Go Back</button>
            </div> 
            {showAllEquipment()}
        </div>
    )
}

export default Equipment