export interface HistoricoInteracao {
    id?: number; // Opcional, porque o backend vai gerar
    clienteId: number;
    dataInteracao: string; // Data no formato 'yyyy-MM-dd'
    observacao: string;
}
  