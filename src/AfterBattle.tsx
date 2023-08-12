import { useDispatch } from "react-redux"
import { setAfterBattle } from "./slices/gameSlice"
import './AfterBattle.css'

const AfterBattle = (props: any) => {
    const dispatch = useDispatch()
  return (
    <div className="after-battle-container">
        <p>{props.name} defeated!</p>
        <p>XP Gained: {props.xp}</p>
        <p>Money Gained: {props.money}</p>
        <button onClick={() => dispatch(setAfterBattle(false))}>Continue</button>
    </div>
  )
}

export default AfterBattle