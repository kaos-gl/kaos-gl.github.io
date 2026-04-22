import { Component, ChangeDetectorRef } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates';
import { Certificate } from '../models/certificates/certificates.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-certificates',
  standalone: false,
  templateUrl: './certificates.html',
  styleUrls: ['./certificates.css']
})
export class Certificates { 
  certificatesList: Certificate[] = []; 

  constructor(public certificatesService: CertificatesService, private cdr: ChangeDetectorRef) {
    this.certificatesService.getCertificates().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe((data: any) => {
      this.certificatesList = data; 
      this.cdr.detectChanges();
    });
  }
}
