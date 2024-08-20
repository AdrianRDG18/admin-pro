import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HospitalInterface } from 'src/app/interfaces/hospital-response.interface';
import { Medic } from 'src/app/interfaces/medic-response.interface';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert.service';
import { CatchErrorService } from 'src/app/services/catch-error.service';
import { SearchService } from 'src/app/services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  public users: User[] = [];
  public medics: Medic[] = [];
  public hospitals: HospitalInterface[] = [];
  public term: string = '';

  constructor(private _activatedRoute: ActivatedRoute,
              private _swal: AlertService,
              private _catchError: CatchErrorService,
              private _searchService: SearchService
  ){
    this._activatedRoute.params.subscribe(({term}) =>{
      this.term = term;
      this.searchAllByTerm(term);
    })
  }

  searchAllByTerm(term: string){
    this._swal.swalProcessingRequest();
    Swal.showLoading();
    this._searchService.searchAllByTerm(term)
        .subscribe({
          next: (resp: any) => {
            this.users = resp.users;
            this.medics = resp.medics;
            this.hospitals = resp.hospitals;
          }, error: (error) => {
            console.log(error);
            this._catchError.scaleError('Something went wrong on searchAllByTerm', error);
          }, complete: () => Swal.close()
        });
  }

}
