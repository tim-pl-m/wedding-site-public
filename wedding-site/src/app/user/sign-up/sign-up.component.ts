import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { Router } from '../../../../node_modules/@angular/router';
import { AuthService } from '../auth.service';
import { last } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private _formBuilder: FormBuilder,
  private _router: Router,
  private _authService: AuthService) { }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
}

   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }

  onSubmit(formData) {

    console.log('test from onsubmit');

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;

    const firstName: string = formData.firstName.value;
    const lastName: string = formData.lastName.value;
    const username: string = formData.username.value;
    const pwd: string = formData.password.value;

    this._authService.register(firstName, lastName, username, pwd)
    .subscribe( data => console.log(data)
    , error => console.log(error));



    // this.userService.register(this.registerForm.value)
    //     .pipe(first())
    //     .subscribe(
    //         data => {
    //             this.alertService.success('Registration successful', true);
    //             this.router.navigate(['/login']);
    //         },
    //         error => {
    //             this.alertService.error(error);
    //             this.loading = false;
    //         });


  }

}
