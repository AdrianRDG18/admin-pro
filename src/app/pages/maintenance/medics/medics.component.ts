import { Component, ElementRef, ViewChild } from '@angular/core';
import { MedicResponseInterface } from 'src/app/interfaces/medic-response.interface';
import { AlertService } from 'src/app/services/alert.service';
import { CatchErrorService } from 'src/app/services/catch-error.service';
import { MedicService } from 'src/app/services/medic.service';
import { SearchService } from 'src/app/services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styles: [
  ]
})
export class MedicsComponent {

  public response!: MedicResponseInterface;
  public limit: number = 10;
  public loading: boolean = false;
  @ViewChild('medic_term') medic_term?: ElementRef;

  constructor(private _medicService: MedicService,
              private _swal: AlertService,
              private _catchError: CatchErrorService,
              private _searchService: SearchService
  ){
    this.getMedics();
  }

  getMedics(page: number = 1){
    this._swal.swalProcessingRequest();
    Swal.showLoading();
    this._medicService.getMedics(page, this.limit)
        .subscribe({
          next: (resp: MedicResponseInterface) => {
            this.response = resp;
            console.log(resp.docs);
          }, error: (error) => {
            console.log(error);
            this._catchError.scaleError('Something went wrong on getMedics', error);
          }, complete: () => Swal.close()
        });
  }

  findMedicByTerm(term: string, page: number = 1){
    if(term !== '' || undefined){
      this.loading = true;
      this._searchService.searchByTerm('medics', term, page, this.limit)
          .subscribe({
            next: (resp: any) => {
              this.response = resp;
            }, error: (error) => {
              console.log(error);
              this._catchError.scaleError('Something went wrong on findMedicByTerm', error);
            }, complete: () => this.loading = false
          });
    }else{
      this.getMedics();
    }
  }

  changeLimit(){
    if(this.medic_term?.nativeElement.value === '' || undefined){
      this.getMedics()
    }else{
      this.findMedicByTerm(this.medic_term?.nativeElement.value)
    }
  }

  changePage(page: number = 1){
    if(this.medic_term?.nativeElement.value === '' || undefined){
      this.getMedics(page)
    }else{
      this.findMedicByTerm(this.medic_term?.nativeElement.value, page)
    }
  }

}
