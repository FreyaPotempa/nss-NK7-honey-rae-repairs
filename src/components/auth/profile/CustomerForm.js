import { useEffect, useState } from "react"

    export const CustomerForm = () => {
        // TODO: Provide initial state for profile
        const [feedback, setFeedback] = useState("")
        const [profile, updateProfile] = useState({
            address: "",
            phoneNumber: 0,
            userId: 0
        })
    
        const localHoneyUser = localStorage.getItem("honey_user")
        const localHoneyUserObj = JSON.parse(localHoneyUser)
        // TODO: Get employee profile info from API and update state
    
        useEffect(() => {
            fetch(`http://localhost:8088/customers?userId=${localHoneyUserObj.id}`)
                .then(res => res.json())
                .then((data) => {
                    const customerObj = data[0]
                    updateProfile(customerObj)
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
    
           return fetch(`http://localhost:8088/customers/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
           })
           .then(res => res.json())
           .then(() => {
            setFeedback("Customer profile successfully saved")
        })
        }
    
        return ( <>
    <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
        {feedback}
    </div>
            <form className="profile">
                <h2 className="profile__title">Edit Profile</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={profile.address}
                            onChange={
                                (evt) => {
                                    const copy = {...profile}
                                    copy.address = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input type="number"
                            className="form-control"
                            value={profile.phoneNumber}
                            onChange={
                                (evt) => {
                                    const num = {...profile}
                                    num.phoneNumber = evt.target.value
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