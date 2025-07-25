import { Component, inject, Input } from '@angular/core';
import { LayoutService } from "../service/app.layout.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html',
    styleUrls: ['./app.footer.component.scss']
})
export class AppFooterComponent {
    private readonly layoutService = inject(LayoutService);
    private readonly router = inject(Router);

    @Input() menuItems: any[] = [];

    isUrlAtiva(url: string): boolean {
        return this.router.url.includes(url);
    }
}
