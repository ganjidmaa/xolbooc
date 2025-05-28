import { ROLES } from "../../../../_metronic/helpers";

const {ADMIN, RECEPTION, USER, ACCOUNTANT} = ROLES;

const userCanViewResources = (role: string) => {
    return [ADMIN, RECEPTION, USER, ACCOUNTANT].includes(role);
}

const userCanCreateResources = (role: string) => {
    return [ADMIN, RECEPTION].includes(role);
}

const userCanUpdateResources = (role: string) => {
    return [ADMIN, RECEPTION].includes(role);
}

const userCanDeleteResources = (role: string) => {
    return [ADMIN].includes(role);
}

export {
    userCanViewResources,
    userCanCreateResources,
    userCanUpdateResources,
    userCanDeleteResources
}