import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cliente-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cliente-cadastro.component.html',
  styleUrl: './cliente-cadastro.component.css'
})
export class ClienteCadastroComponent {
  cliente: Cliente = {
    nome: '',
    cidade: '',
    dataCompra: '',
    ativo: true
  };

  constructor(private clienteService: ClienteService, private router: Router) { }

  salvar(): void {
    this.clienteService.criar(this.cliente).subscribe({
      next: () => {
        alert('Cliente cadastrado com sucesso!');
        this.router.navigate(['/clientes']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar cliente:', err);
        alert('Ocorreu um erro ao cadastrar o cliente.');
      }
    });
  }
}
