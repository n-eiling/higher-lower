import { useNavigate } from "react-router-dom"
import useScoreStore from "../stores/scoreStore"
import { supabase } from "../supabase"
import Button from "./Button"

type Props = {
  active: boolean | null
}



export default function TryAgainModal({ active }: Props) {
  const navigate = useNavigate()

  async function saveHighScore(score: number) {
    let username = (document.getElementById("username") as HTMLInputElement).value;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username);

    if (error || data.length !== 0) {
      console.error(error);
      (document.getElementById("username") as HTMLInputElement).setAttribute("style", "border: 2px solid red; background-color: rgba(255,204,203, 1);");
    } else {
      const { error } = await supabase
        .from('users')
        .insert({ username: username, high_score: score });

      if (error) {
        console.error(error);
      } else {
        navigate("/leaderboard")
      }
    }
  }

  const { score } = useScoreStore()
  if (score === 0) {
    return (
      <div className={active ? "active-modal" : "not-active-modal"}>
        <div className="modal-main">
          <h2 className="font-bold text-[30px] m700:text-[25px]">You scored</h2>

          <h3 className="font-bold text-[35px] m700:text-[28px] m700:my-4 my-5">{score}</h3>

          <div className="flex flex-col w-max">
            <Button
              classNames="button px-8 py-2.5 mb-4 text-[18px] m700:text-base"
              onClick={() => navigate(0)}
              text="Try Again"
            />

            <Button
              classNames="button px-8 py-2.5 text-[18px] m700:text-base"
              onClick={() => navigate("/leaderboard")}
              text="Leaderboard"
            />
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className={active ? "active-modal" : "not-active-modal"}>
        <div className="modal-main">
          <h2 className="font-bold text-[30px] m700:text-[25px]">You scored</h2>

          <h3 className="font-bold text-[35px] m700:text-[28px] m700:my-4 my-5">{score}</h3>

          <div className="flex flex-col w-max">
            <input id="username" className="input mb-4" placeholder="Enter your name" />

            <Button
              classNames="button px-8 py-2.5 mb-4 text-[18px] m700:text-base"
              onClick={() => saveHighScore(score)}
              text="Save to Leaderboard"
            />

            <Button
              classNames="button px-8 py-2.5 text-[18px] m700:text-base"
              onClick={() => navigate("/leaderboard")}
              text="Discard Score"
            />
          </div>
        </div>
      </div>
    )
  }
}
