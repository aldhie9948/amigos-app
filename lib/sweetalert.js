import Swal from "sweetalert2";

export const toast = (text = "", icon = true, time = 2000) => {
  return Swal.fire({
    position: "top-end",
    icon: icon ? "success" : "error",
    title: text,
    showConfirmButton: false,
    timer: 1500,
    toast: true,
  });
};

export const confirm = (callback) => {
  return Swal.fire({
    title: "Anda yakin?",
    text: "Data akan di proses lebih lanjut",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};

// eslint-disable-next-line
export default { toast, confirm };
