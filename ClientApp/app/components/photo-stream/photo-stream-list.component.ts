import { Component, OnInit } from '@angular/core';
import { PhotoStreamService } from './photo-stream.service'


@Component({
    selector: 'photo-stream',
    templateUrl: './photo-stream-list.component.html'
})
export class PhotoStreamListComponent implements OnInit{
    images: any[];
    errorMessage: string;

    constructor(private photoStreamService: PhotoStreamService) {}

    ngOnInit() { this.getPhotos(); }

    getPhotos() {
        this.photoStreamService.getPhotos()
            .subscribe(
            images => this.images = images.items,
            error => this.errorMessage = <any>error);
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
