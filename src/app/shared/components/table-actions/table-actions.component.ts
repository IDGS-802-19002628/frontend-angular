import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styles: []
})
export class TableActionsComponent {
  @Input() public modulo: string = "";
  @Input() public visibleBtnAdd: boolean = true; 
  @Input() public visibleBtnCancel: boolean = false;
  @Input() public visibleBtnExportPDF: boolean = true;
  @Output() private onValue = new EventEmitter<boolean>();
  @Output() private onAddValue = new EventEmitter<boolean>();
  @Output() private onAddUbicacion = new EventEmitter<boolean>();
  @Output() private onCancelar = new EventEmitter<boolean>();
  @Output() private onExportPDF = new EventEmitter<boolean>();
  @Input() public textBotonAdd: string = "Nuevo registro";
  @Input() public textBotonCancel: string = "Cancelar";
  @Input() public textBotonExportPDF: string = "Exportar PDF";

  constructor(){}

  public emitValue(value: boolean): void {
    this.onValue.emit(value);
  }

  public emitAddValue(value: boolean): void {
    this.onAddValue.emit(value);
  }

  public emitAddUbicacion(value:boolean): void {
    this.onAddUbicacion.emit(value);
  }

  public emitCancel(): void {
    this.onCancelar.emit();
  }

  public emitExportPDF(): void {
    this.onExportPDF.emit();
  }


}
