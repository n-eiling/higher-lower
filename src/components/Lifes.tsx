import { VscHeartFilled, VscHeart } from "react-icons/vsc"

type Props = {
    lifes: number,
}

export default function Lifes({ lifes }: Props) {
    return (
        <div
            className="vs-lifes-wrapper"
        >
            <div
                className={lifes >= 1 ? "vs-component-heart-wrapper top-0" : "vs-component-heart-wrapper-hidden"}
            >
                <VscHeartFilled className="vs-component-heartfilled" />
            </div>
            <div
                className={lifes < 1 ? "vs-component-heart-wrapper top-0" : "vs-component-heart-wrapper-hidden"}
            >
                <VscHeart className="vs-component-heart" />
            </div>
            <div
                className={lifes >= 2 ? "vs-component-heart-wrapper top-0" : "vs-component-heart-wrapper-hidden"}
            >
                <VscHeartFilled className="vs-component-heartfilled" />
            </div>
            <div
                className={lifes < 2 ? "vs-component-heart-wrapper top-0" : "vs-component-heart-wrapper-hidden"}
            >
                <VscHeart className="vs-component-heart" />
            </div>
            <div
                className={lifes >= 3 ? "vs-component-heart-wrapper top-0" : "vs-component-heart-wrapper-hidden"}
            >
                <VscHeartFilled className="vs-component-heartfilled" />
            </div>
            <div
                className={lifes < 3 ? "vs-component-heart-wrapper top-0" : "vs-component-heart-wrapper-hidden"}
            >
                <VscHeart className="vs-component-heart" />
            </div>

        </div>
    )
}