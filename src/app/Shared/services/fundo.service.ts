import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFundo } from '../interfaces/IFundo';
import { IResponse } from '../interfaces/IResponse';
import { ISetFundo } from '../interfaces/ISetFundos';
import { ITipoFundo } from '../interfaces/ITipoFundo';

@Injectable({
    providedIn: 'root'
  })
  export class FundoService {
  
    constructor(private http: HttpClient) { }
  
    Create(fundo: ISetFundo): Observable<IResponse<void>> {
  
      return this.http.post<IResponse<void>>(`${environment.url}/fundo`, fundo);
    }
  
    Update(fundo: ISetFundo): Observable<IResponse<void>> {
  
      return this.http.put<IResponse<void>>(`${environment.url}/fundo/${fundo.codigo}`, fundo);
    }
  
    MovimentarPatrimonio(codigo: string, value: number): Observable<IResponse<void>> {

      return this.http.patch<IResponse<void>>(`${environment.url}/fundo/${codigo}/patrimonio `, value);
    }
  
    Remove(codigo: string): Observable<IResponse<void>> {
      
      return this.http.delete<IResponse<void>>(`${environment.url}/fundo/${codigo}`, { });
    }

    GetAllFundos(): Observable<IResponse<IFundo[]>> {
  
      return this.http.get<IResponse<IFundo[]>>(`${environment.url}/fundo`);
    }
  
    GetByCode(codigo: string): Observable<IResponse<IFundo>> {
      const params: {[param: string]: string} = {};
      params.codigo = codigo;
  
      return this.http.get<IResponse<IFundo>>(`${environment.url}/fundo`, { params});
    }

    GetTiposFundo(): ITipoFundo[] {
      const tipos: Array<ITipoFundo> = [
        { codigo: 1, nome: 'RENDA FIXA' },
        { codigo: 2, nome: 'ACOES' },
        { codigo: 3, nome: 'MULTI MERCARDO' },
      ]
      return tipos;
    }

  
}
