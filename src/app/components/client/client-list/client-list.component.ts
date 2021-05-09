import { Component, OnInit } from '@angular/core';
import { Client } from '../client.model';
import { ClientService } from '../client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  displayedColumns = ['id', 'fullname', 'cpf', 'city', 'uf', 'action'];

  clients: Client[] = [];

  constructor(private clientService: ClientService, 
    private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.clientService.read().subscribe(clients => {
      this.clients = clients;
    });
  }

  showSnackBar(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  openRegistrationModal(): void {
    const dialogRef = this.dialog.open(RegistrationDialogComponent, {
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  openUpdateModal(id: string): void {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '40%',
      data: {
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '25%',
      data: {
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

}