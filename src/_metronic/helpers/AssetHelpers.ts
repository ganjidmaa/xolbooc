import { BOOKING_STEPS, ROLES } from "./crud-helper/consts"

export const toAbsoluteUrl = (pathname: string) => process.env.PUBLIC_URL + pathname
export const toApiPublicUrl = (pathname: string) => process.env.REACT_APP_URL + ''+ process.env.REACT_APP_STORAGE+'/user_images/' + pathname
export const toExcelUrl = (pathname: string) => process.env.REACT_APP_URL +''+ process.env.REACT_APP_STORAGE+'/excels/' + pathname

export const AppointmentStatus:Array<{value: string, name: string}> = [
    {value: 'booked', name: 'Цаг захиалсан'},
    {value: 'confirmed', name: 'Баталгаажсан'},
    {value: 'showed', name: 'Ирсэн'},
    {value: 'started', name: 'Эхлэсэн'},
    {value: 'no_show', name: 'Ирээгүй'},
    {value: 'cancelled', name: 'Цуцалсан'},
    {value: 'completed', name: 'Дууссан'},
    {value: 'part_paid', name: 'Дууссан'},
    {value: 'unpaid', name: 'Дууссан'},
]

export const LightColor: Array<{value: string, name: string, label: string}> = [
    {value: 'booked', name: 'btn-active-light-dark', 'label': 'badge-light-dark'},
    {value: 'confirmed', name: 'btn-active-light-warning', 'label': 'badge-light-warning'},
    {value: 'showed', name: 'btn-active-light-success', 'label': 'badge-light-success'},
    {value: 'started', name: 'btn-active-light-info', 'label': 'badge-light-info'},
    {value: 'no_show', name: 'btn-active-light-danger', 'label': 'badge-light-danger'},
    {value: 'cancelled', name: 'btn-active-light-danger', 'label': 'badge-light-danger'},
    {value: 'completed', name: 'btn-active-light-primary', 'label': 'badge-light-primary'},
    {value: 'part_paid', name: 'btn-active-light-primary', 'label': 'badge-light-primary'},
    {value: 'unpaid', name: 'btn-active-light-primary', 'label': 'badge-light-primary'},
]

export const AppointmentStatusLabel:Array<{value: string, name: string}> = [
    {value: 'booked', name: `btn btn-light-dark ${LightColor.filter(lc => lc.value === 'booked')[0]?.name} me-5 w-150px w-md-200px py-1`},
    {value: 'confirmed', name: `btn btn-light-warning ${LightColor.filter(lc => lc.value === 'confirmed')[0]?.name} me-5 w-150px w-md-200px py-1`},
    {value: 'showed', name: `btn btn-light-success ${LightColor.filter(lc => lc.value === 'showed')[0]?.name} me-5 w-150px w-md-200px py-1`},
    {value: 'started', name: `btn btn-light-info ${LightColor.filter(lc => lc.value === 'started')[0]?.name} me-5 w-150px w-md-200px py-1`},
    {value: 'no_show', name: `btn btn-light-danger ${LightColor.filter(lc => lc.value === 'no_show')[0]?.name} me-5 w-150px w-md-200px py-1`},
    {value: 'cancelled', name: `btn btn-light-danger ${LightColor.filter(lc => lc.value === 'cancelled')[0]?.name} me-5 w-150px w-md-200px py-1`},
    {value: 'completed', name: `btn btn-light-primary ${LightColor.filter(lc => lc.value === 'completed')[0]?.name} me-5 w-150px w-md-200px py-1`},
    {value: 'part_paid', name: `btn btn-light-primary ${LightColor.filter(lc => lc.value === 'part_paid')[0]?.name} me-5 w-150px w-md-200px py-1`},
    {value: 'unpaid', name: `btn btn-light-primary ${LightColor.filter(lc => lc.value === 'unpaid')[0]?.name} me-5 w-150px w-md-200px py-1`},
] 

export const AppointmentStatusColor:Array<{value: string, name: string}> = [
    {value: 'booked', name: 'dark'},
    {value: 'confirmed', name: 'warning'},
    {value: 'showed', name: 'success'},
    {value: 'started', name: 'info'},
    {value: 'no_show', name: 'danger'},
    {value: 'cancelled', name: 'danger'},
    {value: 'completed', name: 'primary'},
    {value: 'part_paid', name: 'primary'},
    {value: 'unpaid', name: 'primary'},
]

export const paymentStatusColors = [
    {'status': 'unpaid', 'color': 'warning', 'name': 'Төлөгдөөгүй'},
    {'status': 'part_paid', 'color': 'warning', 'name': 'Дутуу төлсөн'},
    {'status': 'completed', 'color': 'success', 'name': 'Дууссан'},
    {'status': 'voided', 'color': 'danger', 'name': 'Буцаасан'},
]

export const roleNames = [
    {'value': ROLES.ADMIN, 'name': 'Админ'},
    {'value': ROLES.RECEPTION, 'name': 'Ресепшн'},
    {'value': ROLES.USER, 'name': 'Хэрэглэгч'},
    {'value': ROLES.ACCOUNTANT, 'name': 'Санхүү'},
]

export const bookingSteps = [
    {'value': BOOKING_STEPS.ONE, 'route': 'service', 'errorMessage': 'Үйлчилгээ сонгоно уу'},
    {'value': BOOKING_STEPS.TWO, 'route': 'date', 'errorMessage': 'Өдөр, цаг сонгоно уу'},
    {'value': BOOKING_STEPS.THREE, 'route': 'customer', 'errorMessage': 'Үйлчлүүлэгчийн мэдээлэл оруулна уу'},
]

export const durationOptions = [
    {'value': '5', 'label': '5мин'},
    {'value': '10', 'label': '10мин'},
    {'value': '15', 'label': '15мин'},
    {'value': '20', 'label': '20мин'},
    {'value': '25', 'label': '25мин'},
    {'value': '30', 'label': '30мин'},
    {'value': '35', 'label': '35мин'},
    {'value': '40', 'label': '40мин'},
    {'value': '45', 'label': '45мин'},
    {'value': '50', 'label': '50мин'},
    {'value': '55', 'label': '55мин'},
    {'value': '60', 'label': '1ц'},
    {'value': '65', 'label': '1ц 5мин'},
    {'value': '70', 'label': '1ц 10мин'},
    {'value': '75', 'label': '1ц 15мин'},
    {'value': '80', 'label': '1ц 20мин'},
    {'value': '85', 'label': '1ц 25мин'},
    {'value': '90', 'label': '1ц 30мин'},
    {'value': '95', 'label': '1ц 35мин'},
    {'value': '100', 'label': '1ц 40мин'},
    {'value': '105', 'label': '1ц 45мин'},
    {'value': '110', 'label': '1ц 50мин'},
    {'value': '115', 'label': '1ц 55мин'},
    {'value': '120', 'label': '2ц'},
    {'value': '135', 'label': '2ц 15мин'},
    {'value': '150', 'label': '2ц 30мин'},
    {'value': '165', 'label': '2ц 44мин'},
    {'value': '180', 'label': '3ц'},
    {'value': '195', 'label': '3ц 15мин'},
    {'value': '210', 'label': '3ц 30мин'},
    {'value': '225', 'label': '3ц 45мин'},
    {'value': '240', 'label': '4ц'},
    {'value': '270', 'label': '4ц 30мин'},
    {'value': '300', 'label': '5ц'},
    {'value': '330', 'label': '5ц 30мин'},
    {'value': '360', 'label': '6ц'},
    {'value': '390', 'label': '6ц 30мин'},
    {'value': '420', 'label': '7ц'},
    {'value': '450', 'label': '7ц 30мин'},
    {'value': '480', 'label': '8ц'},
    {'value': '540', 'label': '9ц'},
    {'value': '600', 'label': '10ц'},
    {'value': '660', 'label': '11ц'},
    {'value': '720', 'label': '12ц'},
]

export const paymentMethodColors = [
    {color: 'info'},
    {color: 'warning'},
    {color: 'primary'},
    {color: 'danger'},
    {color: 'success'},
    {color: 'warning'},
    {color: 'info'},
    {color: 'primary'},
    {color: 'danger'},
    {color: 'success'},
]

export const paymentMethodIcons = [
    {icon: 'fa-credit-card', method: 'card'},
    {icon: 'fa-qrcode', method: 'qpay'},
    {icon: 'fa-mobile-screen', method: 'mobile'},
    {icon: 'fa-hand-holding-dollar', method: 'cash'},
    {icon: 'fa-money-check-dollar', method: 'barter'},
    {icon: 'fa-gift', method: 'coupon'},
    {icon: 'fa-gift', method: 'discount_card'},
    {icon: 'fa-gift', method: 'discount'},
    {icon: 'fa-gift', method: 'membership'},
]

export const statusMasterInfo: Array<{value: string, label: string, name: string}> = [
    {value: '1', label: 'badge-light-success', name: 'Идэвхтэй'},
    {value: '0', label: 'badge-light-danger', name: 'Идэвхгүй'},
    {value: 'active', label: 'badge-light-success', name: 'Идэвхтэй'},
    {value: 'deactive', label: 'badge-light-danger', name: 'Идэвхгүй'},
    {value: '1msg', label: 'badge-light-success', name: 'Амжилттай'},
    {value: '0msg', label: 'badge-light-danger', name: 'Амжилтгүй'},

]

export const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'indent': '-1'}, {'indent': '+1'}],
      [{'align': []}],
      ['clean']
    ]
}

export const couponClasses = [
    {'status': 'valid', 'class': 'badge badge-light-success d-inline'},
    {'status': 'redeemed', 'class': 'badge badge-light-warning d-inline'},
    {'status': 'invalid', 'class': 'badge badge-light-danger d-inline'},
];

export const couponStatusNames = [
    {'status': 'valid', 'name': 'Хүчинтэй'},
    {'status': 'redeemed', 'name': 'Ашиглагдсан'},
    {'status': 'invalid', 'name': 'Хүчингүй'},
];