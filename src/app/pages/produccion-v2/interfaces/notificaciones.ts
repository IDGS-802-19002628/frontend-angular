
export interface Notificaciones {
    chrClave: string;
    chrClaveDestino: string;
    chrTipo: string;
    chrMensaje: string;
    chrStatus: number;
    dtFecha: string;
    chrUrl?: string;
    chrTitulo: string;
}


export interface NotificacionesRequest {
    chrClaveUsuario: string;
    chrClaveDepartamento: any; //formato de 1,2,3,4 etc
    chrClaveEscuela: string;
}


export interface Departamento {
    chrClave: string;
}

export interface NotificacionesInsert {
    chrClaveDestino: string;
    chrTipo: string;
    chrMensaje: string;
    chrStatus: number;
    chrUrl: string;
    chrTitulo: string;
}

export interface NotificacionesInsertResponse {
    response: string;
    message: string;
    data: null;
}

