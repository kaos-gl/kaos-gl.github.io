import { Component, ChangeDetectorRef } from '@angular/core';
import { SkillsService } from '../services/skills-service/skills';
import { Skill } from '../models/skills/skills.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class Skills { 
  skillsList: Skill[] = []; 

  constructor(public skillsService: SkillsService, private cdr: ChangeDetectorRef) {
    this.skillsService.getSkills().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe((data: any) => {
      this.skillsList = data; 
      this.cdr.detectChanges();
    });
  }
}
