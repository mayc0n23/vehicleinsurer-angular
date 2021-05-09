import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = "http://localhost:8080/clients";

  constructor(private http: HttpClient) { }
  
  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, client);
  }

  read(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl);
  }

  readById(id: string): Observable<Client> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Client>(url);
  }

  update(client: Client): Observable<Client> {
    const url = `${this.baseUrl}/${client.id}`;
    return this.http.put<Client>(url, client);
  }

  delete(id: string): Observable<Client> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Client>(url);
  }

}