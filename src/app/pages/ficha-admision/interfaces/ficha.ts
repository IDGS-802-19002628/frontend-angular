export interface FichaRequest{
 data: Ficha;
}

export interface Ficha {
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
    progreso?: number;
}

export interface FichaConsultarRequest{
    data: {
        referencia: string;
    }
}

export interface FichaConsultarResponse{
    response: string;
    message: string;
    data: {
        datosFicha: Ficha;
        datosRerencia: {
            chrClavePeriodo: string;
            chrClaveCurso: string;
            chrClaveEscuela: string;
            chrClaveGrupo: string;
            intAnio: number;
            chrTipoCarga: string;
            chrNoServicioBancario: string;
            chrClaveAlumno: string;
            intConsecutivoPago: number;
            chrClaveConceptoPago: string;
            chrClaveDescuento: string;
            intMonto: number;
            intMontoPagado: number;
            dtFechaVencimiento: string;
            dtFechaImpresion: string;
            dtFechaPago: string;
            chrLineaReferencia: string;
            chrLineaReferencia2: string;
            chrNotas: string;
            chrBancoPago: string;
            chrFormaPago: string;
            fltseguro: number;
            fltadeudo: number;
            chrtipoinscripcion: string;
            fltpagocompleto: number;
            chrStatus: string;
        }
    }
}