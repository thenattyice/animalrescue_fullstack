import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DogService } from '../../../services/dog.service';
import { Dog } from '../../../models/dog';

@Component({
  selector: 'app-dog-add-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dog-add-modal.component.html',
  styleUrl: './dog-add-modal.component.css',
})
export class DogAddModalComponent implements OnInit {
  addDogForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private dogService: DogService,
    public activeModal: NgbActiveModal,
  ) {}

  ngOnInit(): void {
    this.addDogForm = this.fb.group({
      name: ['', Validators.required],
      microchipId: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      weight: ['', [Validators.required, Validators.min(0)]],
      breed: ['', Validators.required],
      acquisitionDate: [''],
      acquisitionCountry: ['', Validators.required],
      trainingStatus: ['Not Started'],
      reserved: [false],
      inService: [false],
      inServiceCountry: [''],
    });
  }

  onSubmit(): void {
    if (this.addDogForm.invalid) {
      this.addDogForm.markAllAsTouched();
      return;
    }

    this.dogService.addDog(this.addDogForm.value).subscribe({
      next: (dog: Dog) => {
        this.activeModal.close('saved');
      },
      error: (error: any) => {
        this.errorMessage = error.error.message || 'An error occurred';
      },
    });
  }

  onCancel(): void {
    this.activeModal.dismiss('cancelled');
  }
}
