import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private clientService: ClientService, 
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  showSnackBar(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  deleteClient(): void {
    this.clientService.delete(this.data['id']).subscribe(() => {
      this.showSnackBar('Cliente excluido com sucesso!');
      this.cancel(true);
    }, err => {
      this.showSnackBar(err.error['error']);
      err.error['errors'].forEach((msg: string) => {
        this.showSnackBar(msg);
      });
    });
  }

  cancel(saved: boolean): void {
    this.dialogRef.close(saved);
  }

}