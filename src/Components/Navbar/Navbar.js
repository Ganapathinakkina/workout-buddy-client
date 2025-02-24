import "./NavbarStyle.css"
import { Link } from "react-router-dom"
import { useLogout } from "../../Hooks/useLogout"
import { useAuthContext } from "../../Hooks/useAuthContext"

import GymLogo from "../../Assets/workout-buddy-logo.png"
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useState } from "react"


const Navbar = () => {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }

  const [menuClick, setMenuClick] = useState(false);

  const menuHandleClick = () => {
    setMenuClick(!menuClick)
  }

  return (
    <nav>
      <div className="logo">
        <img src={GymLogo} alt="" />
        <Link to="/">Workout Buddy</Link>
      </div>

      {user && (

        <>
          <div className={menuClick ? "navLinks active" : "navLinks"}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/home">Add Workouts</Link>
            <Link to="/collections">Your Workouts</Link>
            <Link to="/userinputs">Reset Suggestions</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="logout">
            {/* <span>{user.email}</span> */}
            <button onClick={handleClick}>Logout</button>
          </div>
          <div className="hamburger" onClick={menuHandleClick}>
            {
              menuClick ? (<FaTimes  style={{ color: "white" }} size={22} />) :
                (<FaBars style={{ color: "white" }} size={22} />)
            }

          </div>
        </>

      )}


      {!user && (
        <div className="auth">
          <button>
            <Link to="/signup">SignUp</Link>
          </button>
          <button>
            <Link to="/login">Login</Link>
          </button>
        </div>
      )}


    </nav>
  )
}

export default Navbar