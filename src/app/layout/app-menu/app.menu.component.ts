import { inject, Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { TokenService } from '../../shared/services/token.service';
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

    @Input() model: any[] = [];

    ngOnInit() {
        const permissoes = this.tokenService.getPermissions() || [];
    }

    isUrlAtiva(url: string): boolean {
        return this.router.url.includes(url);
    }
}
