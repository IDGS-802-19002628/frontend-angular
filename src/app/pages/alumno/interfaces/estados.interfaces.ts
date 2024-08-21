export interface responseEstados {
    data: any;
    mensaje: string;
    respuesta: {
        total: number;
        estados: Estado[];
    };
}

export interface Estado {
    clave: number;
    estado: string;
}