import "./EntryStyle.css"
// import GymEntryImg from "../../Assets/gymEntryPage.jpg"
import EntryImg from "../../Assets/EntryImg.png"

import { Link } from "react-router-dom"
import FirstHome from "../FirstHome/FirstHome"
import Signup from "../Signup/Signup"
import { useAuthContext } from "../../Hooks/useAuthContext"
import About from "../../Components/About/About"


const Entry = () => {
    const { user } = useAuthContext()

    return (
<>
<div className='entry'>
            <div className="entryContent">
                <div className="entryContentTitle">
                    <h1>WELCOME</h1>
                    <p>To "Workout Buddy"</p>
                </div>
                <div className="content">
                    <p>“Your body can stand almost anything; it's your mind you have to convince.”
                        “The PAIN you feel today will be the STRENGTH you feel tomorrow.”</p>
                    <p>Keep going until yo die.</p>
                </div>
                <Link to={user ? "/firsthome" : "/signup"}>
                    <button>Join Us</button>
                </Link>
            </div>
            <div className="entryImg">
                <img src={EntryImg} alt="" />
            </div>

        </div>
        <About/>
</>
    )
}

export default Entry