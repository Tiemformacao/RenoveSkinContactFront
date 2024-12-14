import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent implements OnInit {

  clientes: Cliente[] = []; // Usando o modelo Cliente

  constructor(private clienteService: ClienteService) { }

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

  
}
