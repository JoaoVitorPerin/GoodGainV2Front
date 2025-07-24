import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AutenticacaoComponent } from './core/autenticacao/autenticacao.component';
import { AutenticacaoGuard } from './core/guards/autenticacao.guard';
import { Page404Component } from './core/page-404/page-404.component';
import { RedefinirSenhaComponent } from './core/redefinir-senha/redefinir-senha.component';
import { HomeComponent } from './core/home/home.component';
import { CadastroComponent } from './core/cadastro/cadastro.component';
import { PerfilComponent } from './modules/perfil/perfil.component';

const APP_ROUTES: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'login',
        component: AutenticacaoComponent
    },
    {
        path: 'cadastro',
        component: CadastroComponent
    },
    {
        path: 'redefinir-senha',
        component: RedefinirSenhaComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AppLayoutComponent,
        data: { animationState: 'AppLayoutComponent' },
        children: [
            {
                path: '404',
                component: Page404Component
            },
            {
                path: 'perfil',
                component: PerfilComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'home',
        data: { animationState: 'FullPath' },
    },
];
  
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}