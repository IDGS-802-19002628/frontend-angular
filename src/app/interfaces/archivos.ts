
export interface Archivos {
    data: {
        file: string;
        name: string;
        chrClaveUsuario: string;
        estatus: string;
    };
}



export interface AutorizarArchivo {
    data: {
        id: number;
        chrClaveUsuario: string;
        estatus: string;
        descripcion: string;
    };
}
