import Swal from 'sweetalert2'

export function SuccessAlert(text='') {
    return (
        Swal.fire({
            title: 'Амжилттай',
            icon: 'success',
            text: text,
            confirmButtonText: 'Тийм'
        })
    )
}