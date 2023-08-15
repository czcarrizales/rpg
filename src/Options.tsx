import { useDispatch, useSelector } from "react-redux"
import { setShowOptions } from "./slices/gameSlice"
import './Options.css'
import { RootState } from "./store"
import { setMusicVolume } from "./slices/soundsSlice"

const Options = () => {
    const dispatch = useDispatch()
    const musicVolume = useSelector((state: RootState) => state.sounds.musicVolume)
  return (
    <div>
        <div className="options-container-top">
            <h2>Options</h2>
            <button className='options-container-back-button hero-button' onClick={() => dispatch(setShowOptions(false))}>Back</button>
        </div>
                  <button onClick={() => dispatch(setMusicVolume(musicVolume + 0.1))}>Raise Music Volume</button>
    </div>
  )
}

export default Options