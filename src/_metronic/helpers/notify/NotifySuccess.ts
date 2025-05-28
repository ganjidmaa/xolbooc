import Swal from 'sweetalert2'

export const NotifySuccess = (text='Амжилттай хадгалагдлаа.') => {
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
        
    Toast.fire({
        icon: 'success',
        title: text
    })
}