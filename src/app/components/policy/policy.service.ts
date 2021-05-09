import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Policy } from '../policy/policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  baseUrl = "http://localhost:8080/policies";

  constructor(private http: HttpClient) { }

  read(): Observable<Policy[]> {
    return this.http.get<Policy[]>(this.baseUrl);
  }

  create(policy: Policy): Observable<Policy> {
    return this.http.post<Policy>(this.baseUrl, policy);
  }

  readById(id: string): Observable<Policy> {
    const url = `${this.baseUrl}/id/${id}`;
    return this.http.get<Policy>(url);
  }

  readByPolicyNumber(policyNumber: number): Observable<Policy> {
    const url = `${this.baseUrl}/policyNumber/${policyNumber}`;
    return this.http.get<Policy>(url);
  }

  update(policy: Policy): Observable<Policy> {
    const url = `${this.baseUrl}/${policy.id}`;
    return this.http.put<Policy>(url, policy);
  }

  delete(id: string): Observable<Policy> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Policy>(url);
  }

}