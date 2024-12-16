export interface Cliente {
    id?: number;
    nome: string;
    cidade: string;
    dataCompra: string;
    ativo: boolean;

    // Propriedades temporárias para edição
    editando?: boolean;
    dataCompraOriginal?: string;
  }
  