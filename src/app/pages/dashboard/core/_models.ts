export type DashboardData = {
    totalIncome: Array<MonthIncome>
    appointmentStatusData: AppointmentStatus
    userIncome: Array<UserIncome>
    userAppointment: UserAppointment
    branchAppointments:Array<BranchAppointments>
    branchIncomes:Array<BranchAppointments>
}

export type MonthIncome = {
    month: string
    income: number
}

export type AppointmentStatus = {
    colors: Array<string>
    numbers: Array<number>
    labels: Array<string>
}

export type UserIncome = {
    firstname: string
    user_income: number
}

export type UserAppointment = {
    resources: Array<number>
    series: Array<{name: string, data: Array<number>}>
    totalCount: number
}

export type BranchAppointments = {    
    name: string,
    type:string
    backgroundColor: string,
    data: [],
      
}