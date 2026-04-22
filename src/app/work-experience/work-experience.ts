import { Component, ChangeDetectorRef } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience';
import { WorkExperience as WorkExperienceModel } from '../models/work-experience/work-experience.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-work-experience',
  standalone: false,
  templateUrl: './work-experience.html',
  styleUrls: ['./work-experience.css']
})
export class WorkExperience { 
  workExperienceList: WorkExperienceModel[] = []; 

  constructor(public workExperienceService: WorkExperienceService, private cdr: ChangeDetectorRef) {
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe((data: any) => {
      this.workExperienceList = data; 
      this.cdr.detectChanges();
    });
  }
}
