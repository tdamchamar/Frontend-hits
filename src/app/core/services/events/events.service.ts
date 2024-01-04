import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../http/http.service';
import { environment } from '../../../../environments/environment';
import { IEvent } from './events.interface';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private path = environment.apiPaths.events;
  constructor(protected httpService: HttpService) {}


  public getEvents(): Observable<IEvent[]> {
    return this.httpService.get<IEvent[]>(`${this.path}`);
  }

}
