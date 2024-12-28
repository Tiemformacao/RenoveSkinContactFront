import { Component, inject, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../auth/login.service';
import { Login } from '../../auth/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None // Remove o encapsulamento de estilos
})
export class LoginComponent {

  login: Login = new Login();

  router = inject(Router);
  loginService = inject(LoginService);

  constructor(){

  }

  Logar() {
    this.loginService.logar(this.login).subscribe({
      next: token => {
        // Se chegou o token, usuário e senha estavam corretos;
        if(token) {
          this.loginService.addToken(token);
          this.router.navigate(['/clientes'])

        // Usuário ou senha estavam incorretos;
        } else {
          alert('usuário ou senha incorretos!')
        }
      },
      error: erro => {
        alert('deu erro');
      }
    })
  }
  
}
