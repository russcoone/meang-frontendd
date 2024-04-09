import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker-legal-age',
  templateUrl: './date-picker-legal-age.component.html',
  styleUrls: ['./date-picker-legal-age.component.scss'],
})
export class DatePickerLegalAgeComponent implements OnInit {
  CURRENDAY = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  minDate: NgbDateStruct = {
    year: this.CURRENDAY.year - 100,
    month: this.CURRENDAY.month,
    day: this.CURRENDAY.day,
  };
  maxDate: NgbDateStruct = {
    year: this.CURRENDAY.year - 18,
    month: this.CURRENDAY.month,
    day: this.CURRENDAY.day,
  };
  model: NgbDateStruct = this.maxDate;

  // maxDate: NgbDateStruct;
  @Output() newDate = new EventEmitter<NgbDateStruct>();

  constructor() {}

  ngOnInit(): void {}
  selectDateChange() {
    console.log(this.model);
    this.newDate.emit(this.model);
  }
}
