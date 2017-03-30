import { Injectable } from '@angular/core';
import { Jsonp, Response, URLSearchParams  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class PhotoService {
    private imageServiceURL = 'https://api.flickr.com/services/feeds/photos_public.gne';  // URL to web API

    constructor(private jsonp: Jsonp) { }

    getPhotos(tags = undefined): Observable<any> {
        let params = new URLSearchParams();
        params.set('jsoncallback', 'JSONP_CALLBACK');
        params.set('tagmode', 'any');
        params.set('format', 'json');
        if (tags) {
            params.set('tags', tags);
        }
        return this.jsonp
            .get(this.imageServiceURL, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: any) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}