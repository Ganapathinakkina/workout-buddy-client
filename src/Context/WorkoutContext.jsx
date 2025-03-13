import { createContext, useCallback, useState } from "react"
import axios from "axios"
import { useAuthContext } from "../Hooks/useAuthContext"
import { useLogout } from "../Hooks/useLogout"


export const Data = createContext()




const WorkoutContext = ({ children }) => {
  const { user } = useAuthContext()
  const { logout } = useLogout()


  //GET REQUEST STATE
  const [workouts, setWorkouts] = useState(null)

  const getWorkouts = useCallback(async () => {

    try {
      const response = await axios.get("https://v0-workout-buddy-server.vercel.app/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setWorkouts(response.data);
    } catch (error) {
      console.error("Failed to fetch workouts:", error);

      if (error.response?.status === 401) {
        logout();
      } else {
        console.error("API Error:", error);
      }
    }
  }, [user]); // Memoized function depends only on 'user'


  //POST REQUEST STATE
  const [form, setForm] = useState(
    {
      title: "",
      reps: "",
      load: "",
      isCustomWorkout: true,
    }
  )


  //UPDATE REQUEST STATE
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    reps: "",
    load: "",
    isCustomWorkout: false
  })

  const toggleUpdate = (item) => {
    setUpdateForm({
      _id: item._id,
      title: item.title,
      reps: item.reps,
      load: item.load,
      isCustomWorkout: item.isCustomWorkout,
    })
  }



  //DELETE REQUEST FUNCTION
  const deleteWorkout = async (_id, isCustomWorkout) => {
    const payload = { workoutId: _id, isCustomWorkout: isCustomWorkout };
    try {
      await axios.delete(`https://v0-workout-buddy-server.vercel.app/api/workouts`, {
        data: payload,
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      });
      getWorkouts()
    }
    catch (error) {
      if (error.response?.status === 401) {
        logout();
      } else {
        console.error("API Error:", error);
      }
    }
  }


  const [workoutSuggestions, setWorkoutSuggestions] = useState([]);


  return (
    <>
      <Data.Provider value={{
        workouts, setWorkouts, getWorkouts, form, setForm,
        deleteWorkout, updateForm, setUpdateForm, toggleUpdate,
        workoutSuggestions, setWorkoutSuggestions
      }}>
        {children}
      </Data.Provider>
    </>
  )
}


export default WorkoutContext