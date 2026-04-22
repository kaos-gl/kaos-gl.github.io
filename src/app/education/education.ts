import { Component, ChangeDetectorRef } from '@angular/core';
import { EducationService } from '../services/education-service/education';
import { Education as EducationModel } from '../models/education/education.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-education',
  standalone: false,
  templateUrl: './education.html',
  styleUrls: ['./education.css']
})
export class Education { 
  educationList: EducationModel[] = []; 

  constructor(public educationService: EducationService, private cdr: ChangeDetectorRef) {
    this.educationService.getEducation().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe((data: any) => {
      this.educationList = data; 
      this.cdr.detectChanges();
    });
  }
}
