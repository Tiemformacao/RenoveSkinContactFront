import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    // Token encontrado, o usuário pode acessar a rota
    return true;
  } else {
    // Token não encontrado, redirecionar para login
    alert('Você precisa estar logado para acessar esta página.');
    router.navigate(['/login']);
    return false;
  }
};
