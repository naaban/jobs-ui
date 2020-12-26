/**
 * @author Padmanaban
 * @email nabanharish@gmail.com
 * @create date 2020-12-27 01:23:54
 * @modify date 2020-12-27 01:23:54
 * @desc [description]
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  static URL_BASE = environment.API_BASE_URL;

  static Roles = {
    Admin: 'ADMIN',
    User: 'USER',
  };
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public userStream = this.userSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    public toastrService: ToastrService
  ) {}

  post(endpoint: string, body: any): Observable<any> {
    return this.httpClient
      .post(ApiService.URL_BASE + endpoint, body, this.buildHeaders())
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  get(endpoint: string, token = null): Observable<any> {
    return this.httpClient
      .get(ApiService.URL_BASE + endpoint, this.buildHeaders())
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  put(endpoint: string, body: any): Observable<any> {
    return this.httpClient
      .put(ApiService.URL_BASE + endpoint, body, this.buildHeaders())
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  delete(endpoint: string): Observable<any> {
    return this.httpClient
      .delete(ApiService.URL_BASE + endpoint, this.buildHeaders())
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  get getCurrentUser() {
    return this.userSubject.value;
  }

  setCurrentUser(user: any) {
    this.userSubject.next(user);
  }

  handleError(error: Response | any) {
    return error;
  }

  buildHeaders() {
    let user = JSON.parse(localStorage.getItem('user'));
    return user
      ? {
          headers: {
            token: user.token,
          },
        }
      : {};
  }
}
