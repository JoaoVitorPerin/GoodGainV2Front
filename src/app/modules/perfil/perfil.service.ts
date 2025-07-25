import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private readonly API_BACK = environment.API_BACK;

  private data: any;

  constructor(
    private http: HttpClient,
    private headerService: HeaderService
  ) {
  }

  buscarPreferencias(cpf): Observable<any> {
    return this.http.get<any>(this.API_BACK + 'preferencias', {
        headers: this.headerService.getHeader(),
        params: {cpf: cpf}
    });
  }

  buscarCampeonatos(): Observable<any> {
    return this.http.get<any>(this.API_BACK + 'campeonato', {
      headers: this.headerService.getHeader()
    });
  }

  buscarUserByCpf(cpf: any): Observable<any> {
    return this.http.get<any>(this.API_BACK + 'cliente', {
      headers: this.headerService.getHeader(),
      params: {cpf: cpf}
    });
  }
   
  editarUser(dados: any): Observable<any> {
    this.data = {
      ...dados,
    };

    return this.http.put<any>(`${this.API_BACK}cliente`, this.data, {
      headers: this.headerService.getHeader(),
    });
  }

  enviarPreferencias(dados): Observable<any> {
    this.data = {
      ...dados,
    };

    return this.http.post<any>(`${this.API_BACK}preferencias`, JSON.stringify(this.data), {
      headers: this.headerService.getHeader({ 'Content-Type': 'application/json' }),
    });
  }

  redefinirSenha(dados: any): any {
    return this.http.post<any>(`${this.API_BACK}alterar/senha`, dados, {
      headers: this.headerService.getHeader(),
    });
  }

  excluirConta(dados: any): any {
    return this.http.delete<any>(`${this.API_BACK}cliente`, {
      headers: this.headerService.getHeader(),
      params: dados
    });
  }


}
