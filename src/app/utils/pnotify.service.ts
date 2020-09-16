import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import PNotifyConfirm from 'pnotify/dist/es/PNotifyConfirm';

@Injectable({
  providedIn: 'root'
})
export class PnotifyService {

  constructor() {
    PNotifyButtons;
    PNotifyConfirm;
    PNotify.defaults.styling = 'bootstrap4';
    PNotify.defaults.icons = 'fontawesome5';
  }
  success(title: string, content: string) {
    PNotify.success({
      title,
      text: content
    });
  }
  error(title: string, content: string) {
    PNotify.error({
      title,
      text: content
    });
  }
  confirm(title: string, content: string, callback: (ok: boolean) => void) {
    const notice = PNotify.notice({
      title,
      text: content,
      icon: 'fas fa-question',
      hide: false,
      stack: { dir1: 'down', modal: true, firstpos1: 25 },
      modules: {
        Confirm: { confirm: true },
        Buttons: { closer: false, sticker: false },
        History: { history: false },
      }
    });
    notice.on('pnotify.confirm', () => {
      callback(true);
    });
    notice.on('pnotify.cancel', () => {
      callback(false);
    });
  }


}
