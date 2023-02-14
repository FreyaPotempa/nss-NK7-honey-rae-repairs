import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"


export const NavBar = () => {
	
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    if (honeyUserObject.staff) {
        return <EmployeeNav />
    }
    else {
        return <CustomerNav />
    }
    
}


