import { useEffect, useState } from "react"




export const EmployeeForm = () => {
    // TODO: Provide initial state for profile
    const [feedback, setFeedback] = useState("")
    const [profile, updateProfile] = useState({
        specialty: "",
        rate: 0,
        userId: 0
    })

    const localHoneyUser = localStorage.getItem("honey_user")
    const localHoneyUserObj = JSON.parse(localHoneyUser)
    // TODO: Get employee profile info from API and update state

    useEffect(() => {
        fetch(`http://localhost:8088/employees?userId=${localHoneyUserObj.id}`)
            .then(res => res.json())
            .then((data) => {
                const employeeObj = data[0]
                updateProfile(employeeObj)
            })
    }, [])


    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    const handleSaveButtonClick = () => {
       // event.preventDefault()

       return fetch(`http://localhost:8088/employees/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
       })
       .then(res => res.json())
       .then(() => {
        setFeedback("Employee profile successfully saved")
    })
    }

    return ( <>
<div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
    {feedback}
</div>
        <form className="profile">
            <h2 className="profile__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.specialty}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.specialty = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Hourly rate:</label>
                    <input type="number"
                        className="form-control"
                        value={profile.rate}
                        onChange={
                            (evt) => {
                                const num = {...profile}
                                num.rate = parseFloat(evt.target.value, 2)
                                updateProfile(num)
                            }
                        } />
                </div>
            </fieldset>
            <button type="button"
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </>
    )
}