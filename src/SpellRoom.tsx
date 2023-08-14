import { useEffect, useState } from "react"
import './SpellRoom.css'
import { Spell, learnSpell } from "./slices/heroSlice"
import { useDispatch } from "react-redux"
import { setInRoom } from "./slices/roomSlice"

const SpellRoom = () => {
  const dispatch = useDispatch()
  const allSpells = [
    {
      type: 'HEAL',
      name: 'light heal',
      points: 20,
      mana: 5
    },
    {
      type: 'HEAL',
      name: 'medium heal',
      points: 40,
      mana: 10
    },
    {
      type: 'DAMAGE',
      name: 'fireball',
      points: 25,
      mana: 5
    },
    {
      type: 'DAMAGE',
      name: 'lightning bolt',
      points: 10,
      mana: 2
    }
  ]

  const [randomSpell, setRandomSpell] = useState<Spell>({
    type: null,
    name: null,
    points: null,
    mana: null
  })

  const getRandomSpell = () => {
    const randomIndex = Math.floor(Math.random() * allSpells.length)
    setRandomSpell(allSpells[randomIndex])
  }

  const handleLearnSpell = () => {
    dispatch(learnSpell(randomSpell))
    dispatch(setInRoom(false))
  }

  useEffect(() => {
    getRandomSpell()
  }, [])
  return (
    <div id="spell-room-container">
      <h1>Spell Room</h1>
      <p>{randomSpell.name}</p>
      <button onClick={handleLearnSpell}>Learn</button>
    </div>
  )
}

export default SpellRoom