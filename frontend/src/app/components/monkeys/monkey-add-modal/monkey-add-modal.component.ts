import { Component, OnInit } from '@angular/core';
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
  selector: 'app-monkey-add-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './monkey-add-modal.component.html',
  styleUrl: './monkey-add-modal.component.css',
})
export class MonkeyAddModalComponent implements OnInit {
  addMonkeyForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private monkeyService: MonkeyService,
    public activeModal: NgbActiveModal,
  ) {}

  ngOnInit(): void {
    this.addMonkeyForm = this.fb.group({
      name: ['', Validators.required],
      microchipId: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      weight: ['', [Validators.required, Validators.min(0)]],
      species: ['', Validators.required],
      acquisitionDate: [''],
      acquisitionCountry: ['', Validators.required],
      trainingStatus: ['Not Started'],
      reserved: [false],
      inService: [false],
      inServiceCountry: [''],
      tailLength: ['', [Validators.required, Validators.min(0)]],
      height: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.addMonkeyForm.invalid) {
      this.addMonkeyForm.markAllAsTouched();
      return;
    }

    this.monkeyService.addMonkey(this.addMonkeyForm.value).subscribe({
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
