import { Link } from "react-router-dom"

export const Ticket = ({ ticketObject, currentUser, employees, getAllTickets }) => {


    //Find assigned employee for the current ticket
    let assignedEmployee = null
    if (ticketObject.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    } 

    //Find the employee object for the current user for claiming (POST)
    const userEmployee = employees.find(employee => employee.userId === currentUser.id)


    //BUTTON CODE:
    const buttonOrNoButton = () => {
        if (currentUser.staff) {
            return <button type="button"
            onClick={() => {
                fetch(`http://localhost:8088/employeeTickets`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        employeeId: userEmployee.id,
                        serviceTicketId: ticketObject.id
                    })
                })
                .then(res => res.json())
                .then(getAllTickets())
            }}
            >Claim</button>
        } else {
            return ""
        }
    }
    
    const canClose = () => {
        if (userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "") {
            return <button type="button" className="ticket_finish"
            onClick={closeTicket}>Finish</button>
        } else {
            return ""
        }
    }


    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button type="button" className="ticket_finish"
            onClick={() => {
                fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
                method: "DELETE"
                })
                .then(() => {
                    getAllTickets()
                })

            }}>Delete</button>
        } else {
            return ""
        }
    }

    const closeTicket = () => {
        const copy = {
            userId: ticketObject.userId,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date()
        }

        return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(res => res.json())
            .then(getAllTickets())
    }


    return <div className="ticket"> 
    <header className="ticket_header">
       {
        currentUser.staff
        ? `Ticket ${ticketObject.id}`
        : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
       }
    </header>
    <section>{ticketObject.description}</section>
        <footer className="ticket_footer">
            <section>Emergency: {ticketObject.emergency ? " 🧨" : "No"}</section>
            <hr></hr>
            <section className="ticket_assigned">{
                ticketObject.employeeTickets.length 
                ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                : buttonOrNoButton()
            }{
                canClose()    
            }{
                deleteButton()
            }
                </section>
            
        </footer>
        </div>

}