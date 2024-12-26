import "./FirstHomeStyle.css"

import { Link } from "react-router-dom"


const FirstHome = () => {
    return (
        <div className="firstHome">
            <div className="content">
                <h1>Let's Do It</h1>
                <p>The body achieves what the mind believes, believe your self and achieve your goals.</p>
                <p>Push harder than yesterday if you want a different tomorrow.</p>
                <Link to="/home">
                    <button> Save your Exercise</button>
                </Link>
            </div>

        </div>
    )
}

export default FirstHome