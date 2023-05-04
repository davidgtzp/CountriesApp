import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;
  public isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router,
   ) {  }

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id )),
      )
      .subscribe( country => {
        if ( !country ) return this.router.navigateByUrl('');
        this.country = country;
        this.isLoading = false;
        return this.country;
        //return;
      });

    // this.activatedRoute.params
    //   .subscribe( ( {id} ) => {

    //     this.countriesService.searchCountryByAlphaCode ( id )
    //       .subscribe( country => {
    //         console.log({ country })
    //       });

    //   });

  }
}
