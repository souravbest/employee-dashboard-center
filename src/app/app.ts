import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeFormComponent } from './components/employee-form/employeeFormComponent';
import { EmployeeListComponent } from './components/employee-list/employeeListComponent';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,EmployeeFormComponent, EmployeeListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
  
})
export class App {
  protected readonly title = signal('employee-dashboard-center');
}
