
/*
{
    "data" : {
        "correo": "flaviourdiales@gmail.com",
        "asunto": "PRUEBA",
        "body": "PRUEBA",
        "response": {
            "chrNombre": "flavio",
            "chrPaterno": "Urdiales",
            "chrMaterno": "Mena"
        },
        "textButton": "prueba"
    }
}
*/
export interface CorreosRequest {
    data: Correos;
}

export interface Correos {
    correo: string;
    asunto: string;
    body: string;
    response: responseDatos;
    textButton: string;
    url: string;
}
export interface responseDatos {
    chrNombre: string;
    chrPaterno: string;
    chrMaterno: string;
}





