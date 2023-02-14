import { useState } from "react"
import { TicektSearch } from "./TicketSearch"
import { TicketList } from "./TicketList"

export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return ( 
    <>
        <TicektSearch setterFunction={setSearchTerms} />
        <TicketList searchTermState={searchTerms.toLowerCase()} />
    </>
    )
}


//think of these are objects, instead of the equals, : and the value is (setSearchTerms)