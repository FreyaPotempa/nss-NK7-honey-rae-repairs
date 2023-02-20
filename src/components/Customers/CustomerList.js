import { useEffect, useState } from "react"
import { Customer } from "./Customer"
import "./Customers.css"
import { getAllCustomers } from "../ApiManager"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
           getAllCustomers()
           .then(
            (custies) => {
                setCustomers(custies)
            }
           )
        },
        []
    )

    return (
    <article className="customers">
    {
        customers.map(customer => <Customer key={`customer--${customer.id}`} 
            id={customer.id}
            fullName={customer.fullName} 
            email={customer.email} />)
    }
    </article>
    )

}
