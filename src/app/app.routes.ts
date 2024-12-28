import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteCadastroComponent } from './components/cliente-cadastro/cliente-cadastro.component';
import { ClientesContactarComponent } from './components/clientes-contactar/clientes-contactar.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "clientes", component: ClienteListComponent, canActivate: [authGuard]},
    {path: "clientes/cadastro", component: ClienteCadastroComponent, canActivate: [authGuard]},
    {path: "clientes-contactar", component: ClientesContactarComponent, canActivate: [authGuard]},
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'login' },
];
