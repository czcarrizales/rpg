import { useDispatch, useSelector } from "react-redux"
import { setPlayingMusic, setShowOptions } from "./slices/gameSlice"
import './Options.css'
import { RootState } from "./store"
import { setMusicVolume, setSoundVolume } from "./slices/soundsSlice"
import { playSelectSound } from "./utilities"

const Options = () => {
    const dispatch = useDispatch()
    const musicVolume = useSelector((state: RootState) => state.sounds.musicVolume)
    const soundVolume = useSelector((state: RootState) => state.sounds.soundVolume)
    const goBack = () => {
        dispatch(setShowOptions(false))
        playSelectSound()
    }

    const raiseMusicVolume = () => {
        if (musicVolume === 1) {
            return
        } else {
            const parsedMusicVolume = parseFloat((musicVolume + 0.1).toFixed(1))
            dispatch(setMusicVolume(parsedMusicVolume))
        }
        
        console.log(musicVolume)
    }
    const lowerMusicVolume = () => {
        if (musicVolume === 0) {
            return
        } else {
            const parsedMusicVolume = parseFloat((musicVolume - 0.1).toFixed(1))
            dispatch(setMusicVolume(parsedMusicVolume))
        }
        
        console.log(musicVolume)
    }

    const lowerSoundVolume = () => {
        if (soundVolume === 0) {
            return
        } else {
            const parsedSoundVolume = parseFloat((soundVolume - 0.1).toFixed(1))
            dispatch(setSoundVolume(parsedSoundVolume))
        }
    }

    const raiseSoundVolume = () => {
        if (soundVolume === 1) {

        } else {
            const parsedSoundVolume = parseFloat((soundVolume + 0.1).toFixed(1))
            dispatch(setSoundVolume(parsedSoundVolume))
        }
    }
  return (
    <div>
        <div className="options-container-top">
            <h2>Options</h2>
            <button className='options-container-back-button hero-button' onClick={goBack}>Back</button>
           
        </div>
        <p>Music Volume: {musicVolume * 10}</p>
        <p>Sound Volume: {soundVolume * 10}</p>
        <button onClick={lowerMusicVolume}>Lower Music Volume</button>
                  <button onClick={raiseMusicVolume}>Raise Music Volume</button>
                  <br />
                  <button onClick={lowerSoundVolume}>Lower Sound Volume</button>
                  <button onClick={raiseSoundVolume}>Raise Sound Volume</button>
                  <br />
                  <button onClick={(() => dispatch(setPlayingMusic(false)))}>Mute Music</button>
                  <button onClick={(() => dispatch(setPlayingMusic(true)))}>Unmute Music</button>
    </div>
  )
}

export default Options