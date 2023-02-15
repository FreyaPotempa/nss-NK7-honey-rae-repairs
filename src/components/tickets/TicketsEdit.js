import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const TicketEdit = () => {
   const {ticketId} = useParams()
   const [feedback, setFeedback] = useState("")
    const [ticket, updateTicket] = useState({
        description: "",
        emergency: false
    })
   
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(() => {
        fetch(`http://localhost:8088/serviceTickets?id=${ticketId}`)
        .then(res => res.json())
        .then((data) => {
            const ticketObj = data[0]
            updateTicket(ticketObj)
        })
    }, [])

    useEffect(() => {
        if (feedback !== "") {
            setTimeout(() => setFeedback(""), 3000)
        }
    })

    const handleSaveButtonClick = () => {

        return fetch(`http://localhost:8088/serviceTickets/${ticketId}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
        .then(res => res.json())
        .then(() => {
            setFeedback("Ticket updated successfully")
        })



    }

    return (<>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
    {feedback}
</div>
        <form className="ticketEdit">
            <h2 className="ticketEdit_title">Edit Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={ticket.description}
                        onChange={
                            (e) => {
                                const copy = {...ticket}
                                copy.description = e.target.value
                                updateTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="emergency">Emergency:</label>
                    <input type="checkbox"
                    value={ticket.emergency}
                    onChange={
                        (e) => {
                            const check = {...ticket}
                            check.emergency = e.target.checked
                            updateTicket(check)
                        }
                    } />
                </div>
            </fieldset>
            <button type="button"
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">Update Ticket</button>
        </form>
        </>
    )

}