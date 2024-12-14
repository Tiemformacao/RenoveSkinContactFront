import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoricoInteracao } from '../models/historico-interacao.model';

@Injectable({
  providedIn: 'root',
})
export class HistoricoInteracaoService {
  private apiUrl = 'http://localhost:8080/api/historicos';

  constructor(private http: HttpClient) {}

  listarPorCliente(clienteId: number): Observable<HistoricoInteracao[]> {
    return this.http.get<HistoricoInteracao[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }

  adicionarHistorico(historico: any): Observable<any> {
    const payload = {
      cliente: {
        id: historico.clienteId, // Mapeia o clienteId para dentro do objeto cliente
      },
      dataInteracao: historico.dataInteracao,
      observacao: historico.observacao,
    };
  
    return this.http.post<any>(this.apiUrl, payload);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
