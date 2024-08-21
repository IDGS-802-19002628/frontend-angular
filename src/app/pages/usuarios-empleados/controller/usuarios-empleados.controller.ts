import { Injectable } from "@angular/core";
import { UsuariosEmpleadosService } from "../services/usuarios-empleados.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UsuarioEmpleado } from "../interfaces/usuarioE";


@Injectable({
    providedIn: 'root',
})

export class UsuarioControllerService {
    constructor(
        private usuariosEService: UsuarioControllerService,
        private snackBar: MatSnackBar
    ) { }


    

    

    private openSnackBar(message: string, icon: string) {
        this.snackBar.open(message, icon, {
            duration: 5000
        });
    }
}


