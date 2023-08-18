import { useDispatch } from "react-redux";
import { setEnemyIsAttacked } from "./slices/enemySlice";
import { setHeroIsAttacked } from "./slices/heroSlice";

type DispatchFunction = ReturnType<typeof useDispatch>

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

export const playSound = (sound: any) => {
    const audio = new Audio(sound.src)
    audio.volume = 0.35
    audio.preload = "auto"
    audio.play()
}