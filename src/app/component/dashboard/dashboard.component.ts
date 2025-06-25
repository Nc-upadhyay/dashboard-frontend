import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { error } from 'console';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  welcomeMessage: string = 'Welcome Admin';
  users: User[] =[];
   editRow1: User | null = null;
   constructor(private http: HttpClient) {
    console.log('DashboardComponent initialized');
    this.getUserDate();
  }
    data: User[] = [];
addRow(){
  alert('Add Row button clicked');
}
editRow(user:any){
  // alert(`Edit Row button clicked for user: `);
  this.editRow1=user;
}
  toggleView(rowId: number) {
    // this.activeRowId = this.activeRowId === rowId ? null : rowId;
  }
  selectedRow: User |null= null;

  openPopup(user: any) {
    console.log('Row data:', user);
    this.selectedRow = user;
  }

  closePopup() {
    this.selectedRow = null;
  }

  getUserDate() {
    this.http.get<any>('http://localhost:8080/dashboard/get/all').subscribe(
      response => {
        this.users=response.data;
        if(this.users.length === 0) {
          alert('No user data found.');     
        }
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  // Edit Popup
  openEditPopup(row: User) {
    this.editRow1 = { ...row }; // Create a copy to avoid direct binding
  }

  closeEditPopup() {
    this.editRow1 = null;
  }

  saveEdit() {
   this.http.put<any>('http://localhost:8080/dashboard/update', this.editRow1).subscribe(
      response => {
        if(response.data===1)
        alert('User updated successfully:');
        // this.getUserDate(); // Refresh the user data
        this.closeEditPopup(); // Close the edit popup
      },
      error => {
        alert('Error updating user:');
      }
    );
  }

   deleteRow(arg0: number) {
    this.http.delete<any>(`http://localhost:8080/dashboard/delete/${arg0}`).subscribe(
      response => { 
        if(response.data===1)
        alert('User deleted successfully');

        this.getUserDate(); // Refresh the user data after deletion
      },
      error => {    
        console.error('Error deleting user:', error);
        alert('Error deleting user');
      }
    );

}

}
interface User {
  sNo: number;
  name: string;
  roll: string;
  address: string;
  action: boolean; // True for checkmark, false for cross
}





  
