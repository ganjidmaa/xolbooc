import { ROLES } from "../../../../../../_metronic/helpers";

const {ADMIN, RECEPTION, USER, ACCOUNTANT} = ROLES;

const discountTypes = [
    {'status': 'cash', 'name': 'Бэлнээр'},
    {'status': 'percent', 'name': 'Хувиар'},
]

const userCanViewDiscounts = (role: string) => {
    return [ADMIN, RECEPTION, USER, ACCOUNTANT].includes(role);
}

const userCanCreateDiscounts = (role: string) => {
    return [ADMIN].includes(role);
}

const userCanUpdateDiscounts = (role: string) => {
    return [ADMIN].includes(role);
}

const userCanDeleteDiscounts = (role: string) => {
    return [ADMIN].includes(role);
}

export {
    discountTypes,
    userCanViewDiscounts,
    userCanCreateDiscounts,
    userCanUpdateDiscounts,
    userCanDeleteDiscounts
}