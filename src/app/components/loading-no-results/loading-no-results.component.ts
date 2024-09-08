import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-loading-no-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-no-results.component.html',
  styleUrls: ['./loading-no-results.component.css']
})
export class LoadingNoResultsComponent{
  @Input() loading: boolean = false;
  @Input() noResults: boolean = false;

}
