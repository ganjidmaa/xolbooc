import Swal from 'sweetalert2'

export const FormAlert = async () => {
    return (
        Swal.fire({
            title: 'Цуцалсан шалтгаанаа сонгоно уу',
            input: 'select',
            inputOptions: {
                'mistake': 'Санамсаргүй үүсгэсэн',
                'user_request': 'Эмчийн хүсэлтээр',
                'user_accept': 'Үйлчилгээгээ авсан',
                'user_decline': 'Үйлчлүүлэгч өдрөө өөрчилсөн',
            },
            inputPlaceholder: 'Сонгоно уу',
            confirmButtonText: 'Тийм',
            cancelButtonText: 'Үгүй',
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value) {
                        resolve(null)
                    }    
                    else {
                        resolve('Цуцалсан шалтгаанаа сонгоно уу')
                    }
                })
            }
        })
    )
}

