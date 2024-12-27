import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors} from '@angular/common/http';
import { meuhttpInterceptor } from './auth/http-interceptor.service';




// Quando eu coloquei ithInterceptors([meuhttpInterceptor]) dentro de provideHttpClient, estou dizendo para o angular que toda requisição que acontecer passe por meuhttpInterceptor(está dentro da pasta auth), para que ele coloque o token no cabeçalho de toda requisição e, caso eu queira, trate alguns erros (tem lá tratamento de erros);
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withInterceptors([meuhttpInterceptor]))]
};
