import "./EntryStyle.css"
import EntryImg from "../../Assets/EntryImg.png"

import { Link } from "react-router-dom"

import { useAuthContext } from "../../Hooks/useAuthContext"



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
                        <p>“The body achieves what the mind believes.” </p>
                        <p>Keep going until yo die.</p>
                    </div>
                    <div className="entryImg-resp">
                        <img src={EntryImg} alt="" />
                    </div>
                    <Link to={user ? "/firsthome" : "/signup"}>
                        <button>Join Us</button>
                    </Link>
                </div>
                <div className="entryImg">
                    <img src={EntryImg} alt="" />
                </div>

            </div>
            {/* <About/>
        <Contact/> */}
        </>
    )
}

export default Entry