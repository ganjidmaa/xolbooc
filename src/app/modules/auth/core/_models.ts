import { ID } from "../../../../_metronic/helpers"
import { Settings } from "../../settings/core/_models"

export interface AuthModel {
  api_token: string
  refreshToken?: string
}

export interface UserAddressModel {
  addressLine: string
  city: string
  state: string
  postCode: string
}

export interface UserCommunicationModel {
  email: boolean
  sms: boolean
  phone: boolean
}

export interface UserEmailSettingsModel {
  emailNotification?: boolean
  sendCopyToPersonalEmail?: boolean
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean
    youAreSentADirectMessage?: boolean
    someoneAddsYouAsAsAConnection?: boolean
    uponNewOrder?: boolean
    newMembershipApproval?: boolean
    memberRegistration?: boolean
  }
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean
    tipsOnGettingMoreOutOfKeen?: boolean
    thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean
    tipsOnStartBusinessProducts?: boolean
  }
}

export interface UserSocialNetworksModel {
  linkedIn: string
  facebook: string
  twitter: string
  instagram: string
}

export interface UserModel {
  id: number
  username: string
  password: string | undefined
  email: string
  firstname: string
  lastname: string
  fullname?: string
  occupation?: string
  companyName?: string
  phone?: string
  role?: string
  avatar: string
  status: string
  auth?: AuthModel
  address?: UserAddressModel
  branch_id?: string
}

export type PaymentMethod = {
  id: ID
  name: string
  slug: string
  active: boolean
}

export type PublicMasterData = {
  settings: Settings
  payment_methods: Array<PaymentMethod>
}