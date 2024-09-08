import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports:[CommonModule, ReactiveFormsModule],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  searchForm: FormGroup;

  @Output() search = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: ['', [Validators.minLength(4), this.forbiddenTermValidator('flowww')]]
    });
  }

  get searchTerm() {
    return this.searchForm.get('searchTerm');
  }

  onSubmit() {
    if (this.searchForm.valid) {
      this.search.emit(this.searchForm.value.searchTerm);
    }
  }

  forbiddenTermValidator(term: string) {
    return (control: any) => {
      const value = control.value || '';
      return value.toLowerCase() === term.toLowerCase() ? { forbiddenTerm: { term } } : null;
    };
  }
}
