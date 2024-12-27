import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteCadastroComponent } from './components/cliente-cadastro/cliente-cadastro.component';
import { ClientesContactarComponent } from './components/clientes-contactar/clientes-contactar.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "clientes", component: ClienteListComponent},
    {path: "clientes/cadastro", component: ClienteCadastroComponent},
    {path: "clientes-contactar", component: ClientesContactarComponent},
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'login' },
];
