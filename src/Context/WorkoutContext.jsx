import { createContext, useCallback, useState } from "react"
import axios from "axios"
import {useAuthContext} from "../Hooks/useAuthContext"


export const Data = createContext()



const WorkoutContext = ({ children }) => {
  const {user} = useAuthContext()
  

  //GET REQUEST STATE
  const [workouts, setWorkouts] = useState(null)

  const getWorkouts = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setWorkouts(response.data);
    } catch (err) {
      console.error("Failed to fetch workouts:", err);
    }
  }, [user]); // Memoized function depends only on 'user'


  //POST REQUEST STATE
  const [form, setForm] = useState(
   { title: "",
    reps: "",
    load: "",}
  )


  //DELETE REQUEST FUNCTION
  const deleteWorkout = async (_id) => {
    await axios.delete(`http://localhost:5000/api/workouts/${_id}`, {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    });
    getWorkouts()
  }

  //UPDATE REQUEST STATE
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    reps: "",
    load: "",
  })

  const toggleUpdate = (item) => {
    setUpdateForm({
      _id: item._id,
      title: item.title,
      reps: item.reps,
      load: item.load,
    })
  }


  const [workoutSuggestions, setWorkoutSuggestions]=useState([]);


  return (
    <>
      <Data.Provider value={{ workouts, setWorkouts, getWorkouts, form, setForm,
                             deleteWorkout, updateForm, setUpdateForm, toggleUpdate,
                             workoutSuggestions, setWorkoutSuggestions }}>
        {children}
      </Data.Provider>
    </>
  )
}


export default WorkoutContext