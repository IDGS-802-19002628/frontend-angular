import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getDateHours, logoEmpresa } from '../helpers/helpers';
import { Inscripcion } from 'src/app/pages/inscripciones/interfaces/inscripcion.interface';

export const exportFichaInscripcionPDF = (
  lstFirstForm: Inscripcion,
  nameUser: string,
  download: boolean = true
) => {
  const doc = new jsPDF();
  console.log(lstFirstForm);
  doc.addImage('assets/images/logo.png','PNG',10,10,30,30);
  doc.setFontSize(10);
  doc.text('UNIVERSIDAD HUMANI MUNDIAL', 100, 20, {
    align: 'center',
    maxWidth: 100
  });

  doc.setFontSize(9);
  doc.text('FICHA DE INSCRIPCIÓN A LICENCIATURA', 100, 30, {
    align: 'center'
  });

  const personalData = [
    ['NOMBRE', lstFirstForm.chrNombre],
    ['APELLIDO PATERNO', lstFirstForm.chrPaterno],
    ['APELLIDO MATERNO', lstFirstForm.chrMaterno],
    ['SEXO', lstFirstForm.chrSexo],
    ['TIPO DE SANGRE', lstFirstForm.chrTipoSangre],
    ['ESTADO CIVIL', lstFirstForm.chrEstadoCivil],
    ['FECHA DE NACIMIENTO', lstFirstForm.dtFechaNacimiento],
    ['LUGAR DE NACIMIENTO', lstFirstForm.chrLugarNacimiento],
    ['DOMICILIO', lstFirstForm.chrDomicilio],
    ['COLONIA', lstFirstForm.chrColonia],
    ['CIUDAD', lstFirstForm.chrCiudad],
    ['ENTIDAD FEDERATIVA', lstFirstForm.chrEntidadFederativa],
    ['CÓDIGO POSTAL', lstFirstForm.chrCp],
    ['TELÉFONO CELULAR', lstFirstForm.chrTelefonoCelular],
    ['TELÉFONO DE CASA', lstFirstForm.chrTelefonoCasa],
    ['CORREO ELECTRÓNICO', lstFirstForm.chrCorreoElectronico],
    ['CURP', lstFirstForm.chrCurp]
  ];

  const laboralData = [
    ['¿TRABAJAS?', lstFirstForm.chrTrabajas],
    ['EMPRESA', lstFirstForm.chrEmpresa],
    ['PUESTO', lstFirstForm.chrPuesto],
    ['SECTOR', lstFirstForm.chrSector],
    ['DIRECCIÓN', lstFirstForm.chrDireccion],
    ['CÓDIGO POSTAL', lstFirstForm.chrCodigoPostal],
    ['COLONIA', lstFirstForm.chrColoniaEmpresa],
    ['CIUDAD', lstFirstForm.chrCiudadEmpresa],
    ['CIUDAD DE LA EMPRESA', lstFirstForm.chrCiudadEmpresa],
    ['HORARIO', lstFirstForm.chrHorario],
    ['TELÉFONO DE LA EMPRESA', lstFirstForm.chrTelefonoEmpresa]
  ];

  const familiaData = [
    ['¿DEPENDES ECONÓMICAMENTE DE TUS PADRES?', lstFirstForm.chrDependesEconomicamenteDePadres],
    ['NOMBRE DEL PADRE', lstFirstForm.chrNombrePadre],
    ['¿TRABAJA EL PADRE?', lstFirstForm.chrTrabajaPadre],
    ['EMPRESA DEL PADRE', lstFirstForm.chrEmpresaPadre],
    ['PUESTO DEL PADRE', lstFirstForm.chrPuestoPadre],
    ['DIRECCIÓN DE LA EMPRESA DEL PADRE', lstFirstForm.chrDireccionEmpresaPadre],
    ['ESTADO DE LA EMPRESA DEL PADRE', lstFirstForm.chrEstadoEmpresaPadre],
    ['CIUDAD DE LA EMPRESA DEL PADRE', lstFirstForm.chrCiudadEmpresaPadre],
    ['TELÉFONO DEL PADRE', lstFirstForm.chrTelefonoPadre],
    ['NOMBRE DE LA MADRE', lstFirstForm.chrNombreMadre],
    ['¿TRABAJA LA MADRE?', lstFirstForm.chrTrabajaMadre],
    ['EMPRESA DE LA MADRE', lstFirstForm.chrEmpresaMadre],
    ['PUESTO DE LA MADRE', lstFirstForm.chrPuestoMadre],
    ['DIRECCIÓN DE LA EMPRESA DE LA MADRE', lstFirstForm.chrDireccionEmpresaMadre],
    ['ESTADO DE LA EMPRESA DE LA MADRE', lstFirstForm.chrEstadoEmpresaMadre],
    ['CIUDAD DE LA EMPRESA DE LA MADRE', lstFirstForm.chrCiudadEmpresaMadre],
    ['TELÉFONO DE LA MADRE', lstFirstForm.chrTelefonoMadre]
  ];

  const escolarData = [
    ['LICENCIATURA', lstFirstForm.chrLicenciatura],
    ['TURNO', lstFirstForm.chrClaveTurno],
    ['CAMPUS', lstFirstForm.chrClaveEscuela],
    ['PREPARATORIA DE EGRESO', lstFirstForm.chrPreparatoriaEgreso],
    ['DIRECCIÓN DE LA PREPARATORIA', lstFirstForm.chrDireccionPreparatoria],
  ];

  let y = 40;

  const splitIntoTwoColumns = (data: any[]) => {
    const column1 = [];
    const column2 = [];
    const halfLength = Math.ceil(data.length / 2);

    for (let i = 0; i < halfLength; i++) {
      column1.push(data[i]);
    }

    for (let i = halfLength; i < data.length; i++) {
      column2.push(data[i]);
    }

    return [column1, column2];
  };

  const [personalDataColumn1, personalDataColumn2] = splitIntoTwoColumns(personalData);
  const [laboralDataColumn1, laboralDataColumn2] = splitIntoTwoColumns(laboralData);
  const [familiaDataColumn1, familiaDataColumn2] = splitIntoTwoColumns(familiaData);
  const [escolarDataColumn1, escolarDataColumn2] = splitIntoTwoColumns(escolarData);

  const pageWidth = doc.internal.pageSize.getWidth(); // Ancho de la página

// Ancho de la primera tabla
const firstTableWidth = pageWidth / 2 - 15;
// Ancho de la segunda tabla
const secondTableWidth = pageWidth / 2 ;


  doc.text('DATOS PERSONALES', 100, y,{
    align: 'center',
    maxWidth: 100
  });

  y += 3;
  autoTable(doc, {
    body: personalDataColumn1,
    startY: y,
    headStyles: {
      fillColor: [0, 0, 0]
    },
    bodyStyles: {
        fontSize: 6,
        halign: 'left',
      fillColor: [255, 255, 255]
    },
    tableWidth: firstTableWidth
  });

  autoTable(doc, {
    body: personalDataColumn2,
    startY: y,
    headStyles: {
      fillColor: [0, 0, 0]
    },
    bodyStyles: {
        fontSize: 6,
        halign: 'left',
      fillColor: [255, 255, 255]
    },
    margin: {
      left: secondTableWidth
    }
  });

  y += Math.max(personalDataColumn1.length, personalDataColumn2.length) * 7;

  doc.text('DATOS LABORALES', 100, y,{
    align: 'center',
    maxWidth: 100
  });
  y += 3;
  autoTable(doc, {
    body: laboralDataColumn1,
    startY: y,
    headStyles: {
      fillColor: [0, 0, 0]
    },
    bodyStyles: {
        fontSize: 6,
        halign: 'left',
      fillColor: [255, 255, 255]
    },
    tableWidth: firstTableWidth
  });

  autoTable(doc, {
    body: laboralDataColumn2,
    startY: y ,
    headStyles: {
      fillColor: [0, 0, 0]
    },
    bodyStyles: {
        fontSize: 6,
        halign: 'left',
      fillColor: [255, 255, 255]
    },
    margin: {
      left: secondTableWidth
    }
  });

  y += Math.max(laboralDataColumn1.length, laboralDataColumn2.length) * 7;

  doc.text('DATOS FAMILIARES', 100, y,{
    align: 'center',
    maxWidth: 100
  });
  y += 3;
  autoTable(doc, {
    body: familiaDataColumn1,
    startY: y,
    headStyles: {
      fillColor: [0, 0, 0]
    },
    bodyStyles: {
        fontSize: 6,
        halign: 'left',
      fillColor: [255, 255, 255]
    },
    tableWidth: firstTableWidth
  });

  autoTable(doc, {
    
    body: familiaDataColumn2,
    startY: y,
    headStyles: {
      fillColor: [0, 0, 0]
    },
    bodyStyles: {
        fontSize: 6,
        halign: 'left',
      fillColor: [255, 255, 255]
    },
    margin: {
      left: secondTableWidth
    }
  });

  y += Math.max(familiaDataColumn1.length, familiaDataColumn2.length) * 7;

  doc.text('DATOS ESCOLARES', 100, y,{
    align: 'center',
    maxWidth: 100
  });
  y += 3;
  autoTable(doc, {
    body: escolarDataColumn1,
    startY: y,
    headStyles: {
      fillColor: [0, 0, 0]
    },
    bodyStyles: {
      fontSize: 6,
      halign: 'left',
      fillColor: [255, 255, 255]
    },
    tableWidth: firstTableWidth
  });

  autoTable(doc, {
    body: escolarDataColumn2,
    startY: y,
    headStyles: {
      fillColor: [0, 0, 0]
    },
    bodyStyles: {
    fontSize: 6,
    halign: 'left',
      fillColor: [255, 255, 255]
    },
    margin: {
      left: secondTableWidth
    }
  });


 /* */
 doc.setFontSize(8);

  
 doc.line(75, 265, 20, 265);
doc.setLineWidth(0.1);

doc.text('NOMBRE Y FIRMA DEL/LA ALUMNO/A', 22, 270);




doc.line(190, 265, 135, 265);
doc.setLineWidth(0.1);
doc.text('NOMBRE Y FIRMA DE SERVICIOS ESCOLARES', 130, 270);





  doc.text(`Imprimió: ${nameUser}`, 10, 285);
  const date = getDateHoy();
  let month = date[1].split(":");
  let monthNew = `${month[0]}:${month[1] >= 10 ? month[1] : `0${month[1]}`}:${month[2]}`;
  doc.text(`Impresión ${date[0]} Hora ${monthNew}`, 80, 285);
  doc.text(`Página: ${doc.getNumberOfPages()}`, 170, 285);
  if (download) {
  doc.save('FichaInscripcion.pdf');
  } else {
   // doc.output('dataurlnewwindow', { filename:  `FichaInscripcion_${nameUser}.pdf` });
   // console.log(doc.output('bloburl'));
    //convertir a base64
    let base64 = doc.output('datauristring');
    window.open(doc.output('bloburl'), '_blank');
   //window.open(base64, '_blank');
  }
};

const getDateHoy = (): any[] => {
  const date = getDateHours();
  return date;
};
