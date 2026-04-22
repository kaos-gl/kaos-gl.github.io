import { Component, ChangeDetectorRef } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests';
import { Interest } from '../models/interests/interests.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-interests',
  standalone: false,
  templateUrl: './interests.html',
  styleUrls: ['./interests.css']
})
export class Interests { 
  interestsList: Interest[] = []; 

  constructor(public interestsService: InterestsService, private cdr: ChangeDetectorRef) {
    this.interestsService.getInterests().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe((data: any) => {
      this.interestsList = data; 
      this.cdr.detectChanges();
    });
  }
}
