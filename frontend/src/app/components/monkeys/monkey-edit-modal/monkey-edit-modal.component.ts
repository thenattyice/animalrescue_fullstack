import { Component, OnInit, Input } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MonkeyService } from '../../../services/monkey.service';
import { Monkey } from '../../../models/monkey';

@Component({
  selector: 'app-monkey-edit-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './monkey-edit-modal.component.html',
  styleUrl: './monkey-edit-modal.component.css',
})
export class MonkeyEditModalComponent implements OnInit {
  @Input() monkey!: Monkey;

  editMonkeyForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private monkeyService: MonkeyService,
    public activeModal: NgbActiveModal,
  ) {}

  ngOnInit(): void {
    this.editMonkeyForm = this.fb.group({
      name: [this.monkey.name, Validators.required],
      microchipId: [this.monkey.microchipId, Validators.required],
      gender: [this.monkey.gender, Validators.required],
      age: [this.monkey.age, [Validators.required, Validators.min(0)]],
      weight: [this.monkey.weight, [Validators.required, Validators.min(0)]],
      species: [this.monkey.species, Validators.required],
      acquisitionDate: [this.monkey.acquisitionDate],
      acquisitionCountry: [this.monkey.acquisitionCountry, Validators.required],
      trainingStatus: [this.monkey.trainingStatus],
      reserved: [this.monkey.reserved],
      inService: [this.monkey.inService],
      inServiceCountry: [this.monkey.inServiceCountry],
      tailLength: [
        this.monkey.tailLength,
        [Validators.required, Validators.min(0)],
      ],
      height: [this.monkey.height, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.editMonkeyForm.invalid) {
      this.editMonkeyForm.markAllAsTouched();
      return;
    }

    this.monkeyService
      .updateMonkey(this.monkey._id!, this.editMonkeyForm.value)
      .subscribe({
        next: (monkey: Monkey) => {
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
