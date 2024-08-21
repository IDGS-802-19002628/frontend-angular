
export interface FichasRequestConsultar {
    data: {
        plantel: string;
        month: string;
        year: string;
    }
}

export interface FichasConsultarResponse{
    response: string;
    message: string;
    data: Fichas[];
}

export interface Fichas {
    chrClave: string;
    chrCorreoElectronico: string;
    chrNombre: string;
    chrApellidoPaterno: string;
    chrApellidoMaterno: string;
    chrGenero: string;
    chrNumeroTelefono: string;
    dtFechaNacimiento: string;
    chrDireccion: string;
    chrCiudadResidencia: string;
    chrPreparatoriaEgreso: string;
    chrLicenciaturaInteres: string;
    chrHorarioInteres: string;
    chrComoConocio: string;
    chrEstatus: string;
    chrClavePlantel: string;
    chrStatus?: string;
}
