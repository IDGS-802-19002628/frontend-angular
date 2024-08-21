import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FichaService } from '../services/ficha.service';
import { Ficha, FichaConsultarResponse, FichaRequest } from '../interfaces/ficha';
import Swal from 'sweetalert2';
import { sanitizeMessage } from 'src/app/shared/helpers/helpers';
import { FichasConsultarResponse, FichasRequestConsultar } from '../interfaces/fichas';
@Injectable({
    providedIn: 'root',
})
export class FichaControllerService {
    constructor(
        private snackBar: MatSnackBar,
        private fichaService: FichaService
    ) { }

    public guardarFicha(data: FichaRequest): Promise<any> {
        return new Promise((resolve, reject) => {
            this.fichaService.guardarFicha(data).subscribe({
                next: (data) => {
                    this.openSnackBar('Ficha guardada correctamente', '🤟🤩');
                    resolve(data);
                },
                error: (error) => {
                    Swal.fire({
                        icon:  error.error.response === 'error' ? 'error' : 'warning',
                        title: error.error.message,
                        text: sanitizeMessage(error.error.data)
                    });
                    resolve(false);
                },
            });
        });
    }

    //consultar ficha
    public consultarFicha(referencia: string): Promise<FichaConsultarResponse> {
        return new Promise((resolve, reject) => {
            this.fichaService.consultarFicha(referencia).subscribe({
                next: (data) => {
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al consultar la ficha', '🤯😈');
                    reject({} as FichaConsultarResponse);
                },
            });
        });
    }

    //crear folio en multipagos
    public crearFolioMultipagos(claveAlumno: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.fichaService.crearFolioMultipagos(claveAlumno).subscribe({
                next: (data) => {
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al crear el folio', '🤯😈');
                    resolve(false);
                },
            });
        });
    }

    //crear firma folio,referencia,monto,concepto,servicio
    public crearFirmaFolio(folio: string, referencia: string, monto: number, concepto: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.fichaService.crearFirmaFolio(folio, referencia, monto, concepto).subscribe({
                next: (data) => {
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al crear la firma', '🤯😈');
                    resolve(false);
                },
            });
        });
    }
    
    //obtener todas las fichas
    public getFichas(data : FichasRequestConsultar): Promise<FichasConsultarResponse> {
        return new Promise((resolve, reject) => {
            this.fichaService.getFichas(data).subscribe({
                next: (data) => {
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al obtener las fichas', '🤯😈');
                    resolve({ data: [] } as unknown as FichasConsultarResponse);
                },
            });
        });
    }
    


    private openSnackBar(message: string, action: string): void {
        this.snackBar.open(message, action, {
            duration: 3000,
        });
    }
}
