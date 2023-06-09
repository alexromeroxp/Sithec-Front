import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog'
import { CarouselModule } from 'primeng/carousel'
import { ImageModule } from 'primeng/image'
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar'
import { ToolbarModule } from 'primeng/toolbar';
import { ScrollerModule } from 'primeng/scroller';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    NavbarComponent,
  ],
  imports: [
    ServiceWorkerModule.register('./combined-sw.js', { enabled: true}),
    IonicStorageModule.forRoot({
      name: 'pokemonDB',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
    BrowserModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,
    CarouselModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ImageModule,
    MenubarModule,
    ToolbarModule,
    ScrollerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
