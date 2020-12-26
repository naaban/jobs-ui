/**
 * @author Padmanaban
 * @email nabanharish@gmail.com
 * @create date 2020-12-27 01:24:02
 * @modify date 2020-12-27 01:24:02
 * @desc [description]
 */
import { ToastrService } from 'ngx-toastr';

export class AppController {
  public toastr: ToastrService;

  onSuccess(message, title = 'Success'): void {
    this.toastr.success(message, title);
  }

  onFailed(message, title = 'Failed'): void {
    this.toastr.error(message, title);
  }

  onWarning(message, title = 'Warning !'): void {
    this.toastr.warning(message, title);
  }
}
