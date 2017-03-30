import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { AppComponent } from './components/app/app.component'
import { HomeComponent } from './components/home/home.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component'
import { PhotoListComponent } from './components/photos/photo-list.component';
import { PhotoService } from './components/photos/photo.service'
@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        HomeComponent,
        PhotoListComponent,
        NavMenuComponent,
    ],
    providers: [
        PhotoService
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        InfiniteScrollModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'photoStream', component: PhotoListComponent },
            { path: '**', redirectTo: 'home' }
        ]),
    ]
})
export class AppModule {
}
