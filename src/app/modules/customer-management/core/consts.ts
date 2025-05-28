import { ROLES } from "../../../../_metronic/helpers"

const {ADMIN, RECEPTION, USER, ACCOUNTANT} = ROLES;

const userCanViewCustomers = (role: string) => {
    return [ADMIN, RECEPTION, USER, ACCOUNTANT].includes(role);
}

const userCanCreateCustomers = (role: string) => {
    return [ADMIN, RECEPTION].includes(role);
}

const userCanUpdateCustomers = (role: string) => {
    return [ADMIN, RECEPTION].includes(role);
}

const userCanDeleteCustomers = (role: string) => {
    return [ADMIN].includes(role);
}

export {
    userCanViewCustomers,
    userCanCreateCustomers,
    userCanUpdateCustomers,
    userCanDeleteCustomers
}