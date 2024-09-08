import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GithubUser } from '../../models/github-user.model';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user!: GithubUser;



}
