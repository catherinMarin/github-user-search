import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingNoResultsComponent } from './loading-no-results.component';

describe('LoadingNoResultsComponent', () => {
  let component: LoadingNoResultsComponent;
  let fixture: ComponentFixture<LoadingNoResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingNoResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingNoResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
