import { ModalConfirmacaoService } from './../shared/components/modal-confirmacao/modal-confirmacao.service';
import { Component, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LayoutService } from "./service/app.layout.service";
import { AppSidebarComponent } from "./app-sidebar/app.sidebar.component";
import { AppTopBarComponent } from './app-topbar/app.topbar.component';

@Component({
    selector: 'app-layout',
    templateUrl: './app.layout.component.html',
    styleUrl: './app.layout.component.scss'
})
export class AppLayoutComponent implements OnDestroy {
    nomeUsuario = 'Usuário';
    
    menuItems: any[] = [
        { label: 'Teste 1', icon: 'pi pi-fw pi-home', routerLink: ['/404'] },
        { label: 'Teste 2', icon: 'pi pi-fw pi-calendar', routerLink: ['/teste2'] },
        { label: 'Teste 3', icon: 'pi pi-fw pi-users', routerLink: ['/teste3'] },
        { label: 'Teste 4', icon: 'pi pi-fw pi-cog', routerLink: ['/teste4'] },
        { label: 'Teste 5', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/teste5'] },
        { label: 'Teste 6', icon: 'pi pi-fw pi-file', routerLink: ['/teste6'] },
        { label: `Olá, ${this.nomeUsuario}!`, icon: 'pi pi-fw pi-user', routerLink: ['/perfil'] },
    ];

    overlayMenuOpenSubscription: Subscription;

    menuOutsideClickListener: any;

    profileMenuOutsideClickListener: any;
    isMobile = window.innerWidth <= 991;

    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

    @ViewChild(AppTopBarComponent) appTopbar!: AppTopBarComponent;

    constructor(public layoutService: LayoutService, public renderer: Renderer2, public router: Router) {
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 991;
        });

        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appSidebar.el.nativeElement.isSameNode(event.target) || this.appSidebar.el.nativeElement.contains(event.target) 
                        || this.appTopbar.menuButton.nativeElement.isSameNode(event.target) || this.appTopbar.menuButton.nativeElement.contains(event.target));
                    
                    if (isOutsideClicked) {
                        this.hideMenu();
                    }
                });
            }

            if (!this.profileMenuOutsideClickListener) {
                this.profileMenuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appTopbar.menu?.nativeElement?.isSameNode(event.target) || this.appTopbar.menu?.nativeElement?.contains(event.target)
                        || this.appTopbar.topbarMenuButton?.nativeElement.isSameNode(event.target) || this.appTopbar.topbarMenuButton?.nativeElement.contains(event.target));

                    if (isOutsideClicked) {
                        this.hideProfileMenu();
                    }
                });
            }

            if (this.layoutService.state.staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.hideMenu();
                this.hideProfileMenu();
            });
    }

    hideMenu() {
        this.layoutService.state.overlayMenuActive = false;
        this.layoutService.state.staticMenuMobileActive = false;
        this.layoutService.state.menuHoverActive = false;
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    hideProfileMenu() {
        this.layoutService.state.profileSidebarVisible = false;
        if (this.profileMenuOutsideClickListener) {
            this.profileMenuOutsideClickListener();
            this.profileMenuOutsideClickListener = null;
        }
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    get containerClass() {
        return {
            'layout-theme-light': this.layoutService.config().colorScheme === 'light',
            'layout-theme-dark': this.layoutService.config().colorScheme === 'dark',
            'layout-overlay': this.layoutService.config().menuMode === 'overlay',
            'layout-static': this.layoutService.config().menuMode === 'static',
            'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config().menuMode === 'static',
            'layout-overlay-active': this.layoutService.state.overlayMenuActive,
            'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
            'p-input-filled': this.layoutService.config().inputStyle === 'filled',
            'p-ripple-disabled': !this.layoutService.config().ripple
        }
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }
}
