import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogEditButtonRendererComponent } from './dog-edit-button-renderer.component';

describe('DogEditButtonRendererComponent', () => {
  let component: DogEditButtonRendererComponent;
  let fixture: ComponentFixture<DogEditButtonRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogEditButtonRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogEditButtonRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
