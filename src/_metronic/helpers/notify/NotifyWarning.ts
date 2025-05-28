import Swal from 'sweetalert2'

export const NotifyWarning = (text='Анхааруулга.', timer=4000) => {
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        confirmButtonColor: '#66ccff',
        allowOutsideClick: true,
        timer: timer,
        timerProgressBar: true,
        background: '#d5f4fd',
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
        
    Toast.fire({
        icon: 'warning',
        title: '',
        text: text,
        iconColor: '#66ccff'
    })
}