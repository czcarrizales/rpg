import { useEffect, useState } from "react"
import './SpellRoom.css'
import { Spell, learnSpell } from "./slices/heroSlice"
import { useDispatch, useSelector } from "react-redux"
import { setInRoom } from "./slices/roomSlice"
import spellAppears from '../public/sounds/spellAppears.mp3'
import { playSound } from "./utilities"
import soundsAndMusic from "./audioUtils"
import { RootState } from "./store"
import { removeFromCurrentSpellPool } from "./slices/spellsSlice"

const SpellRoom = () => {
  const dispatch = useDispatch()
  const [spellAppearing, setSpellAppearing] = useState(true)
  const currentSpellPool = useSelector((state: RootState) => state.spells.currentSpellPool)
  const [randomSpell, setRandomSpell] = useState<Spell>({
    type: null,
    name: null,
    points: null,
    mana: null,
    image: null
  })

  const getRandomSpell = () => {
    const randomIndex = Math.floor(Math.random() * currentSpellPool.length)
    setRandomSpell(currentSpellPool[randomIndex])
  }

  const handleLearnSpell = () => {
    dispatch(learnSpell(randomSpell))
    dispatch(setInRoom(false))
    dispatch(removeFromCurrentSpellPool(randomSpell))
    playSound(soundsAndMusic.selectSound)
  }

  const playSpellAppearingSound = () => {
    const audio = new Audio(spellAppears)
    audio.volume = 0.35
    audio.play()
  }

  useEffect(() => {
    setTimeout(() => {
      setSpellAppearing(false)
      playSpellAppearingSound()
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