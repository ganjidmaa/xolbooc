import Swal from 'sweetalert2'

export function ErrorAlert(text='') {
    return (
        Swal.fire({
            title: 'Алдаа гарлаа',
            text: text,
            icon: 'error',
            confirmButtonText: 'Тийм'
        })
    )
}