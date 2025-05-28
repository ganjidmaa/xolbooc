import Swal from 'sweetalert2'

export const InfoAlert = async (text='', showCancelButton=false) => {
    return (
        Swal.fire({
            title: 'Санамж',
            icon: 'info',
            text: text,
            confirmButtonText: 'Тийм',
            cancelButtonText: 'Үгүй',
            showCancelButton: showCancelButton
        })
    )
}