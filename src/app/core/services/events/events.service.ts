import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../http/http.service';
import { environment } from '../../../../environments/environment';
import { IEvent } from './events.interface';
import { CreatePresignedUrlResponse } from '../../interfaces/events.interface';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private baseUrl = environment.url;
  constructor(protected httpService: HttpService) {}


  public getEvents(): Observable<IEvent[]> {
    return this.httpService.get<IEvent[]>(`${this.baseUrl}/events`);
  }

  public getS3UrlPath(filename: string, campaignid:string): Observable<CreatePresignedUrlResponse> {
    return this.httpService.get<CreatePresignedUrlResponse>(`${this.baseUrl}/create_presigned_url?filename=${filename}&campaignid=${campaignid}`);
  }

  public uploadFile(formData: FormData, url: string): Observable<any> {
    return this.httpService.post<any>(url, formData);
  }

  public checkFileStatus(filename: string): Observable<any> {
    return this.httpService.get<any>(`${this.baseUrl}/get_response?filename=${filename}`);
  }

  public publishChanges(json: any): Observable<any> {
    return this.httpService.post<any>(`${this.baseUrl}/create_presigned_url/no_matches`, json);
  }


}
