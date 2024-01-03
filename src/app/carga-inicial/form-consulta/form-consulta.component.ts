import { Component, NgModule } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-form-consulta',
  templateUrl: './form-consulta.component.html',
  styleUrls: ['./form-consulta.component.css']
})


export class FormConsultaComponent {

  eventSelected: string = '';
  nameEvent: string[] = [];



  onDisplaySearchForm(event: MatAutocompleteSelectedEvent): void {
    this.eventSelected = event.option.viewValue;
  }
}
