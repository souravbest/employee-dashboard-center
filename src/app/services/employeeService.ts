import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employeeModel';


const STORAGE_KEY = 'mini_employee_dashboard_employees';


@Injectable({ providedIn: 'root' })
export class EmployeeService {
private _employees$: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>(this.loadFromStorage());


constructor() {}


private loadFromStorage(): Employee[] {
try {
const raw = localStorage.getItem(STORAGE_KEY);
return raw ? JSON.parse(raw) : [];
} catch (e) {
console.error('Failed to load employees from storage', e);
return [];
}
}


private saveToStorage(employees: Employee[]) {
localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
}


get employees$(): Observable<Employee[]> {
return this._employees$.asObservable();
}


get snapshot(): Employee[] {
return this._employees$.getValue();
}


add(employee: Employee) {
const next = [...this.snapshot, employee];
this._employees$.next(next);
this.saveToStorage(next);
}


update(employee: Employee) {
const next = this.snapshot.map(e => e.id === employee.id ? { ...employee } : e);
this._employees$.next(next);
this.saveToStorage(next);
}


delete(id: string) {
const next = this.snapshot.filter(e => e.id !== id);
this._employees$.next(next);
this.saveToStorage(next);
}


exportCSV(): string {
const rows = [
['ID','Name','Email','Department','DateOfJoining'],
...this.snapshot.map(e => [e.id, e.name, e.email, e.department, e.dateOfJoining])
];
return rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
}
}