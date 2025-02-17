import { useEffect, useState } from "react"
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import useUserStore from "../stores/userStore";

type LeaderboardType = {
  id: number,
  username: string,
  createdat: Date,
  high_score: number
}


export default function LeaderboardMain() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardType[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .gt('high_score', 0)
        .order('high_score', { ascending: false })
        .order('createdat', { ascending: true });

        // we are selecting only highScores greater than 0

      if (error) {
        console.error(error);
      } else {
        setLeaderboard(data);
      }
    };

    fetchLeaderboard();
  }, []);


  return (
    <main className="main">
      <div className="w-[600px] mx-5 m500:mx-0">
        <h1 className="leaderboard-heading">
          Leaderboard
        </h1>

        <div className="w-full mt-[50px] border border-white/30 rounded-xl">
          <table className="w-full text-white rounded-xl m600:text-sm">
            <thead>
              <tr className="bg-primaryBlack hover:bg-secondaryBlack transition">
                <td className="w-[50px] m550:w-10 py-2">#</td>
                <td className="text-left pl-4 py-2">Username</td>
                <td className="w-[200px] hidden leaderboardDesktop:table-cell py-2">Time</td>
                <td className="w-[120px] hidden leaderboardDesktop:table-cell py-2">High score</td>
                <td className="w-[50px] hidden leaderboardMobile:table-cell py-2">HS</td>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((player: LeaderboardType, index) => {
                return(
                  <tr className="bg-primaryBlack hover:bg-secondaryBlack transition" key={index}>
                    <td className="py-2">{index + 1}</td>
                    <td className="username-table-cell">{player.username}</td>
                    <td className="py-2">{new Date(player.createdat).toLocaleString("de-DE")}</td>
                    <td className="py-2">{player.high_score}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <Button
          onClick={() => navigate("/app")}
          text="Play"
          classNames="home-cta-button"
        />
      </div>
    </main>
  )
}
