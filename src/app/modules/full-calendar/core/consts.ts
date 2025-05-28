import { ROLES } from "../../../../_metronic/helpers";

const {ADMIN, RECEPTION, USER, ACCOUNTANT} = ROLES;

const userCanViewEvents = (role: string) => {
    return [ADMIN, RECEPTION, USER, ACCOUNTANT].includes(role);
}

const userCanViewAllEvents = (role: string) => {
    return [ADMIN, RECEPTION, ACCOUNTANT].includes(role);
}

const userCanCreateEvents = (role: string) => {
    return [ADMIN, RECEPTION].includes(role);
}

const userCanUpdateEvents = (role: string) => {
    return [ADMIN, RECEPTION].includes(role);
}

const userCanDeleteEvents = (role: string) => {
    return [ADMIN].includes(role);
}

export {
    userCanViewEvents,
    userCanViewAllEvents,
    userCanCreateEvents,
    userCanUpdateEvents,
    userCanDeleteEvents
}