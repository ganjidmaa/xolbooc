import { ROLES } from "../../../../../_metronic/helpers";

const {ADMIN, RECEPTION, USER, ACCOUNTANT} = ROLES;


const userCanViewComments = (role: string) => {
    return [ADMIN, RECEPTION, USER, ACCOUNTANT].includes(role);
}

const userCanCreateComments = (role: string) => {
    return [ADMIN].includes(role);
}

const userCanUpdateComments = (role: string) => {
    return [ADMIN].includes(role);
}

const userCanDeleteComments = (role: string) => {
    return [ADMIN].includes(role);
}

export {
    userCanViewComments,
    userCanCreateComments,
    userCanUpdateComments,
    userCanDeleteComments
}