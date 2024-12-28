import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

// Colocamos o nome dessa classe 'meuhttpInterceptor' no arquivo 'app.config.ts'. Fica assim lá: provideHttpClient(withInterceptors([meuhttpInterceptor]));
// Esse componente é responsável por setar o token no cabeçalho de cada requisição automaticamente, exceto na rota /login;
// Trata também o response(o que o servidor retorna). Trata antes de chegar no nosso componente de login;

export const meuhttpInterceptor: HttpInterceptorFn = (request, next) => {

  let router = inject(Router);

  // Obtem o token do localStorage
  let token = localStorage.getItem('token');

  // Inclui o token do localStorage em cada requisição http (Inclui no header);
  // Se o token existir e a URL não incluir '/api/login', adiciona o token no cabeçalho
  if (token && !router.url.includes('api/login')) {
    request = request.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    });
  }

  // Lógica para fazer tratamento dos responses. Podemos tratar os erros genericamente aqui, ao invés de tratar em cada componente;
  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
	  
        // Esse tratamento de erro aqui é para quando o usuário, por exemplo, não manda o token na requisição;
        if (err.status === 401) {
          alert('Sessão expirada. Realize o login novamente.');
          router.navigate(['/login']);
        } else if (err.status === 403) {
          alert('Você não tem permissão para acessar este recurso.');
		  router.navigate(['/login']);
        } else {
          console.error('HTTP error:', err);
        }
		
		
      } else {
        console.error('Ocorreu um erro inesperado:', err);
      }

      return throwError(() => err);
    })
  );
};
