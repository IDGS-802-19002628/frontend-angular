export interface agregarAlumno {
    data: Data;
}

export interface Data {
    chrClave : string;
    chrTipoUsuario: string;
    chrModalidad: string;
    chrClaveEscuela: string;
    chrNombre: string;
    chrPaterno: string;
    chrMaterno: string;
    dtFechaNacimiento: string;
    chrCurp: string;
    chrDomicilio: string;
    chrTelefono: string;
    chrEmail: string;
    chrRFC: string;
    chrEscuelaProcedencia: string;
    chrGenero: string;
    chrPracticasProf : string;
    chrServicioCom : string;
    chrPassword: string;
    chrStatus: string;
    chrFoto: string;
    dtAltaUsuario: string;
    idFichaInscripcion: string;
    dtMes   : number;
    dtYear  : string;
    chrClaveCurso: string;
}

export interface ResponseInsertAlumno {
    data: any;
    mensaje: string;
    respuesta: any;
}


export interface ArchivosAlumno {
    id: number;
    nombre: string;
    ruta: string;
    extension: string;
    tamano: string;
    fecha: string;
    hora: string;
    usuario: string;
    tipo: string;
    estado: string;
    descripcion: string;
    id_carpeta: string;
}


