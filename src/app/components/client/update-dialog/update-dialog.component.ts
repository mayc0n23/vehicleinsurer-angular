import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Client } from '../client.model';
import { ClientService } from '../client.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {

  client: Client = {
    fullname: '',
    cpf: '',
    city: '',
    uf: ''
  }

  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  cpfFormControl = new FormControl('', [
    Validators.required
  ]);
  cityFormControl = new FormControl('', [
    Validators.required
  ]);

  ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT",
    "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR",
      "SC", "SP", "SE", "TO"];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    private clientService: ClientService, 
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.clientService.readById(this.data['id']).subscribe(client => {
      this.client = client;
    });
  }

  showSnackBar(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  updateClient(): void {
    this.clientService.update(this.client).subscribe(() => {
      this.showSnackBar('Cliente atualizado com sucesso!');
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