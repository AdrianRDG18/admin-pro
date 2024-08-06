import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MedicInterface, MedicResponseInterface } from 'src/app/interfaces/medic-response.interface';
import { AlertService } from 'src/app/services/alert.service';
import { CatchErrorService } from 'src/app/services/catch-error.service';
import { ImageModalService } from 'src/app/services/image-modal.service';
import { MedicService } from 'src/app/services/medic.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
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
  private ImageUpdatedEvent: Subscription = new Subscription;

  constructor(private _medicService: MedicService,
              private _swal: AlertService,
              private _catchError: CatchErrorService,
              private _searchService: SearchService,
              private _modalService: ImageModalService,
              public _userSerice: UserService
  ){
    this.getMedics();
  }

  ngOnInit(): void {
    this.ImageUpdatedEvent = this._modalService.imageUpdatedEvent
                                 .subscribe( () => {
                                  if(this.medic_term?.nativeElement.value === '' || undefined){
                                    this.getMedics();
                                  }else{
                                    this.findMedicByTerm(this.medic_term?.nativeElement.value, 1);
                                  }
                                 });
  }

  ngOnDestroy(): void {
    this.ImageUpdatedEvent.unsubscribe();
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

  openModalToUploadImage(medic: MedicInterface){
    if(this._userSerice.user?.role === 'ADMIN_ROLE'){
      this._modalService.openModal(medic, 'medics');
    }
    return;
  }
}
