import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Planeacion } from '../pages/dictamen/interfaces/planeacion';
import { ActoDeRevision } from '../pages/dictamen/interfaces/actoDeRevision';
import { RegistroPatronal } from '../pages/dictamen/interfaces/registroPatronal';

@Injectable({
    providedIn: 'root'
})
export class DictamenService {

    private URL = environment.ENDPOINT_DICTAMEN;
    private TOKEN = sessionStorage.getItem('token');
    constructor(
        private http: HttpClient
    ) { }

    public getAllPlaneacion() {
        //agregar en el header el token
       // const headers = { 'Token': `Bearer ${this.TOKEN}` };
        return this.http.get<any[]>(`${this.URL}getAllUsuarios`);
    }
    public getPlaneacion(id: number) {
        const headers = { 'Token': `Bearer ${this.TOKEN}` };
        return this.http.get<Planeacion>(`${this.URL}planeacion/${id}`, { headers });
    }


}

