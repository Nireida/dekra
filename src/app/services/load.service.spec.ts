import { TestBed } from '@angular/core/testing';
import { LoaderService } from './load.service';
import { describe, it, expect, beforeEach } from 'vitest';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService]
    });
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial value false', () => {
    expect(service.isLoading()).toBe(false);
  });

  it('should set isLoading to true when show() is called', () => {
    service.show();
    expect(service.isLoading()).toBe(true);
  });

  it('should set isLoading to false when hide() is called', () => {
    service.show();
    expect(service.isLoading()).toBe(true);

    service.hide();
    expect(service.isLoading()).toBe(false);
  });
});
