import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class News {
    data: any;
    host: any;

    constructor(private http: Http) {
        // this.host = 'http://192.168.8.101:3000/api';
        this.host = 'https://khmergoo.com/api';
    }

    get(website = '', page = 1) {
        return new Promise(resolve => {
            let headers = new Headers({
                'Content-Type': 'application/json',
                'authorization': '04;oCMQmit>Q8_LxYg4<BS6x%8eX$F7z4d1cl:a0h5CIr9Q!}a2O+6W@Ho5dM@'
            });
            let options = new RequestOptions({ headers: headers });
            let body = {
                appName: 'khmernews'
            };
            let reqPage = page == 1 ? '?page=1' : '?page=' + page;
            this.http.post(this.host + '/' + website + reqPage, body, options)
            .subscribe(data => {
                resolve(data.json());
            }, error => {
                console.log("Oooops!");
            });
        });
    }

    findOne(id) {
        return new Promise(resolve => {
            let headers = new Headers({
                'Content-Type': 'application/json',
                'authorization': '04;oCMQmit>Q8_LxYg4<BS6x%8eX$F7z4d1cl:a0h5CIr9Q!}a2O+6W@Ho5dM@'
            });
            let options = new RequestOptions({ headers: headers });
            let body = {};
            this.http.post(this.host + '/news/' + id, body, options)
            .subscribe(data => {
                resolve(data.json());
            }, error => {
                console.log("Oooops!");
            });
        });
    }
}

