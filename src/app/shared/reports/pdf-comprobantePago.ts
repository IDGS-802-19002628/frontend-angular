import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export const ComprobantePagoComponent =  () => {

    const doc = new jsPDF('p', 'pt', 'a4');

    // Agregar el logo de la universidad
    const img = new Image();
    img.src = 'assets/images/logo.png';
    img.onload = () => {

       // Titulo y logo
       doc.addImage(img, 'PNG', 40, 30, 100, 50);
       doc.setFontSize(18);
       doc.setFont('helvetica', 'bold');
       doc.text('HUMANI MUNDIAL', 180, 60);
 
       // Informacion general
       doc.setFontSize(12);
       doc.setFont('helvetica', 'normal');
       doc.text('No. Servicio BB:', 50, 100);
       doc.text('2692', 150, 100);
       doc.text('Fecha Límite de Pago:', 250, 100);
       doc.text('2024-08-24', 380, 100);
       doc.text('SILAO', 500, 100);
 
       // Informacion del alumno
       doc.setFontSize(12);
       doc.setFont('helvetica', 'normal');
       doc.text('Nombre del Alumno:', 50, 140);
       doc.text('3S122581-Ma Elena Alcacio Juarez', 200, 140);
       doc.text('Curso-Periodo:', 50, 160);
       doc.text('Psicología-SILAO-8', 200, 160);
       doc.text('Grupo:', 400, 160);
       doc.text('05', 450, 160);
 
       // Concepto de Pago
       doc.setFontSize(12);
       doc.setFont('helvetica', 'normal');
       doc.text('Concepto de Pago:', 50, 180);
       doc.text('COLEGIATURA DE AGOSTO', 200, 180);
       doc.text('Seguro incluido en el Monto de Pago:', 50, 200);
       doc.text('0.00', 300, 200);
       doc.text('Adeudos incluidos en el Monto de Pago:', 50, 220);
       doc.text('0.00', 300, 220);
       doc.text('Total a Pagar:', 50, 240);
       doc.text('$2,318.00', 200, 240);
 
       // Información bancaria
       doc.setFontSize(12);
       doc.setFont('helvetica', 'normal');
       doc.text('BanBajío:', 50, 260);
       doc.text('12783S122581036123453960691', 150, 260);
 
       // Nota importante
       doc.setFontSize(10);
       doc.setFont('helvetica', 'normal');
       doc.text('Pago en cualquier sucursal del País', 50, 300);
       doc.text('EXIJA SU COMPROBANTE DE PAGO; SE LO DEBE EMITIR EL CAJERO', 50, 320);
       doc.text('DE BANCO, HECHO EL PAGO NO HABRA DEVOLUCION EN NINGUN', 50, 340);
       doc.text('CASO', 50, 360);
 
       // Dibuja el borde del comprobante
       doc.setLineWidth(0.5);
       doc.rect(20, 20, 555, 400);
 
       doc.save('comprobante_pago.pdf');

    }
  

}
