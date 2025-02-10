import { useEffect, useContext } from "react"
import { useAuthContext } from "../../Hooks/useAuthContext";

import { Data } from "../../Context/WorkoutContext"

import "./RecordsStyle.css"
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";


const Records = () => {

  const {user} = useAuthContext()

  const { workouts, getWorkouts, deleteWorkout, toggleUpdate } = useContext(Data);


  useEffect(() => {
    if(user){
      getWorkouts()
    }
  }, [user, getWorkouts])

  return (
    <div className="records">
      {workouts && workouts.map((item) => {
        return (
          <div className='record' key={item._id}>
            <h3> {item.title}</h3>
            <p>Reps: {item.reps}</p>
            <p>Load (in KGs): {item.load}</p>
            <div className="btns">
              <button className="edit-btn" onClick={() => toggleUpdate(item)}>
                <GrEdit />
                <p>Edit</p>
              </button>{" "}
              <button className="delete-btn" onClick={() => deleteWorkout(item._id, item.isCustomWorkout)}>
                <RiDeleteBin5Line />
                <p>Delete</p>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Records