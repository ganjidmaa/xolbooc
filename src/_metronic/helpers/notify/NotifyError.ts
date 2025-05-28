import Swal from 'sweetalert2'

export const NotifyError = (text='Амжилтгүй боллоо.', timer=4000) => {
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        confirmButtonColor: '#f27474',
        allowOutsideClick: true,
        timer: timer,
        timerProgressBar: true,
        background: '#f9a3a3',
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
        
    Toast.fire({
        icon: 'error',
        title: text
    })
}