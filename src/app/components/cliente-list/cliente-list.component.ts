import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HistoricoInteracaoService } from '../../services/historico-interacao.service';
import { HistoricoInteracao } from '../../models/historico-interacao.model';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component'; 


@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ModalComponent],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css',
  encapsulation: ViewEncapsulation.None // Remove o encapsulamento de estilos
})
export class ClienteListComponent implements OnInit {

  clientes: Cliente[] = []; // Usando o modelo Cliente
  historico: HistoricoInteracao[] = [];
  clienteSelecionado: Cliente | null = null;
  isModalVisible: boolean = false;
  nomeBusca: string = ''; // Armazena o valor digitado
  
  novaInteracao: HistoricoInteracao = {
    clienteId: 0,
    dataInteracao: '',
    observacao: '',
  };
  

  constructor(private clienteService: ClienteService, private historicoService: HistoricoInteracaoService) { }

  ngOnInit(): void {
    this.clienteService.listarTodos().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (error) => {
        console.error('Erro ao buscar clientes:', error);
      }
    });
  }


  adicionarHistorico(): void {
    this.historicoService.adicionarHistorico(this.novaInteracao).subscribe({
      next: (data) => {
        alert('Histórico adicionado com sucesso!');
        this.historico.push(data); // Atualiza a lista com o novo histórico
        this.novaInteracao.dataInteracao = '';
        this.novaInteracao.observacao = '';
      },
      error: (err) => {
        console.error('Erro ao adicionar histórico:', err);
      },
    });
  }

  deletarHistorico(id: number): void {
    if (confirm('Tem certeza que deseja deletar este histórico?')) {
      this.historicoService.deletar(id).subscribe({
        next: () => {
          // Remove o histórico da lista localmente
          this.historico = this.historico.filter((interacao) => interacao.id !== id);
          alert('Histórico deletado com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao deletar histórico:', err);
          alert('Erro ao deletar histórico. Tente novamente!');
        },
      });
    }
  }
  
  
  abrirModal(cliente: Cliente): void {
    this.clienteSelecionado = cliente;
    this.isModalVisible = true;
  
    // Carrega o histórico do cliente
    this.historicoService.listarPorCliente(cliente.id!).subscribe({
      next: (data) => {
        this.historico = data;
        this.novaInteracao.clienteId = cliente.id!;
      },
      error: (err) => console.error('Erro ao carregar histórico:', err),
    });
  }
  
  fecharModal(): void {
    this.isModalVisible = false;
    this.historico = [];
    this.novaInteracao = { 
      clienteId: 0, 
      dataInteracao: '', 
      observacao: '' 
    };
  }

  editarData(cliente: Cliente): void {
    // Salva o valor original para poder cancelar
    cliente.editando = true;
    cliente.dataCompraOriginal = cliente.dataCompra;
  }
  
  salvarData(cliente: Cliente): void {
    if (!cliente.id) return;
  
    this.clienteService.atualizar(cliente.id, cliente).subscribe({
      next: (data) => {
        alert('Data atualizada com sucesso!');
        cliente.editando = false; // Sai do modo de edição
      },
      error: (err) => {
        console.error('Erro ao atualizar data:', err);
        alert('Erro ao atualizar a data. Tente novamente!');
      }
    });
  }
  
  cancelarEdicao(cliente: Cliente): void {
    if (cliente.dataCompraOriginal) { 
      cliente.dataCompra = cliente.dataCompraOriginal;
    }
    cliente.editando = false;
  }
  
  atualizarStatus(cliente: Cliente): void {
    const novoStatus = !cliente.ativo; // Alterna entre ativo/inativo
    if (cliente.id) { // Verifica se o id existe
      this.clienteService.atualizarStatus(cliente.id, novoStatus).subscribe({
        next: () => {
          cliente.ativo = novoStatus;
          alert(`Cliente ${novoStatus ? 'ativado' : 'desativado'} com sucesso!`);
          this.reordenarLista();
        },
        error: (err) => {
          console.error('Erro ao atualizar status:', err);
          alert('Erro ao atualizar status. Tente novamente!');
        },
      });
    } else {
      console.error('Erro: Cliente não possui ID válido.');
    }
  }
  
  reordenarLista(): void {
    // Move os clientes inativos para o final da lista
    this.clientes.sort((a, b) => (a.ativo === b.ativo ? 0 : a.ativo ? -1 : 1));
  }


  buscarClientes(): void {
    if (this.nomeBusca.trim() === '') {
      this.carregarClientes(); // Recarrega todos os clientes se a busca estiver vazia
      return;
    }
  
    this.clienteService.buscarPorNome(this.nomeBusca).subscribe({
      next: (data) => {
        this.clientes = data; // Atualiza a lista com os resultados filtrados
      },
      error: (err) => {
        console.error('Erro ao buscar clientes:', err);
      },
    });
  }
  
  carregarClientes(): void {
    this.clienteService.listarTodos().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => {
        console.error('Erro ao carregar clientes:', err);
      },
    });
  }

}




