import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = environment.SERVIDOR+"/api/clientes";

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  criar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  atualizar(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarParaContato(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/para-contato`);
  }

  atualizarStatus(id: number, ativo: boolean): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/status?ativo=${ativo}`, {});
  }
  
  buscarPorNome(nome: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/buscar?nome=${nome}`);
  }
  
}
