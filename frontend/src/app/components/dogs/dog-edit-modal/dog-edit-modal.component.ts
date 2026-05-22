import { Component, OnInit, Input } from '@angular/core';
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
  selector: 'app-dog-edit-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dog-edit-modal.component.html',
  styleUrl: './dog-edit-modal.component.css',
})
export class DogEditModalComponent implements OnInit {
  @Input() dog!: Dog;

  editDogForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private dogService: DogService,
    public activeModal: NgbActiveModal,
  ) {}

  ngOnInit(): void {
    this.editDogForm = this.fb.group({
      name: [this.dog.name, Validators.required],
      microchipId: [this.dog.microchipId, Validators.required],
      gender: [this.dog.gender, Validators.required],
      age: [this.dog.age, [Validators.required, Validators.min(0)]],
      weight: [this.dog.weight, [Validators.required, Validators.min(0)]],
      breed: [this.dog.breed, Validators.required],
      acquisitionDate: [this.dog.acquisitionDate],
      acquisitionCountry: [this.dog.acquisitionCountry, Validators.required],
      trainingStatus: [this.dog.trainingStatus],
      reserved: [this.dog.reserved],
      inService: [this.dog.inService],
      inServiceCountry: [this.dog.inServiceCountry],
    });
  }

  onSubmit(): void {
    if (this.editDogForm.invalid) {
      this.editDogForm.markAllAsTouched();
      return;
    }

    this.dogService.updateDog(this.dog._id!, this.editDogForm.value).subscribe({
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
