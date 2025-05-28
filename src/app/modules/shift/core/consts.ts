import { ROLES } from "../../../../_metronic/helpers";

const {ADMIN, RECEPTION, USER, ACCOUNTANT} = ROLES;

const userCanViewUsers = (role: string) => {
    return [ADMIN, RECEPTION, USER, ACCOUNTANT].includes(role);
}

const userCanCreateUsers = (role: string) => {
    return [ADMIN].includes(role);
}

const userCanUpdateUsers = (role: string) => {
    return [ADMIN].includes(role);
}

const userCanDeleteUsers = (role: string) => {
    return [ADMIN].includes(role);
}

export {
    userCanViewUsers,
    userCanCreateUsers,
    userCanUpdateUsers,
    userCanDeleteUsers
}