import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../http/http.service';
import { environment } from '../../../../environments/environment';
import { IEvent } from './events.interface';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private eventsPath = environment.apiPaths.events;
  private S3UrlPath = environment.apiPaths.getS3Url;
  private publishChangesPath = environment.apiPaths.publishChanges;
  constructor(protected httpService: HttpService) {}


  public getEvents(): Observable<IEvent[]> {
    return this.httpService.get<IEvent[]>(`${this.eventsPath}`);
  }

  public getS3UrlPath(filename: string, campaignid:string): Observable<any> {
    return this.httpService.get<any>(`${this.S3UrlPath}?filename=${filename}&campaignid=${campaignid}`);
  }

  public uploadFile(file: FormData, url: string): Observable<any> {
    return this.httpService.put<any>(`${url}`, file);
  }

  public publishChanges(json: any): Observable<any> {
    return this.httpService.post<any>(`${this.publishChangesPath}`, json);
  }


}
