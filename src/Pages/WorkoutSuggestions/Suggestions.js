import React, { useContext, useEffect, useState } from 'react'
import { Data } from '../../Context/WorkoutContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { useLogout } from '../../Hooks/useLogout';

import "./SuggestionStyle.css"

const Suggestions = () => {
    const { workoutSuggestions, setWorkoutSuggestions } = useContext(Data);
    const [selections, setSelections] = useState([]);
    const navigation = useNavigate();
    const { user } = useAuthContext();
    const { logout } = useLogout();

    const onSelectionHandler = (sId) => {
        setSelections((prevSelections) =>
            prevSelections.includes(sId)
                ? prevSelections.filter(id => id !== sId)
                : [...prevSelections, sId]
        );
    };

    // ---------- Debugging purpose ----------
    useEffect(() => {
        console.log("Updated List of Ids:", selections);
        workoutSuggestions.push()
    }, [selections]);


    const onSubmitHandler = async (e) => {

        e.preventDefault();
        const workoutIds = [];
        selections.map((s) => {
            workoutIds.push(s);
        })

        const payload = { workoutIds };

        if (payload.workoutIds.length === 0) {
            console.warn("No workout selected. Payload will be empty.");
            alert("Please select any one of the workout or skip the suggestions.");
        }
        else {
            // ---------- Debugging purpose ----------
            console.log("Payload:", payload);

            try {
                const response = await axios.put("http://localhost:5000/api/user/update-user-workouts", payload, {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                })

                alert("Your suggestions are added to your collections.")

                navigation("/home");
                localStorage.removeItem("suggestions")

            }
            catch (error) {
                if (error.response?.status === 401) {
                    logout();
                } else {
                    console.error("API Error:", error);
                }
            }

        }

    }
    useEffect(() => {
        const localSuggestions = JSON.parse(localStorage.getItem("suggestions"));
        setWorkoutSuggestions(localSuggestions)

    }, [])

    const onSkipHandler = () => {
        navigation("/home");
    }

    return (
        <div className='suggestion '>
            <h1>Workout Suggestions</h1>
            <form className="selectionForm" onSubmit={(e) => onSubmitHandler(e)}>
                <div className="workoutList">
                    {workoutSuggestions.map((w, index) => {

                        const { _id, title, reps, load, image_blob } = w;

                        return (
                            <div className="card" key={_id}>

                                <label htmlFor={_id} className='cardLabel'>
                                    <div className="cardImg">
                                        <img src={image_blob} alt="Workout image" />
                                    </div>
                                    <h2>{title}</h2>
                                    <p>Reps: {reps}</p>
                                    <p>Load: {load}</p>
                                </label>
                                <input
                                    className='cardInput'
                                    type="checkbox"
                                    id={_id}
                                    checked={selections.includes(_id)}
                                    onChange={() => onSelectionHandler(_id)}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className="suggestionButtons">
                    <button type='button' onClick={onSkipHandler}>Skip for now</button>
                    <button type='submit'>Submit</button>
                </div>

            </form>

        </div>
    )
}

export default Suggestions