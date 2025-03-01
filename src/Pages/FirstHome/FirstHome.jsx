import "./FirstHomeStyle.css"

import FirstHomeImg from "../../Assets/firstHomeImg.jpg"

import { Link } from "react-router-dom"


const FirstHome = () => {
    return (
        <div className="firstHome">
            <div className="content">
                <h1>Let's Do It</h1>
                <p>The hard days are the best because that’s when champions are made, so if you push through, you can push through anything.</p>
                <p>Push harder than yesterday if you want a different tomorrow.</p>
                <div className="firstHomeImg-resp">
                    <img src={FirstHomeImg} alt="" />
                </div>
                <div className="firstHomeBtns">
                    <Link to="/home">
                        <button> Save your Exercise</button>
                    </Link>
                    <Link to="/collections">
                        <button>Your Collections</button>
                    </Link>
                </div>
            </div>
            <div className="firstHomeImg">
                <img src={FirstHomeImg} alt="" />
            </div>

        </div>
    )
}

export default FirstHome