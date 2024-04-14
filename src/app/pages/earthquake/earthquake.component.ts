import { Component, OnDestroy } from '@angular/core';
import { Feature } from 'src/app/models/feature.model';
import { Pagination } from 'src/app/models/pagination.model';
import { FeatureService } from 'src/app/services/feature.service';
import { Subscription } from 'rxjs';
import { calculateMagnitudeColor, convertMagnitudeType } from 'src/app/utils';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-earthquake',
  templateUrl: './earthquake.component.html',
  styleUrls: ['./earthquake.component.css'],
})
export class EarthquakeComponent implements OnDestroy {
  subscription!: Subscription;
  listFeatures: Feature[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  perPage: number = 20;
  totalFeatures: number = 0;
  selectedValues: string[] = [];
  urlFilters: string = '';
  isError: boolean = false;
  messageError: string = '';


  constructor(
    private featureSrv: FeatureService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.currentPage = Math.max(
      this.activatedRouter.snapshot.params['id'],
      this.featureSrv.currentPage
    );
    this.perPage = this.featureSrv.perPage || 20;
    
    this.subscription = this.getListFeatures();
  }

  getListFeatures(): Subscription {
    return this.featureSrv
      .listFeatures(this.currentPage, this.perPage, this.urlFilters)
      .subscribe(
        (data) => {
          this.listFeatures = data?.data?.map((feature: any) => {
            const { external_id, mag_type, ...attributes } =
              feature?.attributes;
            const { external_url } = feature?.links;
            const newFeature: Feature = {
              ...feature,
              attributes: {
                ...attributes,
                externalId: external_id,
                magType: mag_type,
              },
              links: {
                externalUrl: external_url,
              },
            };
            return newFeature;
          });

          const { per_page, total_pages, total } = data?.pagination;
          this.totalPages = total_pages;
          this.perPage = per_page;
          this.totalFeatures = total;
          this.isError = false;
        },
        (error) => {
          this.isError = true;
          this.totalFeatures = 0;
          this.listFeatures = [];
          this.totalPages = 0;
          this.messageError = error.error.message;
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  convertMagnitudeType(magType: string = '') {
    return convertMagnitudeType(magType);
  }

  calculateMagnitudeColor(magnitude: number): string {
    return calculateMagnitudeColor(magnitude);
  }

  previousPage() {
    if (this.currentPage <= 1) {
      return;
    }
    this.currentPage--;
    this.changeCurrentPage();
  }
  nextPage() {
    if (this.currentPage >= this.totalPages) {
      return;
    }
    this.currentPage++;
    this.changeCurrentPage();

    // this.router.navigate()
  }
  changeCurrentPage() {
    this.featureSrv.currentPage = this.currentPage;
    this.router.navigate([`/earthquake/pages/${this.currentPage}`]);
    this.subscription = this.getListFeatures();
  }
  changePerPage() {
    if (
      this.perPage * this.totalPages > this.totalFeatures &&
      this.currentPage >= this.totalPages
    ) {
      return;
    }
    this.featureSrv.perPage = this.perPage;
    this.subscription = this.getListFeatures();
  }

  onCheckboxChange(event: any, value: string) {
    if (event.target.checked) {
      // Agregar el valor al arreglo si el checkbox está marcado
      this.selectedValues.push(value);
    } else {
      // Quitar el valor del arreglo si el checkbox está desmarcado
      const index = this.selectedValues.indexOf(value);
      if (index !== -1) {
        this.selectedValues.splice(index, 1);
      }
    }
    this.featureSrv.selectedValues = this.selectedValues;
    this.urlFilters = '';
    this.selectedValues.map((value) => {
      this.urlFilters += `&filters[mag_type][]=${value}`;
    });
    this.subscription = this.getListFeatures();
  }

  resultModeDark() : boolean {
    return this.featureSrv.modeDark
  }
}
