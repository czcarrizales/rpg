import { useEffect, useState } from "react"
import './SpellRoom.css'
import { Spell, learnSpell } from "./slices/heroSlice"
import { useDispatch } from "react-redux"
import { setInRoom } from "./slices/roomSlice"
import spellAppears from '../public/sounds/spellAppears.mp3'

const SpellRoom = () => {
  const dispatch = useDispatch()
  const [spellAppearing, setSpellAppearing] = useState(true)
  const allSpells = [
    {
      type: 'HEAL',
      name: 'Cure',
      points: 20,
      mana: 5,
      image: '/images/spells/cure.png'
    },
    {
      type: 'DAMAGE',
      name: 'Fire',
      points: 25,
      mana: 5,
      image: '/images/spells/fire.png'
    },
    {
      type: 'DAMAGE',
      name: 'Blizzard',
      points: 10,
      mana: 2,
      image: '/images/spells/blizzard.png'
    }
  ]

  const [randomSpell, setRandomSpell] = useState<Spell>({
    type: null,
    name: null,
    points: null,
    mana: null,
    image: null
  })

  const getRandomSpell = () => {
    const randomIndex = Math.floor(Math.random() * allSpells.length)
    setRandomSpell(allSpells[randomIndex])
  }

  const handleLearnSpell = () => {
    dispatch(learnSpell(randomSpell))
    dispatch(setInRoom(false))
  }

  const playSound = () => {
    const audio = new Audio(spellAppears)
    audio.volume = 0.35
    audio.play()
  }

  useEffect(() => {
    setTimeout(() => {
      setSpellAppearing(false)
      playSound()
    }, 1000);
    getRandomSpell()
  }, [])
  return (
    <div id="spell-room-container">
      <h1>Spell Room</h1>
      <p className={spellAppearing ? 'item-appearing-hide-content' : ''}>{randomSpell.name}</p>
      <img className="spell-room-image item-appearing" src={randomSpell.image!} alt="" />
      <button className={`take-button ${spellAppearing ? 'item-appearing-hide-content' : ''}`} onClick={handleLearnSpell}>Learn</button>
    </div>
  )
}

export default SpellRoom