import { Component, ChangeDetectorRef } from '@angular/core';
import { HeaderService } from '../services/header-service/header';
import { Header as HeaderModel } from '../models/header/header.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header { 
  header: HeaderModel = new HeaderModel();

  constructor(public headerService: HeaderService, private cdr: ChangeDetectorRef) {
    this.headerService.getHeader().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe((data: any) => {
      if (data && data.length > 0) {
        this.header = data[0]; 
        this.cdr.detectChanges();
      }
    });
  }
}
