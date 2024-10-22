import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { Observable } from 'rxjs';
// import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{
  signupForm: FormGroup<{
    firstName: FormControl<string | null>;
    middleName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    email: FormControl<string | null>;
    // phone: FormControl<string | null>;
    // country: FormControl<string | null>;
    // address: FormControl<string | null>;
    // city: FormControl<string | null>;
    // state: FormControl<string | null>;
    // zip: FormControl<string | null>;
    password: FormControl<string | null>;
    // confirmPassword: FormControl<string | null>;
    verificationCode: FormControl<string | null>;
  }>;

  countries: string[] = [];

  constructor(private fb: FormBuilder,  private http: HttpClient) {
    this.signupForm = this.fb.group({
      firstName: new FormControl<string | null>(null, [Validators.required]),
      middleName: new FormControl<string | null>(null),
      lastName: new FormControl<string | null>(null, [Validators.required]),
      email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
      // phone: new FormControl<string | null>(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      // country: new FormControl<string | null>(null, [Validators.required]),
      // address: new FormControl<string | null>(null, [Validators.required]),
      // city: new FormControl<string | null>(null, [Validators.required]),
      // state: new FormControl<string | null>(null, [Validators.required]),
      // zip: new FormControl<string | null>(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)]),
      // confirmPassword: new FormControl<string | null>(null, [Validators.required]),
      verificationCode: new FormControl<string | null>(null, [Validators.required])
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup): null | { passwordMismatch: boolean } {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'passwordMismatch': true };
  }

  ngOnInit() {
    this.fetchCountries();  // Fetch countries on component init
  }

  // Fetch country list from API
  fetchCountries(): void {
    this.http.get<any[]>('https://restcountries.com/v3.1/all')
      .subscribe(data => {
        this.countries = data.map((country: any) => country.name.common).sort();  // Extract and sort country names
      }, error => {
        console.error('Error fetching country list:', error);
      });
  }

  // Handle Google Login
  // loginWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
  //     console.log('Google User:', user);
  //     // Handle the user response, e.g., save to your database or redirect
  //   }).catch(err => {
  //     console.error('Google login failed:', err); // Added error handling
  //   });
  // }

  // Handle Facebook Login
  // loginWithFacebook(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
  //     console.log('Facebook User:', user);
  //     // Handle the user response
  //   }).catch(err => {
  //     console.error('Facebook login failed:', err); // Added error handling
  //   });
  // }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
      this.signupForm.reset(); // Reset form after successful submission
    }
  }
}
