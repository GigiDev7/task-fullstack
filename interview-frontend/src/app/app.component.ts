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

  page: number = 1;
  query: string = '';

  handleSearchClick() {
    this.page = 1;
    this.router.navigate([], {
      queryParams: { page: this.page, query: this.query },
    });
  }

  handlePageChange(event: PageEvent) {
    this.router.navigate([], {
      queryParams: { page: event.pageIndex + 1, query: this.query },
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        const query = params['query'] || '';
        const page = params['page'] || 1;
        this.appService.getCities(query, page).subscribe({
          next: (res) => {
            console.log(res);
            this.cities = res.data;
            this.totalPages = res.totalPages;
          },
        });
      },
    });
  }
}
