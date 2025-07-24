import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { TokenService } from '../shared/services/token.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styleUrls: ['./app.menu.component.css'],
})
export class AppMenuComponent implements OnInit {

    model: any[] = [
        { label: 'Teste 1', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
        { label: 'Teste 2', icon: 'pi pi-fw pi-calendar', routerLink: ['/teste2'] },
        { label: 'Teste 3', icon: 'pi pi-fw pi-users', routerLink: ['/teste3'] },
        { label: 'Teste 4', icon: 'pi pi-fw pi-cog', routerLink: ['/teste4'] },
        { label: 'Teste 5', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/teste5'] },
        { label: 'Teste 6', icon: 'pi pi-fw pi-file', routerLink: ['/teste6'] }
    ];

    constructor(
        public layoutService: LayoutService,
        private tokenService: TokenService
    ) { }

    ngOnInit() {
        const permissoes = this.tokenService.getPermissions() || [];
    }
}
