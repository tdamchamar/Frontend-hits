import {Component} from '@angular/core';
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


/**
 * @title Stepper responsive
 */

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
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
      formData.append('filename', this.uploadFileFormGroup.controls.filename?.value as unknown as Blob);
      this.eventsService.uploadFile(formData, res).subscribe((res) => {
        console.log(res);
      });
    });

    return true;
  }
}
