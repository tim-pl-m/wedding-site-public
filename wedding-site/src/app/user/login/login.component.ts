import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;

  constructor(private _router: Router,
  private _authService: AuthService,
  private _formBuilder: FormBuilder,
  private _route: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

      // get return url from route parameters or default to '/'
      this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(formData) {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this._authService.login(formData.username.value, formData.password.value)
      .subscribe(
        data => {
          console.log(data);
          console.log(this._authService.isAuthenticated());
          this._router.navigate(['/']);
        },
        error => {
          console.log(error);
          this.loading = false;
        }
      );

      // this._authService.login(this.f.username.value, this.f.password.value)
      // .pipe(first())
      // .subscribe(
      //     data => {
      //         this.router.navigate([this.returnUrl]);
      //     },
      //     error => {
      //         this.alertService.error(error);
      //         this.loading = false;
      //     });
      }

}
