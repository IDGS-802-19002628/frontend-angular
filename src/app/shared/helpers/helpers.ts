interface Month {
    month: string;
    value: string;
}

interface Day {
    day: string;
    value: string;
}

export const getDateHours = (): string[] => {
    const date = new Date();
    const dateFormateada = date.toLocaleDateString('es-ES', { day:"numeric", year:"numeric", month:"short"}).split(' ');
    if(Number(dateFormateada[0]) < 10) dateFormateada[0] = `0${dateFormateada[0]}`;
    const fecha = `${dateFormateada[0]} ${dateFormateada[1]} ${dateFormateada[2]}`;
    const hours = `${ date.getHours()}:${ date.getMinutes()}:${ date.getSeconds()}`;
    const listFecha = date.toLocaleDateString('es-ES', { day:"numeric", year:"numeric", month:"numeric"}).split('/');
    if(Number(listFecha[1]) < 10) listFecha[1] = `0${listFecha[1]}`;
    if(Number(listFecha[0]) < 10) listFecha[0] = `0${listFecha[0]}`;
    const fechaFormateada = `${listFecha[2]}-${listFecha[1]}-${listFecha[0]}`;

    return [fecha, hours, fechaFormateada];
}

export const getYears = (): string[] => {
    const date = new Date();
    const years: string[] = [];
    let year = date.getFullYear() + 1;

    while (year >= 2024) {
        years.push(year.toString());
        year--;
    }

    return years;
}

export const getMonths = (): Month[] => {
    return [
        {month:'Enero', value: '01'},
        {month:'Febrero', value: '02'},
        {month:'Marzo', value: '03'},
        {month:'Abril', value: '04'},
        {month:'Mayo', value: '05'},
        {month:'Junio', value: '06'},
        {month:'Julio', value: '07'},
        {month:'Agosto', value: '08'},
        {month:'Septiembre', value: '09'},
        {month:'Octubre', value: '10'},
        {month:'Noviembre', value: '11'},
        {month:'Diciembre', value: '12'},
    ];  
}

export const convertirANumerosEnPalabras = (numero: number): string => {
    const unidades: string[] = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const especiales: string[] = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const decenas: string[] = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const centenas: string[] = ['cero', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    if (numero === 0) {
        return unidades[numero];
    }

    let palabras = '';

    if (numero >= 10000) {
        palabras += convertirANumerosEnPalabras(Math.floor(numero / 1000)) + ' mil ';
        numero %= 1000;
    }

    if (numero >= 100) {
        palabras += centenas[Math.floor(numero / 100)] + ' ';
        numero %= 100;
    }

    if (numero >= 20) {
        palabras += decenas[Math.floor(numero / 10)] + ' ';
        numero %= 10;
        if (numero > 0) {
            palabras += 'y ';
        }
    } else if (numero >= 10) {
        palabras += especiales[numero - 10] + ' ';
        numero = 0;
    }

    if (numero > 0) {
        palabras += unidades[numero];
    }
    return palabras.trim().toUpperCase();
}

export const convertirMesEnLetras = (mes: any): string => {
    
    switch (mes) {
        case 1:
            return 'Enero';
        case 2:
            return 'Febrero';
        case 3:
            return 'Marzo';
        case 4:
            return 'Abril';
        case 5:
            return 'Mayo';
        case 6:
            return 'Junio';
        case 7:
            return 'Julio';
        case 8:
            return 'Agosto';
        case 9:
            return 'Septiembre';
        case 10:
            return 'Octubre';
        case 11:
            return 'Noviembre';
        case 12:
            return 'Diciembre';
        default:
            return '';
            
    }

}

export const terminosInscripcion = (): string => {
    let terminos = `HAGO CONSTAR QUE TODOS LOS DATOS CONTENIDOS EN ESTA SOLICITUD SON VERDADEROS.
    DESPUÉS DE HABER RECIBIDO EL REGLAMENTO INTERNO, LAS POLÍTICAS DEL ESTUDIANTE Y LAS POLÍTICAS DE PAGO DE LA UNIVERSIDAD HUMANI MUNDIAL, LAS CUALES FUERON ENTREGADAS PREVIAMENTE, ME COMPROMETO A LEERLAS Y SEGUIR ESTRICTAMENTE CON TODO LO QUE EN ELLAS SE ESTIPULA ACEPTANDO INCONDICIONALMENTE EL PROCESO EDUCATIVO, NORMAS Y PRINCIPIOS DE ESTA INSTITUCIÓN.
    ACEPTO QUE MI INSCRIPCIÓN QUEDA CONDICIONADA A LA ENTREGA DE LA DOCUMENTACIÓN ORIGINAL QUE SE ME SOLICITA, PARA LO CUAL DISPONGO DE UN PLAZO DE 60 DÍAS HÁBILES A PARTIR DE LA FECHA DE INICIO DEL PRIMER CUATRIMESTRE, YA QUE DE LO CONTRARIO CAUSARÁ BAJA DE LA INSTITUCIÓN.`;
    return terminos;
}

export const logoEmpresa = 'src/app/shared/img/logo.png';

  export const sexosConst = [ 
    { value: 'masculino', viewValue: 'Masculino' },
    { value: 'femenino', viewValue: 'Femenino' },
  ];

    export const tipoSangreConst = [
        { value: 'O-', viewValue: 'O-' },
        { value: 'O+', viewValue: 'O+' },
        { value: 'A-', viewValue: 'A-' },
        { value: 'A+', viewValue: 'A+' },
        { value: 'B-', viewValue: 'B-' },
        { value: 'B+', viewValue: 'B+' },
        { value: 'AB-', viewValue: 'AB-' },
        { value: 'AB+', viewValue: 'AB+' },
    ];

    export const estadosCivilesConst = [
        { value: 'soltero', viewValue: 'Soltero' },
        { value: 'casado', viewValue: 'Casado' },
        { value: 'divorciado', viewValue: 'Divorciado' },
        { value: 'viudo', viewValue: 'Viudo' },
    ];

    export const dondeVivesConst = [ 
        { value: 'Solo(a)', viewValue: 'Solo(a)' },
        { value: 'Roomie', viewValue: 'Roomie' },
        { value: 'Parientes(Abuelos, tíos, primos, etc.)', viewValue: 'Parientes(Abuelos, tíos, primos, etc.)' },
        { value: 'Padres de familia', viewValue: 'Padres de familia' },
        { value: 'Familia propia', viewValue: 'Familia propia' },
        { value: 'Pareja', viewValue: 'Pareja' },
    ];

    export const discapacidadesConst = [
        { value: 'auditiva', viewValue: 'Auditiva' },
        { value: 'motriz', viewValue: 'Motriz' },
        { value: 'visual', viewValue: 'Visual' },
        { value: 'intelectual', viewValue: 'Intelectual' },
        { value: 'ninguna', viewValue: 'Ninguna' },
    ];

    export const tipoBecaConst = [
        { value: 'alimentaria', viewValue: 'Alimentaria' },
        { value: 'deportiva', viewValue: 'Deportiva' },
        { value: 'economica', viewValue: 'Economica' },
        { value: 'excelencia academica', viewValue: 'Excelencia Académica' },
        { value: 'otra', viewValue: 'Otra' },
    ];

    export const modalidadEstudioConst = [
        { value: 'virtual', viewValue: 'Virtual' },
        { value: 'mixta', viewValue: 'Mixta' },
        { value: 'presencial', viewValue: 'Presencial (Escolarizada)' },
        { value: 'ceneval', viewValue: 'Examen General CENEVAL' },
        { value: 'otro', viewValue: 'Otro' },
    ];

    export const licenciaturasConst = [
        { value: 'Tecnologías de la Información', viewValue: 'Tecnologías de la Información' },
        { value: 'Derecho', viewValue: 'Derecho' },
        { value: 'Logística y Negocios Internacionales', viewValue: 'Logística y Negocios Internacionales' },
        { value: 'Nutrición', viewValue: 'Nutrición' },
        { value: 'Pedagogía', viewValue: 'Pedagogía' },
        { value: 'Psicología', viewValue: 'Psicología' },
        { value: 'Criminología', viewValue: 'Criminología' },
        { value: 'Gerontología', viewValue: 'Gerontología' },
    ];


    export const horariosConst = [
        { value: 'Matutino', viewValue: 'Matutino (7:00 a.m. a 10:00 a.m. de lunes a viernes)' },
        { value: 'Nocturno', viewValue: 'Nocturno (6:30 p.m. a 9:00 p.m. de lunes a viernes)' },
    ];

    export const comoConocioConst = [
        { value: 'Facebook', viewValue: 'Facebook' },
        { value: 'Instagram', viewValue: 'Instagram' },
        { value: 'Página Web', viewValue: 'Página Web' },
        { value: 'TikTok', viewValue: 'TikTok' },
        { value: 'Espectaculares', viewValue: 'Espectaculares' },
        { value: 'Anuncio de Autobuses', viewValue: 'Anuncio de Autobuses' },
        { value: 'Póster o Lonas', viewValue: 'Póster o Lonas' },
        { value: 'Periódico', viewValue: 'Periódico' },
        { value: 'Por ubicación del Plantel', viewValue: 'Por ubicación del Plantel' },
        { value: 'Estudiante Humani', viewValue: 'Estudiante Humani' },
        { value: 'Amigo(a)', viewValue: 'Amigo(a)' },
        { value: 'Familiar', viewValue: 'Familiar' },
        { value: 'Docente', viewValue: 'Docente' },
        { value: 'Administrativo Humani', viewValue: 'Administrativo Humani' },
        { value: 'Feria Profesiográfica', viewValue: 'Feria Profesiográfica' },
        { value: 'Open House (Humani)', viewValue: 'Open House (Humani)' },
        { value: 'Visita a tu escuela', viewValue: 'Visita a tu escuela' },
        { value: 'Llegaste solo(a) a las Instalaciones', viewValue: 'Llegaste solo(a) a las Instalaciones' },
        { value: 'Otro', viewValue: 'Otro' },
    ];

    export const tiposCitasConst = [
        { value: 'asesoria', viewValue: 'Asesoría' },
        { value: 'entrevista', viewValue: 'Entrevista' },
        { value: 'nutricion', viewValue: 'Nutrición' },
        { value: 'psicologia', viewValue: 'Psicología' },
        { value: 'orientacion', viewValue: 'Orientación' },
        { value: 'otro', viewValue: 'Otro' },
    ];

    export const estatusCitas = [
        { value: 'pendiente', viewValue: 'Pendiente' },
        { value: 'atendida', viewValue: 'Atendida' },
        { value: 'cancelada', viewValue: 'Cancelada' },
        { value: 'aceptada', viewValue: 'Aceptada' },
        { value: 'rechazada', viewValue: 'Rechazada' },
        
    ];



//funcion para sanitizar mensaje de error de MySQL y errores comunes de SQL
/*SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry 'flaviourdiales@gmail.com' for key 'chrCorreoElectronico'*/
export const sanitizeMessage = (message: string): string => {
    if(message.includes('SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry')){
        return 'El correo electrónico ya se encuentra registrado';
    } else if(message.includes('SQLSTATE[23000]: Integrity constraint violation: 1048 Column')){
        return 'El campo no puede estar vacío';
    } else if(message.includes('SQLSTATE[23000]: Integrity constraint violation: 1452 Cannot add or update a child row: a foreign key constraint fails')){
        return 'El registro no puede ser eliminado porque tiene registros relacionados';
    } else if(message.includes('SQLSTATE[23000]: Integrity constraint violation: 1451 Cannot delete or update a parent row: a foreign key constraint fails')){
        return 'El registro no puede ser eliminado porque tiene registros relacionados';
    } else {
        return `Ocurrió un error inesperado: ${message} favor de levantar un ticket de soporte`;
    } 

}


export const validateDateMenorOrMayor = (fechaInicial: string, fechaFinal: string, tipo: string): boolean => {
    const fechaInicio = new Date(fechaInicial);
    const fechaFin = new Date(fechaFinal);
    let response = tipo.toLowerCase() === 'menor' ? fechaInicio < fechaFin : fechaInicio > fechaFin;
    return response;
}

export  const getMonthNumber = (month: string): string => {
    switch (month) {
        case 'enero':
            return '01';
        case 'febrero':
            return '02';
        case 'marzo':
            return '03';
        case 'abril':
            return '04';
        case 'mayo':
            return '05';
        case 'junio':
            return '06';
        case 'julio':
            return '07';
        case 'agosto':
            return '08';
        case 'septiembre':
            return '09';
        case 'octubre':
            return '10';
        case 'noviembre':
            return '11';
        case 'diciembre':
            return '12';
        default:
            return '';
    }
}

    export const getDias = (): Day[] => {
        return [
            {day:'1', value: '01'},
            {day:'2', value: '02'},
            {day:'3', value: '03'},
            {day:'4', value: '04'},
            {day:'5', value: '05'},
            {day:'6', value: '06'},
            {day:'7', value: '07'},
            {day:'8', value: '08'},
            {day:'9', value: '09'},
            {day:'10', value: '10'},
            {day:'11', value: '11'},
            {day:'12', value: '12'},
            {day:'13', value: '13'},
            {day:'14', value: '14'},
            {day:'15', value: '15'},
            {day:'16', value: '16'},
            {day:'17', value: '17'},
            {day:'18', value: '18'},
            {day:'19', value: '19'},
            {day:'20', value: '20'},
            {day:'21', value: '21'},
            {day:'22', value: '22'},
            {day:'23', value: '23'},
            {day:'24', value: '24'},
            {day:'25', value: '25'},
            {day:'26', value: '26'},
            {day:'27', value: '27'},
            {day:'28', value: '28'},
            {day:'29', value: '29'},
            {day:'30', value: '30'},
            {day:'31', value: '31'},

            
            



        ];  
    }






