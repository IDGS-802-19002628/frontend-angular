import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { UsuarioC } from '../interfaces/UsuarioC';


@Injectable({
    providedIn: 'root',
})

export class UsuarioCController {
    constructor(
        private authService: AuthService,
        private snackBar: MatSnackBar
    ){}



    public InsertUsuarioC(data: UsuarioC): Promise<UsuarioC> {
        return new Promise((resolve, reject) => {
            this.authService.register(data).subscribe({
                next: (response: UsuarioC) => { // Asegúrate de que 'response' sea del tipo 'UsuarioC'
                    this.openSnackBar('Usuarios clientes obtenidos correctamente', '😎👌');
                    resolve(response); // Pasa el 'response' de tipo 'UsuarioC' a 'resolve'
                },
                error: (error) => {
                    this.openSnackBar('Error al obtener los usuarios', '🤯😈');
                    reject(error);
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