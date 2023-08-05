import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { equipWeapon } from './slices/heroSlice'

const Equipment = () => {
    const heroEquipment = useSelector(state => state.hero.equipment)
    console.log(heroEquipment)
    const dispatch = useDispatch()

    const handleWeaponEquip = (weapon) => {
        dispatch(equipWeapon(weapon))
    }
    return (
        <div>
            <h1>Equipment</h1>
            {heroEquipment.map((item) => (
                <div>
                    <h2>{item.name}</h2>
                    <p>{item.damage}</p>
                    <button onClick={() => handleWeaponEquip(item)}>Equip</button>
                </div>

            ))}
        </div>
    )
}

export default Equipment