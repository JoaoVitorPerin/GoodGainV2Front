import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from './app-menu/app.menu.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app-topbar/app.topbar.component';
import { AppFooterComponent } from './app-footer/app.footer.component';
import { AppConfigModule } from './config/config.module';
import { AppSidebarComponent } from "./app-sidebar/app.sidebar.component";
import { AppLayoutComponent } from "./app.layout.component";
import { ButtonModule } from 'primeng/button';
import { CotacaoService } from '../shared/services/cotacao.service';
import { FormModule } from '../shared/components/form/form.module';

@NgModule({
    declarations: [
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        FormModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        AppConfigModule,
        ButtonModule,
        ReactiveFormsModule
    ],
    exports: [AppLayoutComponent],
    providers: [
        CotacaoService, // Registre aqui o serviço
    ],
})
export class AppLayoutModule { }
