import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors,FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../models/employeeModel';
import { CommonModule } from '@angular/common';



// @Component({
// selector: 'app-employee-form',
// templateUrl: './employeeFormComponent.html'
// })
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './employeeFormComponent.html',
  styleUrls: ['./employeeFormComponent.css']
})
export class EmployeeFormComponent implements OnInit {
@Input() employee: Employee | null = null; // null => create
@Output() save = new EventEmitter<Employee>();
@Output() cancel = new EventEmitter<void>();


form!: FormGroup;
// form: FormGroup | null = null;   // Strict - Mode issue

departments = ['HR', 'Engineering', 'Sales', 'Marketing', 'Finance', 'Operations'];


constructor(private fb: FormBuilder) {}


ngOnInit() {
this.form = this.fb.group({
name: [this.employee ? this.employee.name : '', [Validators.required, Validators.minLength(3)]],
email: [this.employee ? this.employee.email : '', [Validators.required, Validators.email]],
department: [this.employee ? this.employee.department : this.departments[0], [Validators.required]],
dateOfJoining: [this.employee ? this.employee.dateOfJoining : '', [Validators.required, this.noFutureDateValidator]]
});
}


 noFutureDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const value = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return value > today ? { futureDate: true } : null;
  }


onSubmit() {
if (this.form.invalid) {
this.form.markAllAsTouched();
return;
}
const payload: Employee = {
id: (this.employee && this.employee.id) ? this.employee.id : Date.now().toString(),
...this.form.value
};
this.save.emit(this.form.value as Employee);
//this.save.emit(payload);

}
}