import { Observable } from 'rxjs';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  variant: string = 'LOGIN';
  isOpen: boolean = false;
  userCity: Observable<string> = this.userService.$user.pipe(map(user => user.city))
  
  userForm = this.formBuilder.group({
    login: '',
    password: ''
  });

  ngOnInit() {
    // this.userService.login('admin', 'admin')
  }

  onSubmit(): void {
    console.log(this.userForm.value);

    if (this.variant === 'LOGIN') {
      this.userService.login(this.userForm.value.login, this.userForm.value.password).subscribe(console.log);
    } else {
      this.userService.register(this.userForm.value.login, this.userForm.value.password).subscribe();
    }

    this.userForm.reset();
    this.isOpen = false;
  }

  toggleLoginRegister(): void {
    this.variant = this.variant === 'REGISTER' ? 'LOGIN' : 'REGISTER';
  }

  showLoginOverlay(): void {
    this.isOpen = true;
    this.variant = 'LOGIN'
  }

  showRegisterOverlay(): void {
    this.isOpen = true;
    this.variant = 'REGISTER'
  }

  closeOverlay(): void {
    this.isOpen = false;
  }

  changeCity(newCity): void {
    console.log('changeCity', newCity);
    this.userService.changeCity(newCity);
  }

}
