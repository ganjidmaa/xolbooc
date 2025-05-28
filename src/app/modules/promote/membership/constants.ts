export const MEMBERSHIP_ROUTES = {
  TYPE_LIST: '/promote/membership/type_list',
  MEMBER_LIST: '/promote/membership/member/list',
  BASE: '/promote/membership',
} as const

export const MEMBERSHIP_PATHS = {
  TYPE_LIST: 'type_list',
  MEMBER_LIST: 'member/*',
} as const
