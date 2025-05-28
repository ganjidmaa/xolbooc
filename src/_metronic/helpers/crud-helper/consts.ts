const QUERIES = {
  USERS_LIST: 'users-list',
  USER_DETAIL: 'user-detail',
  PROVINCES: 'provinces',
  SOUM_DISTRICTS: 'soum_districts',
  CUSTOMERS_LIST: 'customers-list',
  CUSTOMER_ID: 'customer-id',
  SERVICES_LIST: 'services-list',
  SERVICE_DETAIL: 'service-detail',
  CATEGORIES: 'categories',
  RESOURCES_LIST: 'resources-list',
  EVENT_DETAIL: 'event-detail',
  CALENDAR_MASTER_DATA: 'calendar-master-data',
  DISCOUNTS_LIST: 'discounts-list',
  COUPONS_LIST: 'coupons-list',
  COUPON_CODES_LIST: 'coupon-codes-list',
  MEMBERSHIP_TYPES_LIST: 'membership_types-list',
  MEMBERSHIPS_LIST: 'memberships-list',
  PAYMENT_DETAIL: 'payment-detail',
  SETTINGS_DETAIL: 'settings-detail',
  ONLINE_BOOKING: 'online-booking',
  BRANCH_LIST: 'branches-list',
  ACCOUNT_LIST: 'account-list',
  PAYMENT_METHOD_LIST: 'account-list',
  DETAIL_LIST: 'detail-list',
  SMS_HISTORY: 'sms-history',
  APP_OPTIONS_LIST: 'app-options',
  SHIFT_LIST: 'shift-list',
  COMMENTS_LIST: 'comments-list',
}

const STATES = {
  eventDefaultDuration: '30'
}

const CRUD_RESPONSES = {
  success_payment: 'Төлбөр амжилттай төлөгдлөө.',
  success_cancel: 'Амжилттай цуцлагдлаа.',
  success: 'Амжилттай хадгалагдлаа.',
  warning: 'Уучлаарай! Амжилтгүй боллоо. Дахин оролдоно уу.',
  error: 'Уучлаарай! Дахин оролдоно уу.',
  failed_authorization: 'Энэ үйлдлийг хийх эрхгүй байна.',
  role_limit: 'Багцад хамаарах хэрэглэгчийн эрхийн тоо дүүрсэн байна. Багцаа ахиулна уу!',
}  

const ROLES = {
  ADMIN: 'administrator',
  RECEPTION: 'reception',
  USER: 'user',
  ACCOUNTANT: 'accountant',
}

const BOOKING_STEPS = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
}

export {QUERIES, STATES, CRUD_RESPONSES, ROLES, BOOKING_STEPS}
