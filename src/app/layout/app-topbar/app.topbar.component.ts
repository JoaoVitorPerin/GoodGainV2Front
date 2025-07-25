import { Component, ElementRef, inject, TemplateRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "../service/app.layout.service";
import { TokenService } from '../../shared/services/token.service';
import { CotacaoService } from '../../shared/services/cotacao.service';
import { toLocaleFixed } from '../../shared/ts/util';
import { ModalService } from '../../shared/components/modal/modal.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from '../../shared/components/toastr/toastr.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    private readonly layoutService = inject(LayoutService);
    private readonly router = inject(Router);

    nomeUsuario = 'Usuário Teste';
    items!: MenuItem[];

    isMobile = window.innerWidth <= 1024;

    permissoes: any;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    ngOnChanges() {
        this.isMobile = window.innerWidth <= 1024;
    }

    logout(){
        this.router.navigate(['/home']);
    }
}
