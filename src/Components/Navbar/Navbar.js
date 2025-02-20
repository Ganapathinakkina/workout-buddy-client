import "./NavbarStyle.css"
import { Link } from "react-router-dom"
import { useLogout } from "../../Hooks/useLogout"
import { useAuthContext } from "../../Hooks/useAuthContext"

import GymLogo from "../../Assets/workout-buddy-logo.png"


const Navbar = () => {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }
  return (
    <nav>
      <div className="logo">
        <img src={GymLogo} alt="" />
        <Link to="/">Workout Buddy</Link>
      </div>

      {user && (
        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Home</Link>
            <Link>About</Link>
            <Link to="/home">Add Workouts</Link>
            <Link to="/collections">Your Workouts</Link>
            <Link to="/userinputs">Reset Suggestions</Link>
            <Link to="">Contact</Link>
          </div>
          <div className="logout">
            {/* <span>{user.email}</span> */}
            <button onClick={handleClick}>Logout</button>
          </div>
        </div>
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