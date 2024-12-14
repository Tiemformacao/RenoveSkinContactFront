import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-clientes-contactar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './clientes-contactar.component.html',
  styleUrl: './clientes-contactar.component.css'
})
export class ClientesContactarComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.buscarParaContato().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => {
        console.error('Erro ao buscar clientes para contato:', err);
      }
    });
  }
}
