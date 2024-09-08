import { TestBed } from '@angular/core/testing';
import { GithubService } from './github.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubSearchResponse } from '../../models/github-search-response.model';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService],
    });

    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no haya solicitudes pendientes
    httpMock.verify();
  });

  it('should call searchUsers and return expected data', () => {
    const mockResponse = {
        items: [
          { login: 'user1', followers_url: 'url1', avatar_url: '', followers: [] },
        ],
        total_count: 1,
      };

    service.searchUsers('user', 1).subscribe((response) => {
      expect(response.items.length).toBe(1);
      expect(response.items[0].login).toBe('user1');
    });

    // Verifica que la solicitud HTTP fue hecha con la URL correcta
    const req = httpMock.expectOne(`${service['apiUrl']}?q=user&page=1&per_page=10`);
    expect(req.request.method).toBe('GET');

    // Devuelve una respuesta simulada
    req.flush(mockResponse);
  });
});
