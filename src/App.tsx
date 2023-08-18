import './App.css'
import Enemy from './Enemy'
import Hero from './Hero'
import TreasureRoom from './TreasureRoom'
import HealingRoom from './HealingRoom'
import BossRoom from './BossRoom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { goToBossRoom, goToHealingRoom, goToShopRoom, setBossBattle, setInRoom, setRandomRooms } from './slices/roomSlice'
import WeaponRoom from './WeaponRoom'
import SpellRoom from './SpellRoom'
import RoomButton from './RoomButton'
import { gainLevel } from './slices/heroSlice'
import { resetGame, setGameOver, setLevelingUp } from './slices/gameSlice'
import { GameOver } from './GameOver'
import ArmorRoom from './ArmorRoom'
import { RootState } from './store'
import * as audioUtils from './audioUtils'
import ShopRoom from './ShopRoom'
import { playSound } from './utilities'

function App() {

  const roomState = useSelector((state: RootState) => state.room.currentRoom)
  const randomRooms = useSelector((state: RootState) => state.room.randomRooms)
  const bossBattle = useSelector((state: RootState) => state.room.bossBattle)
  const inRoom = useSelector((state: RootState) => state.room.inRoom)
  const heroStats = useSelector((state: RootState) => state.hero)
  const currentWorld = useSelector((state: RootState) => state.game.currentWorld)
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom)
  const gameOver = useSelector((state: RootState) => state.game.gameOver)
  const resettingGame = useSelector((state: RootState) => state.game.resettingGame)
  const playingMusic = useSelector((state: RootState) => state.game.playingMusic)
  const randomEncounterAnimation = useSelector((state: RootState) => state.game.randomEncounterAnimation)
  const [currentMusic, setCurrentMusic] = useState<any>(null)
  const dispatch = useDispatch()

  const playMusic = (music: string) => {
    if (currentMusic) {
      currentMusic.pause()
    }
    const newAudio = new Audio(music)
    setCurrentMusic(newAudio)
    newAudio.loop = true;
    newAudio.volume = 0.2
    newAudio.play()
  }

  const handleBossRoom = () => {
    dispatch(goToBossRoom())
    dispatch(setInRoom(true))
    playSound(audioUtils.selectSound)
  }

  const handleShopRoom = () => {
    dispatch(goToShopRoom())
    dispatch(setInRoom(true))
    playSound(audioUtils.selectSound)
  }

  const handleHealingRoom = () => {
    dispatch(goToHealingRoom())
    dispatch(setInRoom(true))
    playSound(audioUtils.selectSound)
  }

  useEffect(() => {
    dispatch(setRandomRooms())
  }, [])

  useEffect(() => {
    if (currentRoom === 'bossRoom' && currentWorld === 1) {
      playMusic(audioUtils.boss1Music.src)
    } else if (currentRoom === 'bossRoom' && currentWorld === 2) {
      playMusic(audioUtils.squirmingEvilMusic.src)
    } else if (currentRoom === 'bossRoom' && currentWorld === 3) {
      playMusic(audioUtils.tensionRisingMusic.src)
    } else if (currentRoom === 'bossRoom' && currentWorld === 4) {
      playMusic(audioUtils.boss2Music.src)
    } else if (currentRoom === 'bossRoom' && currentWorld === 5) {
      playMusic(audioUtils.the13thReflectionMusic.src)
    } else if (currentRoom === 'bossRoom' && currentWorld === 6) {
      playMusic(audioUtils.theCorruptedMusic.src)
    } else if (currentRoom === 'bossRoom' && currentWorld === 7) {
      playMusic(audioUtils.lordOfTheCastleMusic.src)
    }
  }, [currentRoom])

  useEffect(() => {
    if (currentWorld === 1 && playingMusic) {
      playMusic(audioUtils.adventureMusic.src)
    } else if (currentWorld === 2 && playingMusic) {
      playMusic(audioUtils.beachMusic.src)
    } else if (currentWorld === 3 && playingMusic) {
      playMusic(audioUtils.monstrousMonstroMusic.src)
    } else if (currentWorld === 4 && playingMusic) {
      playMusic(audioUtils.deamonsMusic.src)
    } else if (currentWorld === 5 && playingMusic) {
      playMusic(audioUtils.scherzoMusic.src)
    } else if (currentWorld === 6 && playingMusic) {
      playMusic(audioUtils.danceToTheDeathMusic.src)
    } else if (currentWorld === 7 && playingMusic) {
      playMusic(audioUtils.edgeOfExistenceMusic.src)
    }
  }, [currentWorld, playingMusic])

  useEffect(() => {
    if (heroStats.experience >= heroStats.experienceToLevelUp) {
      dispatch(gainLevel())
      dispatch(setLevelingUp(true))
      console.log('hero levels up!')
    }
  }, [heroStats.experience])

  useEffect(() => {
    if (randomRooms.length === 0 && !inRoom) {
      dispatch(setBossBattle(true))
      console.log('boss room shows!')
    }
  }, [inRoom])

  useEffect(() => {
    if (heroStats.health <= 0) {
      dispatch(setInRoom(false))
      dispatch(setGameOver(true))
    }
  }, [heroStats])

  useEffect(() => {
    if (resettingGame) {
      dispatch(resetGame(false))
      playMusic(audioUtils.adventureMusic.src)
    }
  }, [resettingGame])



  return (
    <div className='board'>

      <div className='inRoom-display' style={{ display: inRoom ? 'none' : undefined }}>
        {
          !gameOver
            ?
            (
              <>
                <div id='current-room' className='map'>
                  <RoomButton inRoom={inRoom} />
                  {bossBattle ? <button id='map-healing-room-button' className='room-button' onClick={handleHealingRoom} disabled={inRoom}>Rest</button> : <RoomButton inRoom={inRoom} />}
                  <RoomButton inRoom={inRoom} />
                  <RoomButton inRoom={inRoom} />
                  {bossBattle ? <button className='room-button boss-room-button' onClick={handleBossRoom} disabled={inRoom}>Boss</button> : <RoomButton inRoom={inRoom} />}
                  <RoomButton inRoom={inRoom} />
                  <RoomButton inRoom={inRoom} />
                  {bossBattle ? <button onClick={handleShopRoom} id='map-shop-room-button' className='room-button'>Shop</button> : <RoomButton inRoom={inRoom} />}
                  <RoomButton inRoom={inRoom} />
                </div>
                <div className={`overlay ${randomEncounterAnimation && 'flash-white'} `}></div>
              </>
            )
            :
            <div id='current-room'>
              <GameOver />
            </div>


        }
      </div>
      {
        inRoom &&
        <div id='current-room'>
          {roomState === 'enemyRoom' && <Enemy />}
          {roomState === 'treasureRoom' && <TreasureRoom />}
          {roomState === 'healingRoom' && <HealingRoom />}
          {roomState === 'weaponRoom' && <WeaponRoom />}
          {roomState === 'armorRoom' && <ArmorRoom />}
          {roomState === 'bossRoom' && <BossRoom />}
          {roomState === 'spellRoom' && <SpellRoom />}
          {roomState === 'shopRoom' && <ShopRoom />}

        </div>
      }
      <div id='current-hero'>
        <Hero />
      </div>
    </div>


  )
}

export default App
