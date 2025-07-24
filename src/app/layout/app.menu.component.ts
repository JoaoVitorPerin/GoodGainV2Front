import { inject, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { TokenService } from '../shared/services/token.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styleUrls: ['./app.menu.component.css'],
})
export class AppMenuComponent implements OnInit {

    private readonly router = inject(Router);
    private readonly tokenService = inject(TokenService);
    public layoutService = inject(LayoutService);

    nomeUsuario = 'Usuário';

    model: any[] = [
        { label: 'Teste 1', icon: 'pi pi-fw pi-home', routerLink: ['/404'] },
        { label: 'Teste 2', icon: 'pi pi-fw pi-calendar', routerLink: ['/teste2'] },
        { label: 'Teste 3', icon: 'pi pi-fw pi-users', routerLink: ['/teste3'] },
        { label: 'Teste 4', icon: 'pi pi-fw pi-cog', routerLink: ['/teste4'] },
        { label: 'Teste 5', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/teste5'] },
        { label: 'Teste 6', icon: 'pi pi-fw pi-file', routerLink: ['/teste6'] },
        { label: `Olá, ${this.nomeUsuario}!`, icon: 'pi pi-fw pi-user', routerLink: ['/perfil'] },
    ];

    ngOnInit() {
        const permissoes = this.tokenService.getPermissions() || [];
    }

    isUrlAtiva(url: string): boolean {
        return this.router.url.includes(url);
    }
}
