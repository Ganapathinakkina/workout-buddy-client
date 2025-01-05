import React from 'react'

const UserInputs = () => {
    return (
        <div className='userInputs'>
            <div className="formTitle">
                <h1>Fill This Form</h1>
            </div>
            <form >
                <div className="field">
                    <label>Height(in feet):</label>
                    <input type="number" />
                </div>
                <div className="field">
                    <label>Weight(in KGs):</label>
                    <input type="number" />
                </div>
                <div className="field">
                    <label>Age(in Years):</label>
                    <input type="number" />
                </div>
                <div className="field">
                    <label>Gender:</label>  
                    <input type="text" />
                </div>
                <div className="field"> 
                    <label>Workout Level:</label>
                    <input type="text" />
                </div>
            </form>
            <img src="https://drive.google.com/drive/u/0/folders/11PIDs79CAAhsQ1ZTZR_Q7RBu1z2SuwTi" width={"200px"} alt="" />
        </div>
    )
}

export default UserInputs