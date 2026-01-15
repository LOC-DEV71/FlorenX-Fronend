import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

export const toastSuccess = (message) => {
    Toast.fire({
        icon: "success",
        title: message
    });
};

export const toastError = (message) => {
    Toast.fire({
        icon: "error",
        title: message
    });
};

export default Toast;
