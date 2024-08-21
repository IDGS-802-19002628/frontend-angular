import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BibliotecaService } from '../services/biblioteca.service';
import { Libro } from '../interfaces/libro';


@Injectable({
    providedIn: 'root',
})

export class BibliotecasController {
    constructor(
        private bibliotecaService: BibliotecaService,
        private snackBar: MatSnackBar
    ){}



    public getBibliotecaLibro(): Promise<Libro[]> {
        return new Promise((resolve, reject) => {
            this.bibliotecaService.getBibliteca().subscribe({
                next: (data) => {
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al obtener los libros', '🤯😈');
                    resolve([]);
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