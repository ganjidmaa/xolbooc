import Swal from 'sweetalert2'

export function WarningAlert(text='') {
    return (
        Swal.fire({
            title: 'Анхааруулга',
            icon: 'warning',
            text: text,
            confirmButtonText: 'Тийм'
        })
    )
}