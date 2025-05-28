import { ROLES } from "../../../../_metronic/helpers";

const {ADMIN, RECEPTION, USER, ACCOUNTANT} = ROLES;

const userCanViewBranches = (role: string) => {
    return [ADMIN, RECEPTION, USER, ACCOUNTANT].includes(role);
}

const userCanCreateBranches = (role: string) => {
    return [ADMIN].includes(role);
}

const userCanUpdateBranches = (role: string) => {
    return [ADMIN].includes(role);
}

const userCanDeleteBranches = (role: string) => {
    return [ADMIN].includes(role);
}

export {
    userCanViewBranches,
    userCanCreateBranches,
    userCanUpdateBranches,
    userCanDeleteBranches
}