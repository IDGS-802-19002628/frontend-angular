export interface UserGral {

    chrClave: string;
    chrPasswordNew: string;
    chrNombre: string;
    chrPaterno: string;
    chrMaterno: string;
    chrDomicilio: string;
    chrRFC: string;
    chrCurp: string;
    chrEmail: string;
    dtFechaNacimiento: string;
    chrTelefono: string;
    chrClaveEscuela: string;
    chrStatus: string;
    chrTipoUsuario: string;

}

export interface UserGralResponse {
    data: UserGral;
    message: string;
    response: string;
}

export interface changePassword {
    chrClave: string;
    chrPasswordOld: string;
    chrPasswordNew: string;
}