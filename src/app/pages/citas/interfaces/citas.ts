export interface Citas {
    chrClave: string;
    chrClaveUsuario: string;
    dtFecha: string;
    chrObservaciones: string;
    chrClaveDepartamento: string;
    chrClaveUsuarioCitado: string;
    chrEstatus: string;
    chrPlantel: string;
    dtEntrada: string;
    dtSalida: string;
    intMonto: number;
    chrNombrePaciente: string;
    chrNombreTerapeuta: string;
    intEdad: number;
    tipoCita: string;
    chrCorreoElectronico: string;
    chrNombre: string;
    chrApellidoPaterno: string;
    chrApellidoMaterno: string;
}



export interface CitasRequest {
    data: {
        plantel: string;
        departamento: string;
        month: number;
        year: number;
    }

}