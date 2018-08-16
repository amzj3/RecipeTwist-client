import { TestBed, inject } from '@angular/core/testing';

import { UserRecipeService } from './user-recipe.service';

describe('UserRecipeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRecipeService]
    });
  });

  it('should be created', inject([UserRecipeService], (service: UserRecipeService) => {
    expect(service).toBeTruthy();
  }));
});
