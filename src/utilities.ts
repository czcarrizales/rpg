import { useDispatch } from "react-redux";
import { setEnemyIsAttacked } from "./slices/enemySlice";
import { setHeroIsAttacked } from "./slices/heroSlice";
import select from '../public/sounds/select.mp3'
import buy from '../public/sounds/buy.mp3'
import error from '../public/sounds/error.mp3'
import heal from '../public/sounds/heal.mp3'

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
    sound.volume = 0.35
    sound.preload = "auto"
    sound.play()
}

export const playSelectSound = () => {
    const audio = new Audio(select)
    audio.volume = 0.35
    audio.preload = "auto"
    audio.play()
}

export const playBuySound = () => {
    const audio = new Audio(buy)
    audio.volume = 0.35
    audio.preload = "auto"
    audio.play()
}

export const playErrorSound = () => {
    const audio = new Audio(error)
    audio.volume = 0.35
    audio.preload = "auto"
    audio.play()
}

export const playHealSound = () => {
    const audio = new Audio(heal)
    audio.volume = 0.35
    audio.preload = "auto"
    audio.play()
}