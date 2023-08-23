import { useDispatch } from "react-redux";
import { setEnemyIsAttacked } from "./slices/enemySlice";
import { setHeroIsAttacked } from "./slices/heroSlice";
import select from '../public/sounds/select.mp3'
import buy from '../public/sounds/buy.mp3'
import error from '../public/sounds/error.mp3'
import heal from '../public/sounds/heal.mp3'
import fire from '../public/sounds/fire.mp3'
import quake from '../public/sounds/quake.mp3'
import thunder from '../public/sounds/thunder.mp3'
import blizzard from '../public/sounds/blizzard.mp3'
import poison from '../public/sounds/poison.mp3'
import protect from '../public/sounds/protect.mp3'
import stop from '../public/sounds/stop.mp3'
import treasureAppears from '../public/sounds/treasureAppears.mp3'
import attack from '../public/sounds/attack.mp3'

type DispatchFunction = ReturnType<typeof useDispatch>
interface AudioType extends HTMLAudioElement {}

export const enemyTakeDamageFlash = (dispatch: DispatchFunction) => {
    setTimeout(() => {
        dispatch(setEnemyIsAttacked(true));
      
        setTimeout(() => {
          dispatch(setEnemyIsAttacked(false));
      
          setTimeout(() => {
            dispatch(setEnemyIsAttacked(true));
      
            setTimeout(() => {
              dispatch(setEnemyIsAttacked(false));
            }, 80); // Second flash duration is 100 milliseconds
      
          }, 80); // Wait for 100 milliseconds before the second flash
      
        }, 80); // First flash duration is 100 milliseconds
      
      }, 80); // Wait for 100 milliseconds before the first flash
}

export const heroTakeDamageFlash = (dispatch: DispatchFunction) => {
    setTimeout(() => {
        dispatch(setHeroIsAttacked(true));
      
        setTimeout(() => {
          dispatch(setHeroIsAttacked(false));
      
          setTimeout(() => {
            dispatch(setHeroIsAttacked(true));
      
            setTimeout(() => {
              dispatch(setHeroIsAttacked(false));
            }, 80); // Second flash duration is 100 milliseconds
      
          }, 80); // Wait for 100 milliseconds before the second flash
      
        }, 80); // First flash duration is 100 milliseconds
      
      }, 80); // Wait for 100 milliseconds before the first flash
}

export const playSound = (sound: AudioType) => {
    sound.volume = 0.3
    sound.preload = "auto"
    sound.play()
}

export const playAttackSound = () => {
    const audio = new Audio(attack)
    audio.volume = 0.3
    audio.preload = "auto"
    audio.play()
}

export const playSelectSound = () => {
    const audio = new Audio(select)
    audio.volume = 0.3
    audio.preload = "auto"
    audio.play()
}

export const playBuySound = () => {
    const audio = new Audio(buy)
    audio.volume = 0.3
    audio.preload = "auto"
    audio.play()
}

export const playErrorSound = () => {
    const audio = new Audio(error)
    audio.volume = 0.3
    audio.preload = "auto"
    audio.play()
}

export const playHealSound = () => {
    const audio = new Audio(heal)
    audio.volume = 0.3
    audio.preload = "auto"
    audio.play()
}

export const playFireSound = () => {
    const audio = new Audio(fire)
    audio.volume = 0.3
    audio.preload = "auto"
    audio.play()
}

export const playQuakeSound = () => {
    const audio = new Audio(quake)
    audio.volume = 0.3
    audio.preload = "auto"
    audio.play()
}

export const playBlizzardSound = () => {
    const audio = new Audio(blizzard)
    audio.volume = 0.3
    audio.preload = "auto"
    audio.play()
}

export const playThunderSound = () => {
    const audio = new Audio(thunder)
    audio.volume = 0.3
    audio.preload = "auto"
    audio.play()
}

export const playProtectSound = () => {
    const audio = new Audio(protect)
    audio.volume = 0.3
    audio.preload = "auto"
    audio.play()
}

export const playPoisonSound = () => {
    const audio = new Audio(poison)
    audio.volume = 0.3
    audio.preload = "auto"
    audio.play()
}

export const playStopSound = () => {
    const audio = new Audio(stop)
    audio.volume = 0.3
    audio.preload = "auto"
    audio.play()
}

export const playTreasureAppearsSound = () => {
    const audio = new Audio(treasureAppears)
    audio.volume = 0.3
    audio.preload = "auto"
    audio.play()
}