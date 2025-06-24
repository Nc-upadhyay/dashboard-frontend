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
editRow(){
  alert(`Edit Row button clicked for user: `);
}
  toggleView(rowId: number) {
    // this.activeRowId = this.activeRowId === rowId ? null : rowId;
  }
  selectedRow: User |null= null;

  openPopup(id: any) {
    console.log('Row data:', this.users[id]);
    this.selectedRow = this.users[id-1];
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
    // if (this.editRow) {
    //   const index = this.data.findIndex(item => item.id === this.editRow!.id);
    //   if (index > -1) {
    //     this.data[index] = { ...this.editRow };
    //   }
    //   this.closeEditPopup();
    // }
  }

}
interface User {
  sNo: number;
  name: string;
  roll: string;
  address: string;
  action: boolean; // True for checkmark, false for cross
}





  
