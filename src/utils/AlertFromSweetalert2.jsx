import Swal from "sweetalert2";
import "./AlertForm.scss"
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    popup: "toast-margin-top"
  },
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


export const confirmation = () => {
  return Swal.fire({
    title: "Bạn có chắc chắn muốn xoá các mục đã chọn không?",
    text: "Hành động này không thể hoàn tác, và các mục sẽ bị xóa vĩnh viễn.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xoá",
    cancelButtonText: "Huỷ"
  });
};
