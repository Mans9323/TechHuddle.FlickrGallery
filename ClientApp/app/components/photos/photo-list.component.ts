import { Component, OnInit } from '@angular/core';
import { PhotoService } from './photo.service'


@Component({
    selector: 'photo-list',
    templateUrl: './photo-list.component.html',
    styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit{
    photos: any[];
    errorMessage: string;
    private flickrBaseUrl = 'https://www.flickr.com/photos/';

    constructor(private photoService: PhotoService) {}

    ngOnInit() { this.getPhotos(); }

    getPhotos() {
        this.photoService.getPhotos()
            .subscribe(
            photos => this.photos = photos.items,
            error => this.errorMessage = <any>error);
    }

    private getAuthorPageUrl(photo) {
        return this.flickrBaseUrl + photo.author_id;
    }
    private getTags(tags) {
        tags = tags.trim().split(' ').slice(0, 10);
        return tags.length > 0 && tags[0] ? tags : ["NONE"];
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
