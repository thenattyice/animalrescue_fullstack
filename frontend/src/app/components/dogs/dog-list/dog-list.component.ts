import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  GridReadyEvent,
  AllCommunityModule,
  ModuleRegistry,
} from 'ag-grid-community';
import { Dog } from '../../../models/dog';
import { DogService } from '../../../services/dog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DogAddModalComponent } from '../dog-add-modal/dog-add-modal.component';
import { DogEditButtonRendererComponent } from '../dog-edit-button-renderer/dog-edit-button-renderer.component';
import { DogEditModalComponent } from '../dog-edit-modal/dog-edit-modal.component';

ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-dog-list',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './dog-list.component.html',
  styleUrl: './dog-list.component.css',
})
export class DogListComponent {
  // Using AG Grid for the list view. Settings below.
  rowData: Dog[] = [];

  pagination = true;
  paginationPageSize = 10;

  defaultColDef = {
    sortable: true,
    filter: true,
  };

  // Column definitions for the list view
  colDefs: ColDef[] = [
    {
      headerName: '',
      field: '_id',
      width: 80,
      cellRenderer: DogEditButtonRendererComponent,
      filter: false,
      sortable: false,
    },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Breed', field: 'breed' },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Age', field: 'age' },
    { headerName: 'Training Status', field: 'trainingStatus' },
    { headerName: 'Reserved', field: 'reserved' },
    { headerName: 'In Service', field: 'inService' },
  ];

  constructor(
    private dogService: DogService,
    private modalService: NgbModal,
  ) {}

  onGridReady(params: GridReadyEvent) {
    this.loadDogs();
  }

  // Method to load all dogs from the database
  loadDogs(): void {
    this.dogService.getDogs().subscribe({
      next: (dogs: Dog[]) => {
        this.rowData = dogs;
      },
      error: (error: any) => {
        console.log('Error fetching dogs: ' + error);
      },
    });
  }

  // Method to trigger the dog-edit-modal component
  onEditClick(dog: Dog): void {
    const modalRef = this.modalService.open(DogEditModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.dog = dog;

    modalRef.closed.subscribe(() => {
      this.loadDogs();
    });
  }

  // Method to open the modal from Add Dog button
  openAddModal(): void {
    const modalRef = this.modalService.open(DogAddModalComponent, {
      size: 'lg',
    });

    modalRef.closed.subscribe(() => {
      this.loadDogs();
    });
  }
}
