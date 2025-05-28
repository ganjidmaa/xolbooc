import { ROLES } from "../../../../../../_metronic/helpers";

const {ADMIN, RECEPTION, USER, ACCOUNTANT} = ROLES;

const userCanViewMembershipTypes = (role: string) => {
    return [ADMIN, RECEPTION, USER, ACCOUNTANT].includes(role);
}

const userCanCreateMembershipTypes = (role: string) => {
    return [ADMIN].includes(role);
}

const userCanUpdateMembershipTypes = (role: string) => {
    return [ADMIN].includes(role);
}

const userCanDeleteMembershipTypes = (role: string) => {
    return [ADMIN].includes(role);
}

export {
    userCanViewMembershipTypes,
    userCanCreateMembershipTypes,
    userCanUpdateMembershipTypes,
    userCanDeleteMembershipTypes
}