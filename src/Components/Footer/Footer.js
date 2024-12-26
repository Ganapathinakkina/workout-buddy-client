import GymLogo from "../../Assets/workout-buddy-logo.png"
import { Link } from "react-router-dom"

import "./FooterStyle.css"

const Footer = () => {
    return (
        <div className="footer">
            <div className="footerLogo">
                <div className="logo">
                    <img src={GymLogo} alt="" />
                    <Link to="/">Workout Buddy</Link>
                </div>
            </div>
            <div className="footerContent">
                <div className="contentTitle">
                    <h2>Join With Us</h2>
                </div>
                <div className="content">
                    <div className="providings">
                        <p>Workouts</p>
                        <p>Yoga</p>
                        <p>Excercises</p>
                        
                    </div>
                    <div className="providings">
                        <p>Diet Plans</p>
                        <p>Tools</p>
                        <p>Workout Guides</p>
                    </div>
                </div>

            </div>
            <div className="footerBtn">
                <Link to="/signup">
                    <button>Let's Start</button>
                </Link>
            </div>
        </div>
    )
}

export default Footer