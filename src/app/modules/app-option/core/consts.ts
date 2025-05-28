import { ROLES } from "../../../../_metronic/helpers";

const {ADMIN, RECEPTION, USER, ACCOUNTANT} = ROLES;

const userCanViewServices = (role: string) => {
    return [ADMIN, RECEPTION, USER, ACCOUNTANT].includes(role);
}

const userCanCreateServices = (role: string) => {
    return [ADMIN, RECEPTION].includes(role);
}

const userCanUpdateServices = (role: string) => {
    return [ADMIN, RECEPTION].includes(role);
}

const userCanDeleteServices = (role: string) => {
    return [ADMIN].includes(role);
}

export {
    userCanViewServices,
    userCanCreateServices,
    userCanUpdateServices,
    userCanDeleteServices
}