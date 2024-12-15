import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Input() title: string = ''; // Título do modal
  @Input() isVisible: boolean = false; // Define se o modal está visível
  @Output() fechar = new EventEmitter<void>(); // Evento para fechar o modal

  // Método para fechar o modal
  closeModal() {
    this.fechar.emit();
  }
}
