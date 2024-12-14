import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteCadastroComponent } from './components/cliente-cadastro/cliente-cadastro.component';
import { ClientesContactarComponent } from './components/clientes-contactar/clientes-contactar.component';


export const routes: Routes = [
    {path: "", redirectTo: "clientes", pathMatch: 'full'},
    {path: "clientes", component: ClienteListComponent},
    {path: "clientes/cadastro", component: ClienteCadastroComponent},
    {path: "clientes-contactar", component: ClientesContactarComponent}
];
