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

import ShopRoom from './ShopRoom'
import { playSelectSound } from './utilities'
import soundsAndMusic from './audioUtils'
import { resetIdOnAllShopItems, restockShop } from './slices/shopSlice'

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
  const musicVolume = useSelector((state: RootState) => state.sounds.musicVolume)
  const [currentMusic, setCurrentMusic] = useState<any>(null)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (currentWorld === 1 && playingMusic) {
      playMusic(soundsAndMusic.adventureMusic.src)
    } else if (currentWorld === 2 && playingMusic) {
      playMusic(soundsAndMusic.beachMusic.src)
    } else if (currentWorld === 3 && playingMusic) {
      playMusic(soundsAndMusic.monstrousMonstroMusic.src)
    } else if (currentWorld === 4 && playingMusic) {
      playMusic(soundsAndMusic.deamonsMusic.src)
    } else if (currentWorld === 5 && playingMusic) {
      playMusic(soundsAndMusic.scherzoMusic.src)
    } else if (currentWorld === 6 && playingMusic) {
      playMusic(soundsAndMusic.danceToTheDeathMusic.src)
    } else if (currentWorld === 7 && playingMusic) {
      playMusic(soundsAndMusic.edgeOfExistenceMusic.src)
    }
  }, [currentWorld, playingMusic])

  const playMusic = (music: string) => {
    if (currentMusic) {
      currentMusic.pause()
    }
    const newAudio = new Audio(music)
    setCurrentMusic(newAudio)
    newAudio.loop = true;
    newAudio.volume = musicVolume
    newAudio.play()
  }

  const handleBossRoom = () => {
    dispatch(goToBossRoom())
    dispatch(setInRoom(true))
    playSelectSound()
  }

  const handleShopRoom = () => {
    dispatch(goToShopRoom())
    dispatch(setInRoom(true))
    playSelectSound()
  }

  const handleHealingRoom = () => {
    dispatch(goToHealingRoom())
    dispatch(setInRoom(true))
    playSelectSound()
  }

  useEffect(() => {
    dispatch(setRandomRooms())
  }, [])

  useEffect(() => {
    if (currentRoom === 'bossRoom' && currentWorld === 1) {
      playMusic(soundsAndMusic.boss1Music.src)
    } else if (currentRoom === 'bossRoom' && currentWorld === 2) {
      playMusic(soundsAndMusic.squirmingEvilMusic.src)
    } else if (currentRoom === 'bossRoom' && currentWorld === 3) {
      playMusic(soundsAndMusic.tensionRisingMusic.src)
    } else if (currentRoom === 'bossRoom' && currentWorld === 4) {
      playMusic(soundsAndMusic.boss2Music.src)
    } else if (currentRoom === 'bossRoom' && currentWorld === 5) {
      playMusic(soundsAndMusic.the13thReflectionMusic.src)
    } else if (currentRoom === 'bossRoom' && currentWorld === 6) {
      playMusic(soundsAndMusic.theCorruptedMusic.src)
    } else if (currentRoom === 'bossRoom' && currentWorld === 7) {
      playMusic(soundsAndMusic.lordOfTheCastleMusic.src)
    }
  }, [currentRoom])

  

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
      dispatch(restockShop())
      dispatch(resetIdOnAllShopItems())
    }
  }, [heroStats])

  useEffect(() => {
    if (resettingGame) {
      dispatch(resetGame(false))
      playMusic(soundsAndMusic.adventureMusic.src)
    }
  }, [resettingGame])

  useEffect(() => {
    if (currentMusic) {
      currentMusic.pause()
    } else if (currentMusic) {
      currentMusic.play()
    }
  }, [playingMusic])

  useEffect(() => {
    if (currentMusic) {
      currentMusic.volume = musicVolume
    }
  }, [musicVolume])

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
                <div className={`overlay ${randomEncounterAnimation && 'flash-white'}`}></div>
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
