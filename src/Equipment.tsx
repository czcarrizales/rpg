import { useDispatch, useSelector } from 'react-redux'
import { equipArmor, equipWeapon } from './slices/heroSlice'
import './Equipment.css'
import { RootState } from './store'
import { setShowEquipment } from './slices/gameSlice'
import { useState } from 'react'

const Equipment = ({}) => {
    const heroEquipment = useSelector((state: RootState) => state.hero.equipment)
    const heroWeapon = useSelector((state: RootState) => state.hero.weapon)
    const heroArmor = useSelector((state: RootState) => state.hero.armor)
    console.log(heroEquipment)
    const dispatch = useDispatch()
    const [showingAllEquipment, setShowingAllEquipment] = useState(false)
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
                    <div className='equipment-details'>
                        <img className='equipment-detail-image' src={item.image} alt="" />
                        <p>{item.name}</p>
                        {item.type === 'weapon' && 'damage' in item && <p>({item.damage} DMG)</p>}
                        {item.type === 'armor' && 'defense' in item &&  <p>({item.defense} DEF)</p>}
                        {item.type == 'weapon' && <button  onClick={() => handleWeaponEquip(item)}>Equip</button>}
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
            <button className='hero-button' onClick={() => dispatch(setShowEquipment(false))}>Go Back</button>
            <div id='current-weapon'>
                <p>Weapon: {heroWeapon.name ? heroWeapon.name : 'None'}</p>
                {heroWeapon.image && <img src={heroWeapon.image} alt="" />}
                </div>
                <div id="current-armor">
                    <p>Shield: {heroArmor.name ? heroArmor.name : 'None'}</p>
                    {heroArmor.image && <img src={heroArmor.image} alt="" />}
                </div>
            {showAllEquipment()}
            </div>
            
        </div>
    )
}

export default Equipment