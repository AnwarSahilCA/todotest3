import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Signup } from '../model/signup';
import { User } from '../model/User';
import { AuthServiceService } from '../service/auth-service.service';
import { RouterServiceService } from '../service/router-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
 
  signup: Signup = new Signup();
  signUpArray: Array<Signup> = [];
  signupForm: FormGroup;
  
  // Inside your LoginComponent class
showPassword: boolean = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}


  constructor(private routerService: RouterServiceService, private authenticateService: AuthServiceService, public formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")],
      conpassword: ['', Validators.required],
      email: ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('key') != null) {
      this.routerService.tohome();  
    }
  }

  get f() {
    return this.signupForm.controls;
  }

  // onSubmit() {
    // this.signup.password = this.signupForm.value.password;
    // this.signup.username = this.signupForm.value.username;
    // this.signup.name = this.signupForm.value.name;
    // this.signup.email = this.signupForm.value.email;
    // this.signup.conpassword = this.signupForm.value.conpassword;
    // this.signup.type = this.signupForm.value.type;

    // this.signUpArray.push(this.signup);

    // this.authenticateService.addUser(this.signup).subscribe((data) => {
    //   this.routerService.tologin();
    //   alert("Register Successful " + data.name);
    // },
    // (error: any) => {
    //   console.log(error);
    //   alert("Oops! Already registered. Try logging in instead.");
    // });
    
  // }
  onSubmit() {
     this.signup.password = this.signupForm.value.password;
     this.signup.username = this.signupForm.value.username;
     this.signup.name = this.signupForm.value.name;
     this.signup.email = this.signupForm.value.email;
     this.signup.conpassword = this.signupForm.value.conpassword;
     this.signup.type = this.signupForm.value.type;

    this.signUpArray.push(this.signup);
    if (this.signupForm.valid) {
      this.signup = this.signupForm.value;
    
      this.authenticateService.addUser(this.signup).subscribe(
        (data) => {
          this.routerService.tologin();
          alert("Registration Successful: " + data.name);
          this.signupForm.reset(); // Reset the form after successful submission
        },
        (error: any) => {
          console.log(error);
          alert("Oops! Already registered. Try logging in instead.");
        }
    );
      }
      else {
      alert("Please fill in all fields.");
    }
  }
  
  

  // Custom validation function to check if password and confirm password match
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const conpassword = control.get('conpassword')?.value;

    if (password !== conpassword) {
      control.get('conpassword')?.setErrors({ passwordMatch: true });
    } else {
      control.get('conpassword')?.setErrors(null);
    }
  }
    // Add your signup logic to register the user
  }




