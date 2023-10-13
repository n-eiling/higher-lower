import { useState } from "react"
import IconButton from "./IconButton"
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'
import { CountUp } from "use-count-up"
import { Repository } from "../types"

export default function Card({ name, description, image, price, showButtonsProp, prevRepo, handleCardButton }: Repository) {
  const [showButtons, setShowButtons] = useState(showButtonsProp)

  const handleButtonClick = (correct: boolean) => {
    handleCardButton(correct)
    setShowButtons(false)
  }

  const pricec = (Math.round(price * 100) / 100);

  return (
    <div className="card-wrapper" style={{
      backgroundImage: `url(${image})`
    }}>
      {/* <img className="img-repo" src={avatar_url} alt={name} /> */}

      <div className="card-text">
      <h1 className="repo-name-heading">{name}</h1>
        <h2 className="repo-description">{description}</h2>

        <p className="has-word">costs</p>

      {showButtons ?
        <div>
          <div className="flex flex-col w-min mx-auto">
            <IconButton
              icon={<AiOutlineCaretUp className="w-6 h-6 ml-3 m700:w-4 m700:h-4" />}
                onClick={() => handleButtonClick((price >= prevRepo?.price))}
                text="More"
              classNames="card-button m700:mb-2"
            />

            <IconButton
              icon={<AiOutlineCaretDown className="w-6 h-6 ml-4 m700:w-4 m700:h-4" />}
                onClick={() => handleButtonClick(price <= prevRepo?.price)}
                text="Less"
              classNames="card-button m700:mb-1"
            />
          </div>

            <p className="stars-than">than {prevRepo?.name}</p>
        </div>
        :
        <div>
          <h2 className="stars-count">
            {showButtonsProp ?
              <CountUp
                isCounting={true}
                  duration={1}
                  start={pricec + pricec * 100}
                  end={pricec}
                  decimalPlaces={2}
              />
              :
                pricec.toFixed(2)
              } €
          </h2>

            <p className="stars-on-github"> </p>
        </div>
      }
      </div>
    </div>
  )
}
