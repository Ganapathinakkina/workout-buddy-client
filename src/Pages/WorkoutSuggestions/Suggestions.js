import React, { useContext, useEffect, useState } from 'react'
import { Data } from '../../Context/WorkoutContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../Hooks/useAuthContext';

const Suggestions = () => {
    const { workoutSuggestions } = useContext(Data);
    const [selections, setSelections] = useState([]);
    const navigation = useNavigate();
    const { user } = useAuthContext();

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


            const response = await axios.put("http://localhost:5000/api/user/update-user-workouts", payload, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })

            alert("Your suggestions are added to your collections.");

            navigation("/home");
        }

    }

    const onSkipHandler = () => {
        navigation("/home");
    }

    return (
        <>
            <h1>Workout Suggestions</h1>
            <form className="selectionForm" onSubmit={(e) => onSubmitHandler(e)}>
                <div className="workoutList">
                    {workoutSuggestions.map((w, index) => {

                        const { _id, title, reps, load, image_blob } = w;

                        return (
                            <div className="card" key={_id}>
                                <input
                                    type="checkbox"
                                    id={_id}
                                    checked={selections.includes(_id)}
                                    onChange={() => onSelectionHandler(_id)}
                                />
                                <label htmlFor={_id}>
                                    <img src={image_blob} alt="Workout image" />
                                    <h2>{title}</h2>
                                    <p>{reps}</p>
                                    <p>{load}</p>
                                </label>
                            </div>
                        )
                    })}
                </div>
                <button type='submit'>Submit</button>
                <button type='button' onClick={onSkipHandler}>Skip for now</button>
            </form>

        </>
    )
}

export default Suggestions