/*import { TestBed } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';
import { GithubUser } from '../../models/github-user.model';

describe('UserCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent],
    }).compileComponents();
  });

  it('should create and display user info', () => {
    const fixture = TestBed.createComponent(UserCardComponent);
    const component = fixture.componentInstance;

    // Simulamos la entrada (input) de datos para el componente
    const mockUser: GithubUser = {
      login: 'user1',
      followers_url: 'url1',
      avatar_url: '',
      followers: [],
      id: 1,
      html_url: 'https://github.com/user1',
      repos_url: 'https://github.com/user1/repos',
      type: 'User',
      score: 1,
    };

    // Asignamos el mock al input
    component.user = mockUser;

    // Detectamos los cambios para reflejar la actualización del input
    fixture.detectChanges();

    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a').textContent).toContain('user1');
  });
});
*/