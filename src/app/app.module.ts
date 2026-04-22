import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Tus rutas exactas sin ".component"
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './header/header';
import { WorkExperience } from './work-experience/work-experience';
import { Education } from './education/education';
import { Languages } from './languages/languages';
import { Skills } from './skills/skills';
import { Certificates } from './certificates/certificates';
import { Interests } from './interests/interests';

// Importaciones de Firebase
import { AngularFireModule } from '@angular/fire/compat'; 
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    App,
    Header,
    WorkExperience,
    Education,
    Languages,
    Skills,
    Certificates,
    Interests
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
