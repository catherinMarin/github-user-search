import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GithubService } from '../../services/github/github.service';
import { GithubSearchResponse } from '../../models/github-search-response.model';
import { GithubUser } from '../../models/github-user.model';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { LoadingNoResultsComponent } from '../../components/loading-no-results/loading-no-results.component';
import { PopupComponent } from '../../components/popup/popup.component';
import { GithubRepo } from '../../models/github-repo.model';
import { finalize, tap } from 'rxjs/operators'; // Importamos operadores de RxJS

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UserCardComponent, LoadingNoResultsComponent, PopupComponent],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
  searchForm: FormGroup;
  users: GithubUser[] = [];
  pagedUsers: GithubUser[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  searchSubmitted = false;
  loadingUsers = false;
  loadingRepos = false;
  selectedUserRepos: GithubRepo[] = [];
  isPopupVisible = false;
  selectedUserName: string = '';

  constructor(private fb: FormBuilder, private githubService: GithubService) {
    this.searchForm = this.fb.group({
      searchTerm: ['', [Validators.minLength(4), this.forbiddenTermValidator('flowww')]]
    });

    // Limpiar los usuarios si el input está vacío
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(value => {
      if (value === '') {
        this.clearUsers();
      }
    });
  }

  get searchTerm() {
    return this.searchForm.get('searchTerm');
  }

  searchUsers(): void {
    if (!this.searchForm.valid) return;

    this.searchSubmitted = true;
    this.loadingUsers = true;

    this.githubService.searchUsers(this.searchTerm?.value, this.currentPage).pipe(
      tap((response: GithubSearchResponse) => {
        this.users = response.items;
        this.pagedUsers = response.items;
        this.totalPages = Math.ceil(response.total_count / 10);
        this.users.forEach(user => this.loadUserFollowers(user));
      }),
      finalize(() => this.loadingUsers = false) // Finalizar el estado de carga
    ).subscribe({
      error: (err) => this.handleError(err, 'searchUsers')
    });
  }

  openPopupWithRepos(username: string): void {
    this.loadingRepos = true;

    this.githubService.getUserRepos(username).pipe(
      tap((repos) => {
        this.selectedUserRepos = repos;
        this.selectedUserName = username;
        this.isPopupVisible = true;
      }),
      finalize(() => this.loadingRepos = false)
    ).subscribe({
      error: (err) => this.handleError(err, 'getUserRepos')
    });
  }

  private handleError(err: any, context: string): void {
    console.error(`Error in ${context}:`, err);
  }

  clearUsers(): void {
    this.users = [];
    this.pagedUsers = [];
    this.totalPages = 0;
    this.searchSubmitted = false;
  }

  private loadUserFollowers(user: GithubUser): void {
    this.githubService.getUserFollowers(user.followers_url).pipe(
      tap((followers) => user.followers = followers),
      finalize(() => user.followers = []) 
    ).subscribe({
      error: (err) => this.handleError(err, `loadUserFollowers for ${user.login}`)
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.searchUsers();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchUsers();
    }
  }

  forbiddenTermValidator(term: string) {
    return (control: any) => {
      const value = control.value || '';
      return value.toLowerCase() === term.toLowerCase() ? { forbiddenTerm: { term } } : null;
    };
  }

  showPopup(): void {
    this.isPopupVisible = true;
  }
 
  closePopup(): void {
    this.isPopupVisible = false;
    this.selectedUserRepos = [];
  }
}
