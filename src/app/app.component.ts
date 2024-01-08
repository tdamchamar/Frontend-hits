import {Component, ViewChild} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AsyncPipe, CommonModule} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { EventsService } from './core/services/events/events.service';
import { IEvent } from './core/services/events/events.interface';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {PageEvent } from '@angular/material/paginator';


/**
 * @title Stepper responsive
 */

//Interface del componente 'Table' para step 3

export interface PeriodicElement {
  firstname: string;
  lastname: string;
  email: string;
  account: string;
  jobtitle: string;
  fase: string;
  'CRM match': string;
}

const ELEMENT_DATA: PeriodicElement[] = [];



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  dataSource: PeriodicElement[] = [];
  isLoadingTable = true;
  totalItems: number = 10;  // Ajusta esto según tus necesidades
  itemsPorPagina: number = 10; // Ajusta esto según tus necesidades
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Coloca esto dentro de la clase
  cambiarPagina(evento: PageEvent) {
    // Actualiza la página actual y el tamaño de página
    const paginaActual = evento.pageIndex;
    const tamañoPagina = evento.pageSize;
  
    // Aquí debes implementar la lógica para obtener los datos de la nueva página.
    // Esto puede implicar solicitar nuevos datos a un servicio con los parámetros actualizados.
  }
  

  public eventsArray: string[] = [''];
  searchEventFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
  });
  uploadFileFormGroup = this._formBuilder.group({
    filename: [null, Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;
  events: IEvent[] = [];
  filteredEvents: Observable<IEvent[]> = of([]);



  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private eventsService: EventsService
  ) {
    this.eventsService.getEvents().subscribe((events: IEvent[]) => {
      this.events = events;
    })
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));


  }

  ngOnInit() {
    this.filteredEvents = this.searchEventFormGroup.controls.name.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): IEvent[] {
    const filterValue = value.toLowerCase();

    return this.events.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onFileChange($event: Event) {
    const target = $event?.target as HTMLInputElement;
    this.uploadFileFormGroup.patchValue({filename: target?.files?.[0] as any});
  }

  getFileName() {
    return (this.uploadFileFormGroup.get('filename')?.value as any)?.name;
  }
  openFileInput() {
    const fileInput = document.querySelector('input[type=file]') as HTMLInputElement;
    fileInput?.click();
  }

  getS3Url() {
    const filename = (this.uploadFileFormGroup.controls.filename.value as any)?.name;
    const campaignid = this.searchEventFormGroup.controls.name.value || '';
    this.eventsService.getS3UrlPath(filename, campaignid).subscribe((res) => {
      const formData = new FormData();

      formData.append('key', res.fields.key);
      formData.append('AWSAccessKeyId', res.fields.AWSAccessKeyId);
      formData.append('policy', res.fields.policy);
      formData.append('signature', res.fields.signature);
      formData.append('x-amz-security-token', res.fields['x-amz-security-token']);
      formData.append('file', this.uploadFileFormGroup.controls.filename?.value as unknown as Blob);

      this.eventsService.uploadFile(formData, res.url).subscribe({
        next: (res) => {
        console.log(res);

        console.log('para probar el endpoint envio los mismos datos que obtuve del get');
        this.eventsService.checkFileStatus('coincidencias').subscribe({
          next: (res) => {
            console.log(res);
            const parsedJson = JSON.parse(res);
            console.log(parsedJson.valorDeseado);
            this.dataSource = parsedJson.results;
            this.isLoadingTable = false;
          },
          error: (err) => {
            console.log(err);
            this.isLoadingTable = false;
          },
        })
      },
      error: (err) => {
      },
    });
    });

    return true;

    
  }
  
  
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'account', 'jobtitle', 'fase', 'CRM match'];
 
  
  }
  
 
