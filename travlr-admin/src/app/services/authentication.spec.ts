import { TestBed } from '@angular/core/testing';
import { Authentication } from './authentication';

describe('Authentication', () => {
  let service: Authentication;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Authentication);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should report logged out when no token is stored', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });
});
