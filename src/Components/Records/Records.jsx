import { useEffect, useContext } from "react"
import { useAuthContext } from "../../Hooks/useAuthContext";

import { Data } from "../../Context/WorkoutContext"

import "./RecordsStyle.css"
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";


const Records = () => {

  const { user } = useAuthContext()
  const navigation = useNavigate();

  const { workouts, getWorkouts, deleteWorkout, toggleUpdate } = useContext(Data);


  useEffect(() => {
    if (user) {
      getWorkouts()
    }
  }, [user, getWorkouts])

  const handleUpdate = (item) => {
    toggleUpdate(item);
    navigation("/home")
  }

  return (

    <div className="recordsPage">
      <h1>Your Collections</h1>
      <div className="records">
        {workouts && workouts.map((item) => {
          return (
            <div className='record' key={item._id}>
              <h3> {item.title}</h3>
              <div className="recordContent">
                <div className="content">
                  <p>Reps: {item.reps}</p>
                  <p>Load <span>(in KGs)</span>:  {item.load}</p>
                  <div className="btns">
                    {
                      item.isCustomWorkout &&
                      <button className="edit-btn" onClick={() => handleUpdate(item)}>
                        <GrEdit />
                        <p>Edit</p>
                      </button>
                    }
                    <button className="delete-btn" onClick={() => deleteWorkout(item._id, item.isCustomWorkout)}>
                      <RiDeleteBin5Line />
                      <p>Delete</p>
                    </button>
                  </div>
                </div>
                <div className="recordImg">
                  <img src={item.image_blob} alt="" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="collectionBtn">
        {/* <Link to="/suggestions">
          <button>My Suggestions</button>
        </Link> */}
        <Link to="/home">
          <button>Create Workout</button>
        </Link>
      </div>
    </div>

  )
}

export default Records