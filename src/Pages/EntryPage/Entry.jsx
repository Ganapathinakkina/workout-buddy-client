import "./EntryStyle.css"
// import GymEntryImg from "../../Assets/gymEntryPage.jpg"

import { Link } from "react-router-dom"


const Entry = () => {

    return (
        <div className='entry'>
            <div className="entryContent">
                <div className="entryContentTitle">
                    <h1>WELCOME</h1>
                    <p>to "Workout Buddy"</p>
                </div>
                <div className="content">
                    <p>“Your body can stand almost anything; it's your mind you have to convince.”
                        “The PAIN you feel today will be the STRENGTH you feel tomorrow.”</p>
                    <p>Keep going until yo die.</p>
                </div>
                <Link to="/signup">
                    <button>Join Us</button>
                </Link>
            </div>

        </div>
    )
}

export default Entry