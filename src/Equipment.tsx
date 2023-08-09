import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { equipArmor, equipWeapon } from './slices/heroSlice'

const Equipment = () => {
    const heroEquipment = useSelector(state => state.hero.equipment)
    const [equipmentFilter, setEquipmentFilter] = useState('')
    console.log(heroEquipment)
    const dispatch = useDispatch()

    const handleWeaponEquip = (weapon) => {
        dispatch(equipWeapon(weapon))
    }
    const handleArmorEquip = (armor) => {
        dispatch(equipArmor(armor))
    }
    const showAllEquipment = () => {
        return (
            heroEquipment.map((item) => {
                return (
                    <div>
                        <h2>{item.name} ({item.type})</h2>
                        {item.damage && <p>Damage: {item.damage}</p>}
                        {item.defense && <p>Defense: {item.defense}</p>}
                        {item.type == 'weapon' && <button onClick={() => handleWeaponEquip(item)}>Equip</button>}
                        {item.type == 'armor' && <button onClick={() => handleArmorEquip(item)}>Equip</button>}
                        
                    </div>
    
            )
            })
        )
    }

    const showWeapons = () => {
        const allWeapons = heroEquipment.filter(item => item.type !== 'weapon')
        return (
            allWeapons.map((item) => {
                return (
                    <div><h2>{item.name}</h2>
                    <p>{item.damage}</p></div>
                )
            })
        )

    }
    return (
        <div>
            <h1>Equipment</h1>
            {showAllEquipment()}
        </div>
    )
}

export default Equipment