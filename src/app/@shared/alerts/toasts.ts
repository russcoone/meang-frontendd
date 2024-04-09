import { TYPE_ALERT } from './values.confing';
import Swal from 'sweetalert2';

export function basicAlert(icon = TYPE_ALERT.SUCCESS, title: string = '') {
  Swal.fire({
    title,
    icon,
    position: 'center',
    showConfirmButton: false,
    toast: false,
    timer: 3000,
    didOpen: () => {
      const content = Swal.getHtmlContainer();
      const $ = content.querySelector.bind(content);

      Swal.showLoading();
    },
  });
}
