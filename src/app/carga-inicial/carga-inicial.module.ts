import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormConsultaComponent } from './form-consulta/form-consulta.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';



@NgModule({
  declarations: [
    FormConsultaComponent
  ],
  imports: [
    MatAutocompleteModule,
    CommonModule
  ]
})
export class CargaInicialModule { }
