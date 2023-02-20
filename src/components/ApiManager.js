

export const getAllCustomers = () => {
    return fetch(`http://localhost:8088/users?isStaff=false`)
    .then(res => res.json())
}

export const getAllTickets = () => {
    fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
    .then(res => res.json())
}

export const getEmployeeUsers = () => {
    fetch(`http://localhost:8088/employees?_expand=user`)
            .then(res => res.json())
}