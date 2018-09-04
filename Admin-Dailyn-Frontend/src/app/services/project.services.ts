import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions, Jsonp } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { GLOBAL } from './global'
import { Project } from '../models/project'

@Injectable()
export class ProjectService {
    public url: string

    constructor(private _http: Http) {
        this.url = GLOBAL.url
    }

    getProjects(token: string) {
        // return 'Texto desde el servicio'
        let headers = new Headers({
            'Content-Type': 'application/json',
            'authorization': token
        })

        return this._http.get(this.url + 'project/listProject', { headers: headers }).map(res => res.json())
    }

    registerProject(token: string, saveProject: Project) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'authorization': token
        })
        let params = JSON.stringify(saveProject)

        return this._http.post(this.url + 'project/registerProject', params, { headers: headers }).map(res => res.json())
    }
    
    updateProject(token: string, updateProject: Project){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'authorization': token
        })
        let params = JSON.stringify(updateProject)

        return this._http.put(this.url + 'project/updateProject', params, { headers: headers }).map(res => res.json())
    }
}