import { Component, OnDestroy, OnInit,NgZone  } from '@angular/core';
import { Subscription } from 'rxjs';
import { Employee } from '../../models/employeeModel';
import { EmployeeService } from '../../services/employeeService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeFormComponent } from '../employee-form/employeeFormComponent';

// @Component({
// selector: 'app-employee-list',
// templateUrl: './employee-list.component.html'
// })
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule,EmployeeFormComponent],
  templateUrl: './employeeListComponent.html',
  styleUrls: ['./employeeListComponent.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
employees: Employee[] = [];
filtered: Employee[] = [];
sub!: Subscription;


// UI state
searchText = '';
departmentFilter = 'All';
sortBy: 'name' | 'doj' = 'name';
sortDirection: 1 | -1 = 1;


// editing
editing: Employee | null = null;
showForm = false;
statusShown = false;


departments = ['All','HR', 'Engineering', 'Sales', 'Marketing', 'Finance', 'Operations'];


constructor(private svc: EmployeeService,private ngZone: NgZone) {}

statusMessage: string = '';

statusType: 'success' | 'error' | '' = '';



showStatus(message: string, type: 'success' | 'error') {
  this.statusMessage = message;
  this.statusType = type;

  

  setTimeout(() => {
    this.statusMessage = '';
    this.statusType = '';
    this.statusShown = true;
 
  }, 3000);
}

ngOnInit() {
this.sub = this.svc.employees$.subscribe(list => {
this.employees = list;
this.applyAllFilters();
});
}
ngOnDestroy() { this.sub.unsubscribe(); }


applyAllFilters() {
const q = this.searchText.trim().toLowerCase();
this.filtered = this.employees
.filter(e => this.departmentFilter === 'All' || e.department === this.departmentFilter)
.filter(e => !q || e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q));


this.sortList();
}


sortList() {
if (this.sortBy === 'name') {
this.filtered.sort((a,b) => this.sortDirection * a.name.localeCompare(b.name));
} else {
this.filtered.sort((a,b) => this.sortDirection * (new Date(a.dateOfJoining).getTime() - new Date(b.dateOfJoining).getTime()));
}
}


toggleSort(by: 'name'|'doj') {
if (this.sortBy === by) this.sortDirection = (this.sortDirection === 1 ? -1 : 1);
else { this.sortBy = by; this.sortDirection = 1; }
this.sortList();
}


onAdd() {
this.editing = null;
this.showForm = true;
}


onEdit(emp: Employee) {
this.editing = { ...emp };
this.showForm = true;
this.showStatus('You can edit now !', 'success');
}


onDelete(id: string) {
if (!confirm('Are you sure you want to delete this employee?')) return;
this.svc.delete(id);
 this.showStatus('Employee deleted!', 'error');
}


onSave(emp: Employee) {
if (this.editing) this.svc.update(emp);
else this.svc.add(emp);
this.showForm = false;
this.showStatus('Employee saved successfully!', 'success');
}


onCancel() { this.showForm = false; }


onSearchChange() { this.applyAllFilters(); }
onDepartmentChange() { this.applyAllFilters(); }


exportCSV() {
const csv = this.svc.exportCSV();
const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'employees.csv';
a.click();
URL.revokeObjectURL(url);
}
}