import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogEditModalComponent } from './monkey-edit-modal.component';

describe('DogEditModalComponent', () => {
  let component: DogEditModalComponent;
  let fixture: ComponentFixture<DogEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogEditModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DogEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
