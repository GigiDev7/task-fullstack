import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from './interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  cities: City[] = [];
  totalPages: number = 0;
  totalCities: number = 0;

  page: number = 1;
  query: string = '';

  handleSearchClick() {
    this.page = 1;
    this.router.navigate([], {
      queryParams: { page: this.page, query: this.query },
    });
  }

  handleClearClick() {
    this.page = 1;
    this.query = '';
    this.router.navigate([], {
      queryParams: { page: this.page, query: this.query },
    });
  }

  handlePageChange(event: PageEvent) {
    this.router.navigate([], {
      queryParams: { page: event.pageIndex + 1, query: this.query },
    });
  }

  trackBy(index: number, el: City) {
    return el.uuid;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        const query = params['query'] || '';
        const page = params['page'] || 1;
        this.query = query;
        this.page = page;
        this.appService.getCities(query, page).subscribe({
          next: (res) => {
            this.cities = res.data;
            this.totalPages = res.totalPages;
            this.totalCities = res.totalCities;
          },
        });
      },
    });
  }
}
