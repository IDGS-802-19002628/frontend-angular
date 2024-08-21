import { RegistroPatronal } from './registroPatronal';  
import { ActoDeRevision } from './actoDeRevision';

export interface Planeacion {
  // I.- Datos generales
  patron: string;
  registroPatronalPrincipal: string;
  registrosPatronalesAdicionales: string[];
  rfc: string;
  domicilioFiscal: string;
  actividadOGiro: string;
  regimenFiscal: string;
  tipoDeActoDeFiscalizacion: string;
  numeroDeFolio: string;
  contenidoEnElOficioNumero: string;
  fechaDelOficio: Date;
  fechaDeInicio: Date;
  fechaDeTerminoNormado: Date;
  fechaDeTerminoLegal: Date;
  periodosARevisar: string;
  registrosPatronales: RegistroPatronal[];
  // II.- Antecedentes
  antecedentes: string;
  // III.- Actos de la Revisión
  actosDeLaRevision: ActoDeRevision[];
  // IV.- Estatus de la planeación
  estatus: string;
  clave: string;

}