import { useContext } from "react"
import axios from "axios"
import { Data } from "../../Context/WorkoutContext"
import { useAuthContext } from "../../Hooks/useAuthContext"

import "./FormStyle.css"

const Form = () => {

  const {user} = useAuthContext(); 

  const { form, setForm, getWorkouts, workouts, setWorkouts, updateForm, setUpdateForm } = useContext(Data)

  //CREATE FORM FUNCTION
  const updateFormField = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  const createWorkout = async (e) => {
    e.preventDefault();
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
    getWorkouts()
  }

  //UPDATE FORM FUNCTION

  const handleUpdateFieldChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm({
      ...updateForm,
      [name]: value,
    })
  }

  const updateWorkout = async (e) => {
    e.preventDefault();

    const { _id, title, reps, load } = updateForm;

    await axios.patch(`http://localhost:5000/api/workouts/${_id}`, { title, reps, load }, {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    });

    getWorkouts();

    setUpdateForm({
      _id: null,
      title: "",
      reps: "",
      load: "",
    })

  }



  return (
    <>
      {!updateForm._id && (
        <div className="form">
          <h1>Add Exercise</h1>
          <form onSubmit={createWorkout}>

            <div className="field">
              <label htmlFor="">Title: </label>
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

            <button>Submit</button>

          </form>

        </div>
      )}


      {updateForm._id && (
        <div className="form">
          <h1>Edit Record</h1>
          <form>

            <div className="field">
              <label htmlFor="">Title: </label>
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

            <button onClick={updateWorkout}>Update</button>

          </form>

        </div>
      )}
    </>

  )
}

export default Form