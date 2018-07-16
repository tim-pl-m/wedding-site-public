import { Injectable } from '@angular/core';
import { IUser } from 'src/app/user/user';
import { first, tap, catchError, map } from '../../../node_modules/rxjs/operators';
import { CommonService } from '../shared/common.service';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Router } from '../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  currentUser: IUser;
  private _loginURL = '/users/authenticate';
  private _signUpURL = '.assets/signUp.json';


  constructor(private _http: HttpClient,
  private _commonService: CommonService,
  private _router: Router) { }

  login(username: string, password: string): Observable<IUser> {

    console.log(this._loginURL);

    return this._http.post<IUser>(this._loginURL, {username: username, password: password}).pipe(
      map(user => {
        this.currentUser = user;

        if (user /* && user.token*/) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }),
      catchError(this._commonService.handleError), );

  }

  checkIfUserExists(): any {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = this.mapToUser(localStorage.getItem('currentUser'));
      // TODO - make localstorage map directly to IUser
    }
  }

  logout() {

    console.log('do logout');

    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this._router.navigate(['/user/login']);
  }

  register(firstName: string, lastName: string, username: string, pwd: string) {
    console.log('From authService, register user: ' + firstName);

    console.log(this._loginURL);

    return this._http.post<IUser>(this._loginURL, {username: username,
      password: pwd, firstName: firstName, lastName: lastName, role: 'admin'
    }).pipe(
      map(user => {
        this.currentUser = user;

        if (user /* && user.token*/) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }),
      catchError(this._commonService.handleError), );
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  mapToUser(data): IUser {

    const currentUser: IUser = {
      userId: 0, // TODO - make this get the userId from the data
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      role: data.role
    };

    return currentUser;
  }

}
