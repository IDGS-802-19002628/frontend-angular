
export interface responseCp {
    data: any;
    mensaje: string;
    respuesta: {
        total: number;
        codigos_postales: Cp[];
    };
}

export interface Cp {
    codigo_postal: string;
    asentamiento: string;
    tipo_asentamiento: string;
    zona: string;
    municipio: string;
    estado: string;
    pais: string;
}
