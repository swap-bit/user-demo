import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL: string = 'http://localhost:3000/';
  editUserId = signal<string>('');

  constructor(
    private http: HttpClient,
  ) { }


  webServiceCall(endpoint:any, inputFields:any, componentName:String, methodName:String, methodType:String) {

    if (methodType == 'GET') {
      return this.http.get<any>(this.baseURL + endpoint)
    } else if (methodType == 'POST') {
      return this.http.post(this.baseURL + endpoint, inputFields)
    } else if (methodType == 'PUT') {
      return this.http.put(this.baseURL + endpoint, inputFields)
    } else {
      return this.http.delete(this.baseURL + endpoint, inputFields)
    }
  }

}
