import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentNode } from 'graphql';
import { TablePaginationService } from './table-pagination.service';
import { USERS_LIST_QUERY } from '@graphql/operations/query/user';
import { IInfoPage, IResultData } from '@core/interfaces/result-data.interface';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { ACTIVE_FILTERS } from '@core/constants/filter';
import { closeAlert, loadDate } from '@shared/alerts/alerts';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss'],
})
export class TablePaginationComponent implements OnInit {
  @Input() query: DocumentNode = USERS_LIST_QUERY;
  @Input() context: object;
  @Input() itemsPage = 15;
  @Input() include = true;
  @Input() resultData: IResultData;
  @Input() tableColumns: Array<ITableColumns> = undefined;
  @Input() filterActiveValues: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE;
  @Output() manageItem = new EventEmitter<Array<any>>();

  infoPage: IInfoPage;
  data$: Observable<any>;
  loading: boolean;
  countries: any;
  constructor(private service: TablePaginationService) {}

  ngOnInit(): void {
    if (this.query === undefined) {
      throw new Error('query is undifined');
    }
    if (this.resultData === undefined) {
      throw new Error('ResultData is undifined');
    }
    if (this.tableColumns === undefined) {
      throw new Error('Table Columns is undifined');
    }
    this.infoPage = {
      page: 1,
      pages: 1,
      itemsPage: this.itemsPage,
      total: 1,
    };
    this.loadData();
  }
  loadData() {
    this.loading = true;
    loadDate('Cargando datos...', 'Espera un istante...');
    const variables = {
      page: this.infoPage.page,
      itemsPage: this.infoPage.itemsPage,
      include: this.include,
      active: this.filterActiveValues,
    };

    this.data$ = this.service.getCollectionData(this.query, variables, {}).pipe(
      map((result: any) => {
        const data = result[this.resultData.definitionKey];
        this.infoPage.pages = data.info.pages;
        this.infoPage.total = data.info.total;
        this.loading = false;
        closeAlert();

        return data[this.resultData.lisKey];
      })
    );
  }
  changePage() {
    console.log(this.infoPage.page);
    this.loading = true;
  }

  manageAction(action: string, data: any) {
    console.log(action, data);
    this.manageItem.emit([action, data]);
  }
}
