import { MyserviceService } from '../../services/myservice.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
  standalone: false,
})
export class RegisterUserComponent implements OnInit {

  successMessage : string = "";
  loginSuccessMessage : string = "";
  myForm: FormGroup;
  myLoginForm: FormGroup;

  constructor(private _myservice:MyserviceService, private _http: HttpClient,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
      this.myForm = new FormGroup({
        first : new FormControl(null),
        last : new FormControl(null),
        email : new FormControl(null, Validators.email),
        password : new FormControl(null, Validators.required),
        cnfpass : new FormControl(null, this.passValidator),
    });

    this.myForm.controls.password.valueChanges
    .subscribe(
      x => this.myForm.controls.cnfpass.updateValueAndValidity()
    );

    this.myLoginForm = new FormGroup({
      email : new FormControl(null, Validators.email),
      password : new FormControl(null, Validators.required),
    });

   }

  ngOnInit(): void {
    console.log(this.deviceXs);
  }

  isValid(controlName) {
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  }

  isLoginValid(controlName) {
    return this.myLoginForm.get(controlName).invalid && this.myLoginForm.get(controlName).touched;
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') {
          return {
            isError: true
          };
        }
      }
    }

    return null;
  }

  @Input() deviceXs: boolean;

  register() {
    if(this.myForm.valid) {
      console.log(this.myForm.value);
      this._myservice.submitRegister(this.myForm.value)
      .subscribe(
        (data) => this.successMessage = "Successful Registeration, Move to Sign In :)",
        (error) => this.successMessage = "Error creating user :(",
      );
      this.movetoLogin();
    }
  }

  // register() {
  //   if(this.myForm.valid) {
  //     console.log(this.myForm.value);
  //     this._myservice.submitRegister(this.myForm.value)
  //     .subscribe(
  //         (data) => {
  //           this.submitPswd(this.myForm.value)
  //           .subscribe(
  //             (data) => this.successMessage = "Successful Registeration, Move to Sign In :)",
  //             (error) => this.successMessage = "Error creating password :(",
  //           );
  //         },
  //         (error) => {this.successMessage = "Error creating user :(";},
  //     );
  //     this.movetoLogin();
  //   }
  // }

  // submitPswd(body:any) {
  //   return this._http
  //     .post(
  //       'https://flipcart-meanapp.herokuapp.com/api/passwords',
  //       body,
  //       {
  //         observe: 'body'
  //       }
  //     );
  // }

  login() {
    if(this.myLoginForm.valid) {
      console.log(this.myLoginForm.value);
      this._myservice.submitLogin(this.myLoginForm.value)
      .subscribe(
          (data) => {
            console.log(data);
            localStorage.setItem('token', data['token'].toString());
            this.loginSuccessMessage = "SUCCESSFUL LOGIN :)";
            this.movetoProducts();
          //   setTimeout(function(){
          //     location.reload();
          //     console.log("R2");
          //  }, 1000);
          },
          (error) => this.loginSuccessMessage = "FAILURE :(",
      );


    }
  }

  movetoProducts() {
    console.log('moving to products page...');
    this._router.navigate(['/products'], { relativeTo: this._activatedRoute })
    .then( () => {location.reload();}
    );
  }

  movetoLogin() {
    console.log('moving to login page...');
    this._router.navigate(['/register-user'], { relativeTo: this._activatedRoute })
      .then( () => {location.reload();}
    );
  }

}
