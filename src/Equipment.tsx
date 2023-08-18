import { useDispatch, useSelector } from 'react-redux'
import { equipArmor, equipWeapon } from './slices/heroSlice'
import './Equipment.css'
import { RootState } from './store'
import { setShowEquipment } from './slices/gameSlice'
import equip from '../public/sounds/equip.mp3'
import { playSound } from './utilities'
import select from '../public/sounds/select.mp3'

const Equipment = ({ }) => {
    const heroEquipment = useSelector((state: RootState) => state.hero.equipment)
    const heroWeapon = useSelector((state: RootState) => state.hero.weapon)
    const heroArmor = useSelector((state: RootState) => state.hero.armor)
    const dispatch = useDispatch()
    const handleWeaponEquip = (weapon: any) => {
        const audio = new Audio(equip)
        audio.volume = 0.3
        audio.play()
        dispatch(equipWeapon(weapon))
    }
    const handleArmorEquip = (armor: any) => {
        const audio = new Audio(equip)
        audio.volume = 0.3
        audio.play()
        dispatch(equipArmor(armor))
    }
    const goBack = () => {
        dispatch(setShowEquipment(false))
        playSound(select)
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
                            {item.type === 'armor' && 'defense' in item && <p>({item.defense} DEF)</p>}
                            {item.type == 'weapon' && <button className='equip-button hero-button' onClick={() => handleWeaponEquip(item)}>Equip</button>}
                            {item.type == 'armor' && <button className='equip-button hero-button' onClick={() => handleArmorEquip(item)}>Equip</button>}

                        </div>

                    )
                })
                :
                <p>No equipment</p>
        )
    }

    return (
        <div id='equipment-container'>
            <div className='equipment-container-top'>
                <h1 className='equipment-container-title'>Equipment</h1>
                <button className='equipment-container-back-button hero-button' onClick={goBack}>Back</button>
            </div>
            {/* <h1>Equipment</h1>
            <button className='hero-button' onClick={() => dispatch(setShowEquipment(false))}>Go Back</button> */}
            <div className="current-equipment">
                <div id='current-weapon'>
                    <p>Weapon: {heroWeapon.name ? `${heroWeapon.name} (${heroWeapon.damage} DMG)` : 'None'}</p>
                    {heroWeapon.image && <img src={heroWeapon.image} alt="" />}
                </div>
                <div id="current-armor">
                    <p>Shield: {heroArmor.name ? `${heroArmor.name} (${heroArmor.defense} DEF)` : 'None'}</p>
                    {heroArmor.image && <img src={heroArmor.image} alt="" />}
                </div>
            </div>
            <div className="equipment-container-all-equipment">
                {showAllEquipment()}
            </div>

        </div>
    )
}

export default Equipment