import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useUserStore from "../stores/userStore"
import useScoreStore from "../stores/scoreStore"

const useAuthStateChange = () => {
  const navigate = useNavigate()

  const { setSignedIn, setProfilePicture, setUsername } = useUserStore()
  const { updateHighScore } = useScoreStore()

  const doesUserExists = async () => {
    const username = 'test'

    setUsername(username)


  }

  useEffect(() => {
  }, [])
}

export default useAuthStateChange
