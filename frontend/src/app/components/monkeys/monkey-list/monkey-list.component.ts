import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  GridReadyEvent,
  AllCommunityModule,
  ModuleRegistry,
} from 'ag-grid-community';
import { Monkey } from '../../../models/monkey';
import { MonkeyService } from '../../../services/monkey.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MonkeyAddModalComponent } from '../monkey-add-modal/monkey-add-modal.component';
import { MonkeyEditButtonRendererComponent } from '../monkey-edit-button-renderer/monkey-edit-button-renderer.component';
import { MonkeyEditModalComponent } from '../monkey-edit-modal/monkey-edit-modal.component';

ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-monkey-list',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './monkey-list.component.html',
  styleUrl: './monkey-list.component.css',
})
export class MonkeyListComponent {
  // Using AG Grid for the list view. Settings below.
  rowData: Monkey[] = [];

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
      cellRenderer: MonkeyEditButtonRendererComponent,
      filter: false,
      sortable: false,
    },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Species', field: 'species' },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Age', field: 'age' },
    { headerName: 'Training Status', field: 'trainingStatus' },
    { headerName: 'Reserved', field: 'reserved' },
    { headerName: 'In Service', field: 'inService' },
  ];

  constructor(
    private monkeyService: MonkeyService,
    private modalService: NgbModal,
  ) {}

  onGridReady(params: GridReadyEvent) {
    this.loadMonkeys();
  }

  // Method to load all monkeys from the database
  loadMonkeys(): void {
    this.monkeyService.getMonkeys().subscribe({
      next: (monkeys: Monkey[]) => {
        this.rowData = monkeys;
      },
      error: (error: any) => {
        console.log('Error fetching monkeys: ' + error);
      },
    });
  }

  // Method to trigger the monkey-edit-modal component
  onEditClick(monkey: Monkey): void {
    const modalRef = this.modalService.open(MonkeyEditModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.monkey = monkey;

    modalRef.closed.subscribe(() => {
      this.loadMonkeys();
    });
  }

  // Method to open the modal from Add Monkey button
  openAddModal(): void {
    const modalRef = this.modalService.open(MonkeyAddModalComponent, {
      size: 'lg',
    });

    modalRef.closed.subscribe(() => {
      this.loadMonkeys();
    });
  }
}
