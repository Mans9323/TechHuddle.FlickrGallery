import { Component, OnInit } from '@angular/core';
import { PhotoService } from './photo.service'
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'photo-list',
    templateUrl: './photo-list.component.html',
    styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
    photos: any[];
    errorMessage: string;
    private flickrBaseUrl = 'https://www.flickr.com/photos/';
    private tags: string;
    private activateInfinityScroll: boolean = false;
    constructor(private photoService: PhotoService) { }

    ngOnInit() { this.getPhotos(); }

    getPhotos(tags=null,addMoreItems=false) {
        this.photoService.getPhotos(tags)
            .subscribe(
            photos => {
                if (addMoreItems) {
                    for (var i = 0; i < photos.items.length; i++) {
                        this.photos.push(photos.items[i])
                    }
                }
                else {
                    this.photos = photos.items;
                }
            },
            error => this.errorMessage = <any>error);
    }

    private getAuthorPageUrl(photo) {
        return this.flickrBaseUrl + photo.author_id;
    }
    private getTags(tags) {
        if (tags) {
            tags = tags.trim().split(' ').slice(0, 25);
            return tags.length > 0 && tags[0] ? tags : ["NONE"];
        }
        return ["None"];
    }
    private searchByTag(tag) {
        this.tags = tag;
        this.getPhotos(tag);
    }
    private clearSearch() {
        this.tags = "";
        this.activateInfinityScroll = false;
        this.getPhotos(null);
    }
    private onScroll() {
        if (this.activateInfinityScroll) {
            this.getPhotos(this.tags, true);
        }
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
