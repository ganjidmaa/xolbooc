import { ROLES } from "../../../../../../_metronic/helpers";

const {ADMIN, RECEPTION, USER, ACCOUNTANT} = ROLES;

const userCanViewCoupons = (role: string) => {
    return [ADMIN, RECEPTION, USER, ACCOUNTANT].includes(role);
}

const userCanCreateCoupons = (role: string) => {
    return [ADMIN].includes(role);
}

const userCanUpdateCoupons = (role: string) => {
    return [ADMIN].includes(role);
}

const userCanDeleteCoupons = (role: string) => {
    return [ADMIN].includes(role);
}

export {
    userCanViewCoupons,
    userCanCreateCoupons,
    userCanUpdateCoupons,
    userCanDeleteCoupons
}