import { ROLES } from "../../../../../../_metronic/helpers";

const {ADMIN, RECEPTION, USER, ACCOUNTANT} = ROLES;

const userCanViewMemberships = (role: string) => {
    return [ADMIN, RECEPTION, USER, ACCOUNTANT].includes(role);
}

const userCanCreateMemberships = (role: string) => {
    return [ADMIN, RECEPTION].includes(role);
}

const userCanUpdateMemberships = (role: string) => {
    return [ADMIN, RECEPTION].includes(role);
}

const userCanDeleteMemberships = (role: string) => {
    return [ADMIN, RECEPTION].includes(role);
}

export {
    userCanViewMemberships,
    userCanCreateMemberships,
    userCanUpdateMemberships,
    userCanDeleteMemberships
}