import {
  HttpBackend,
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface RequestOptions {
  headers: HttpHeaders;
  params?: HttpParams;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  protected headers: HttpHeaders;

  constructor(
    public http: HttpClient,
  ) {
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
  }


  public setHeader(headerName: string, headerValue: string | string[]): void {
    this.headers = this.headers.set(headerName, headerValue);
  }

  public getHeaders(): HttpHeaders {
    return this.headers;
  }


  /**
   *
   * @param url
   * @param params
   * @returns
   */
  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  /**
   *
   * @param url
   * @param body
   * @param interceptor
   * @returns
   */
  public post<T>(url: string, body: object): Observable<T> {

    return this.http.post<T>(url, body);
  }


  public put<T>(url: string, body?: object): Observable<T> {
    return this.http.put<T>(url, body);
  }

  /**
   *
   * @param url
   * @param body
   * @param interceptor
   * @returns
   */
  public patch<T>(
    url: string,
    body: object,
  ): Observable<T> {
    return this.http.patch<T>(url, body);
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
