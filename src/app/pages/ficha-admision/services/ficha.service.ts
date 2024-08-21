import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Ficha, FichaConsultarResponse, FichaRequest } from '../interfaces/ficha';
import { FichasConsultarResponse, FichasRequestConsultar } from '../interfaces/fichas';
import { Cita } from 'src/app/shared/dialogs/cita-dialog/cita-dialog.component';



@Injectable({
  providedIn: 'root'
})

export class FichaService {

  private URL_FICHA = environment.ENDPOINT_FICHA;
  private URL_MULTIPAGOS = environment.ENDPOINT_MULTIPAGOS;
  private URL_CITA = environment.ENDPOINT_CITA;
  constructor(
    private http: HttpClient
  ) { }

  public guardarFicha(data: FichaRequest): Observable<any> {
    return this.http.post(`${this.URL_FICHA}agregar`, data)
      .pipe(
        catchError(err => throwError(() => err))
      );
  }

  //consultar ficha
  public consultarFicha(referencia: string): Observable<FichaConsultarResponse> {
    let data = {
      data : {
        referencia
      }
    }
    return this.http.post<FichaConsultarResponse>(`${this.URL_FICHA}consultar`, data)
      .pipe(
        catchError(err => throwError(() => err))
      );
  }
  
    //crear folio en multipagos
    public crearFolioMultipagos(claveAlumno: string): Observable<any> {
      let data = new FormData();
      data.append('claveAlumno', claveAlumno);
      data.append('accion', 'createFolio');
      return this.http.post(`${this.URL_MULTIPAGOS}`, data)
        .pipe(
          catchError(err => throwError(() => err))
        );
    }

    //crear firma folio,referencia,monto,concepto,servicio
    public crearFirmaFolio(folio: string, referencia: string, monto: number, concepto: string): Observable<any> {
      let data = new FormData();
      data.append('folio', folio);
      data.append('referencia', referencia);
      data.append('monto', monto.toString());
      data.append('concepto', concepto);
      data.append('servicio', "107");
      data.append('accion', 'generaFirma');
      return this.http.post(`${this.URL_MULTIPAGOS}`, data)
        .pipe(
          catchError(err => throwError(() => err))
        );
    }
    
    //obtener todas las fichas
    public getFichas(data: FichasRequestConsultar): Observable<FichasConsultarResponse> {
      return this.http.post<FichasConsultarResponse>(`${this.URL_FICHA}consultarTodos`, data)
        .pipe(
          catchError(err => throwError(() => err))
        );
    }
    //insertarCita
    public insertarCita(data: Cita): Observable<any> {
      let dataSend = {
        "dataaaa" : data
      }
      
      return this.http.post(`${this.URL_CITA}insertarCita`, dataSend)
        .pipe(
          catchError(err => throwError(() => err))
        );
    }

        //consultarCitasPorPlantelYDepartamentoYmesYanio
        public consultarCitasPorPlantelYDepartamentoYmesYanio(data: any): Observable<any> {
          return this.http.post(`${this.URL_CITA}consultarCitasPorPlantelYDepartamentoYmesYanio`, data)
            .pipe(
              catchError(err => throwError(() => err))
            );
        }
    
        //consultarCitaPorId
        public consultarCitaPorId(data: any): Observable<any> {
          let dataSend = {
            "data" : data
          }
          return this.http.post(`${this.URL_CITA}consultarCitaPorId`, dataSend)
            .pipe(
              catchError(err => throwError(() => err))
            );
        }
    
        //actualizarCita
        public actualizarCita(data: any): Observable<any> {
          let dataSend = {
            "data" : data
          }
          return this.http.post(`${this.URL_CITA}actualizarCita`, dataSend)
            .pipe(
              catchError(err => throwError(() => err))
            );
        }
    
        //consultarCitaPorIdUsuario
    
        public consultarCitaPorIdUsuario(data: any): Observable<any> {
          let dataSend = {
            "data" : data
          }

          return this.http.post(`${this.URL_CITA}consultarCitaPorIdUsuario`, dataSend)
            .pipe(
              catchError(err => throwError(() => err))
            );
        }
}
