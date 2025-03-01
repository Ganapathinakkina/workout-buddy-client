import GymLogo from "../../Assets/workout-buddy-logo.png"
import { Link } from "react-router-dom"
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

import "./FooterStyle.css"

const Footer = () => {
    return (
        <div className="footer">
            <div className="footerInfo">
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
                <div className="footerImg">
                    <FaYoutube className="footerIcons" />
                    <FaFacebookF className="footerIcons" />
                    <FaInstagram className="footerIcons" />
                    <FaXTwitter className="footerIcons" />
                </div>
            </div>
            <div className="footerRights">
                <p>© 2025 All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer