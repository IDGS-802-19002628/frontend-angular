import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CorreosRequest, responseDatos } from 'src/app/interfaces/correos';
import { NotificacionesService } from 'src/app/services/notificaciones.services';

export interface DialogData {
  email: string;
  code: string;
  length: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

@Component({
  selector: 'app-email-verification-dialog',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent  implements OnInit {
  public timeLeft: number = 60;
  public resendError: boolean = false;
  public resendSuccess: boolean = false;
  public resendLoading: boolean = false;
  public loading: boolean = false;
  public lstInputs: string[] = [];
  constructor(
    public dialogRef: MatDialogRef<EmailVerificationComponent >,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb : FormBuilder,
    private sharedService: NotificacionesService,
    private snackBar: MatSnackBar
  ) {
    this.dialogRef.disableClose = true;

  }


  public verificationForm = this.fb.group({
    input0: [''],
    input1: [''],
    input2: [''],
    input3: [''],
    input4: [''],
    input5: [''],
    input6: [''],
  });


  ngOnInit(): void {
    for (let i = 0; i < this.data.length; i++) {
      this.lstInputs.push(i.toString());
    }
    this.startTimer();
    this.sendCode(false);
  }
  
  public closeDialog(): void {
    this.dialogRef.close(false);
  }

  public onKeyUp(event: any, index: string): void {

    if (event.target.value) {
      let numero = parseInt(index);
      if (numero < this.data.length - 1) {
        const nextInput = document.getElementById('input' + (numero + 1));
        nextInput?.focus();
  
      } else {
        //hacer que se verifique el código
        console.log('Verificar código');
        this.verifyCode();
      }

    }
  }

  public sendCode(resend?: boolean): void {
    this.loading = true;

    //hacer que se envie el código
    //generamos un código de la cantidad de dígitos que se necesiten usaremos length para eso
    this.data.code = Math.floor(100000 + Math.random() * 900000).toString();
    //cortamos el código a la longitud que se necesita
    this.data.code = this.data.code.substring(0, this.data.length);
    //enviamos el código
    let responseDatos : responseDatos = {
      chrNombre: this.data.nombre,
      chrPaterno: this.data.apellidoPaterno,
      chrMaterno: this.data.apellidoMaterno
    };

    let data : CorreosRequest = {
      data: {
        correo: this.data.email,
        asunto: 'Código de verificación',
        body: `<p>El código de verificación es: <strong>${this.data.code}</strong></p>`,
        response: responseDatos,
        textButton: '',
        url : ''
      }
    };

    //posiblemente se agregaran mas mensajes
    this.sharedService.sendCorreoElectronico(data).subscribe({
      next: (res) => {
        this.loading = false;
        if(resend){
          this.resendSuccess = true;
        }

      },
      error: (err) => {
        this.loading = false;
        if(resend){
          this.resendError = true;
        }
      }
    });


  }

  public resendCode(): void {
    //hacer que se reenvie el código
    //checar si se puede reenviar el código
    this.resendError = false;
    this.resendSuccess = false;

    if (!this.resendLoading && this.timeLeft === 0) {
      this.resendLoading = true;
      this.startTimer();
      this.sendCode(true);
      setTimeout(() => {
        this.resendLoading = false;
      }, 2000);
    }
  }

  public verifyCode(): void {
    //hacer que se verifique el código
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      let codigoIngresado = '';
      for (let i = 0; i < this.data.length; i++) {
        codigoIngresado += this.verificationForm.get('input' + i)?.value;
      }
      if (codigoIngresado === this.data.code) {
        //si es correcto
        this.openSnackBar('Codigo correcto', '🤟🤩');
        this.dialogRef.close(true);
      } else {
        //si es incorrecto
        this.openSnackBar('Codigo incorrecto', '🤯😈');
      }
    }, 2000);

  }

  private startTimer(): void {
    //hacer que inicie el timer
    this.timeLeft = 60;
    setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
    }
    , 1000);


  }

  


private openSnackBar(message: string, action: string): void {
  this.snackBar.open(message, action, {
    duration: 2000,
  });
}



  //hacer que incrementen los inputs

}
