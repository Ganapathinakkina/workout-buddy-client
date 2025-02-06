import { useContext, useState } from "react"
import "./UserInputStyle.css"
import axios from "axios"
import { useAuthContext } from "../../Hooks/useAuthContext"
import { Data } from "../../Context/WorkoutContext"
import { useNavigate } from "react-router-dom"


const UserInputs = () => {

    const { user } = useAuthContext();
    const navigation = useNavigate();

    const { workoutSuggestions, setWorkoutSuggestions } = useContext(Data);

    const [userInputData, setUserInputData] = useState({
        height: "",
        weight: "",
        age: 0,
        gender: "",
        level: ""
    })

    const onChange = (e) => {
        const { name, value } = e.target;
        setUserInputData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("data" + JSON.stringify(userInputData));
        const response = await axios.post("http://localhost:5000/api/user/userinputs", userInputData, {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })

        await setWorkoutSuggestions(response.data);
        console.log(workoutSuggestions);
        navigation("/suggestions");
    }

    return (
        <div className="userInputs">
            <div className="userFillForm">
                <div className="formTitle">
                    <h1>Fill This Form</h1>
                </div>
                <form className="userForm" onSubmit={(e) => { handleSubmit(e) }}>
                    <div className="field">
                        <label className="fieldName">Height <span>(in feet)</span>:</label>

                        <input type="number" name="height" value={userInputData.height} onChange={(e) => { onChange(e) }} />
                    </div>
                    <div className="field">
                        <label className="fieldName">Weight <span>(in KGs)</span>:</label>

                        <input type="number" name="weight" value={userInputData.weight} onChange={(e) => { onChange(e) }} />
                    </div>
                    <div className="field">
                        <label className="fieldName">Age <span>(in Years)</span>:</label>

                        <input type="number" name="age" value={userInputData.age} onChange={(e) => { onChange(e) }} />
                    </div>
                    <div className="radioFields">
                        <label className="fieldName">Gender:</label>
                        <div className="radioBtn">
                            <label>
                                <input type="radio" name="gender" value="male" onChange={(e) => { onChange(e) }} />
                                Male
                            </label>
                            <label>
                                <input type="radio" name="gender" value="female" onChange={(e) => { onChange(e) }} />
                                Female
                            </label>
                        </div>
                    </div>
                    <div className="radioFields">
                        <label className="fieldName">Level:</label>
                        <div className="radioBtn">
                            <label>
                                <input type="radio" name="level" value="low" onChange={(e) => { onChange(e) }} />
                                Low
                            </label>
                            <label>
                                <input type="radio" name="level" value="medium" onChange={(e) => { onChange(e) }} />
                                Medium
                            </label>
                            <label>
                                <input type="radio" name="level" value="hard" onChange={(e) => { onChange(e) }} />
                                Hard
                            </label>
                        </div>
                    </div>
                    <div className="submitBtn">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserInputs