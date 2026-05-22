import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogAddModalComponent } from './dog-add-modal.component';

describe('DogAddModalComponent', () => {
  let component: DogAddModalComponent;
  let fixture: ComponentFixture<DogAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogAddModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
