import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./Tickets.css"

export const TicketList = ({ searchTermState }) => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => ticket.description.toLowerCase().includes(searchTermState))
            setFiltered(searchedTickets)
        },
        [ searchTermState ]
    )

    useEffect(
        () => {
            if (emergency) {
               const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
               setFiltered(emergencyTickets)

            } else {
                setFiltered(tickets)
            }
        },
        [emergency]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets`)
            .then(res => res.json())
            .then((ticketArray) => {
                setTickets(ticketArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (honeyUserObject.staff) {
                // employee
                setFiltered(tickets)
            } else {
                // customer
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [tickets]
    )
    
    useEffect(
        () => {
            if (openOnly) {
           const openTicketArray = tickets.filter(ticket => {
            return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
           })
           setFiltered(openTicketArray)
                } else {
                    const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                    setFiltered(myTickets)
                }        
            },
        [openOnly]
    )

    return <>
    {
        honeyUserObject.staff ? <>
        <button type="button" onClick={ () => setEmergency(true) }>Emergency Only</button> 
        <button type="button" onClick={ () => setEmergency(false) }>Show All</button> 
        </> 
        : <>
            <button type="button" onClick={() => navigate("/ticket/create")}>Create Ticket</button>
            <button type="button" onClick={() => updateOpenOnly(true)}>Open Tickets</button>
            <button type="button" onClick={() => updateOpenOnly(false)}>All My Tickets</button>
        </>
    }
    
    <h2>List of Tickets</h2>
        <article className="tickets">
        {
            filteredTickets.map(
                (ticket) => {
                    return <div className="ticket" key={ticket.id}> 
                    <header>
                        <Link to={`/tickets/${ticket.id}/edit`}>Ticket {ticket.id}</Link>
                    </header>
                    <section>{ticket.description}</section>
                        <footer>Emergency: {ticket.emergency ? " 🧨" : "No"}</footer>
                        </div>
                }
            )
        }

        </article>
        </>
}

