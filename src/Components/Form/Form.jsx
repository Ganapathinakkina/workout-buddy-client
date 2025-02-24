import { useContext, useState } from "react"
import axios from "axios"
import { Data } from "../../Context/WorkoutContext"
import { useAuthContext } from "../../Hooks/useAuthContext"

import "./FormStyle.css"
import { useLogout } from "../../Hooks/useLogout"
import { Link } from "react-router-dom"

const Form = () => {

  const { user } = useAuthContext();
  const { logout } = useLogout()

  const { form, setForm, getWorkouts, workouts, setWorkouts, updateForm, setUpdateForm } = useContext(Data)

  //CREATE FORM FUNCTION
  const updateFormField = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  const [isSubmitted, setIsSubmitted] = useState(false)

  const createWorkout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/workouts", form, {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      });
      setWorkouts([...workouts, response.data])
      setForm({
        title: "",
        reps: "",
        load: "",
      });

      setIsSubmitted(true); 

      setTimeout(() => {
        setIsSubmitted(false); 
      }, 2500);

      getWorkouts()
    } catch (error) {
      if (error.response?.status === 401) {
        logout();
      } else {
        console.error("API Error:", error);
      }
    }
  }

  //UPDATE FORM FUNCTION

  const [isUpdated, setIsUpdated] = useState(false);

  const handleUpdateFieldChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm({
      ...updateForm,
      [name]: value,
    })
  }

  const updateWorkout = async (e) => {
    e.preventDefault();

    const { _id, title, reps, load, isCustomWorkout } = updateForm;

    try {
      await axios.patch(`http://localhost:5000/api/workouts/${_id}`, { title, reps, load, isCustomWorkout }, {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      });

      setIsUpdated(true); 

      setTimeout(() => {
        setIsUpdated(false); 
      }, 2500);

      getWorkouts();

      setUpdateForm({
        _id: null,
        title: "",
        reps: "",
        load: "",
        isCustomWorkout: false
      })
    }
    catch (error) {
      if (error.response?.status === 401) {
        logout();
      } else {
        console.error("API Error:", error);
      }
    }
  }




  return (
    <>
      {!updateForm._id && (
        <div className="form">
          <h1>Add Exercise</h1>
          <form onSubmit={createWorkout}>

            <div className="field">
              <label htmlFor="">Workout Name: </label>
              <input type="text" name='title' value={form.title} onChange={updateFormField} />
            </div>

            <div className="field">
              <label htmlFor="">Reps: </label>
              <input type="tel" name='reps' value={form.reps} onChange={updateFormField} />
            </div>

            <div className="field">
              <label htmlFor="">Load(in KG): </label>
              <input type="tel" name='load' value={form.load} onChange={updateFormField} />
            </div>

            {/* <div >
              <h2>Image Upload & Conversion</h2> 

              <input type="file" accept="image/*" onChange={handleFileUpload} />

              {base64Image && (
                <div>
                  <h3>Base64 Image</h3>
                  <img src={base64Image} alt="Uploaded Base64" style={{ maxWidth: "200px", margin: "10px" }} />
                </div>
              )}
            </div> */}

            <div className="formSubmitBG">
              <Link to="/Collections">
                <button>Collections</button>
              </Link>

              <button>Submit</button>
            </div>

          </form>

        </div>

      )}




      {updateForm._id && (
        <div className="form">
          <h1>Edit Record</h1>
          <form>

            <div className="field">
              <label htmlFor="">Workout Name: </label>
              <input type="text" name='title' value={updateForm.title} onChange={handleUpdateFieldChange} />
            </div>

            <div className="field">
              <label htmlFor="">Reps: </label>
              <input type="tel" name='reps' value={updateForm.reps} onChange={handleUpdateFieldChange} />
            </div>

            <div className="field">
              <label htmlFor="">Load(in KG): </label>
              <input type="tel" name='load' value={updateForm.load} onChange={handleUpdateFieldChange} />
            </div>

            <button className="updateBtn" onClick={updateWorkout}>Update</button>

          </form>

        </div>
      )}


      {isSubmitted && (
        <div className={`submitMsg ${isSubmitted ? "" : "notSubmitted"}`} >
          <p>Workout Added to your Collections</p>
        </div>
      )}

      {
        isUpdated && (
          <div className={`updateMsg ${isUpdated ? "" : "notUpdated"}`}>
            <p>Workout Updated Successfully</p>
          </div>
        )
      }
    </>

  )
}

export default Form