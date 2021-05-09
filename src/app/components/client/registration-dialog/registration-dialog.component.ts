import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Client } from '../client.model';
import { ClientService } from '../client.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css']
})
export class RegistrationDialogComponent implements OnInit {

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

  constructor(public dialogRef: MatDialogRef<RegistrationDialogComponent>,
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

  createClient(): void {
    this.clientService.create(this.client).subscribe(() => {
      this.showSnackBar('Cliente cadastrado com sucesso!');
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