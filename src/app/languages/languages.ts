import { Component, ChangeDetectorRef } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages';
import { Language } from '../models/languages/languages.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-languages',
  standalone: false,
  templateUrl: './languages.html',
  styleUrls: ['./languages.css']
})
export class Languages { 
  languagesList: Language[] = []; 

  constructor(public languagesService: LanguagesService, private cdr: ChangeDetectorRef) {
    this.languagesService.getLanguages().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe((data: any) => {
      this.languagesList = data; 
      this.cdr.detectChanges();
    });
  }
}
