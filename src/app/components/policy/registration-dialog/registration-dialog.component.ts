import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Policy } from '../policy.model';
import { PolicyService } from '../policy.service';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css']
})
export class PolicyRegistrationDialogComponent implements OnInit {

  policy: Policy = {
    startOfTerm: new Date(),
    endOfTerm: new Date(),
    vehicleLicensePlate: '',
    policyValue: 0
  };

  startOfTermFormControl = new FormControl('', [
    Validators.required
  ]);
  endOfTermFormControl = new FormControl('', [
    Validators.required
  ]);
  vehicleLicensePlateFormControl = new FormControl('', [
    Validators.required
  ]);
  policyValueFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(public dialogRef: MatDialogRef<PolicyRegistrationDialogComponent>,
    private policyService: PolicyService,
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

  createPolicy(): void {
    this.policyService.create(this.policy).subscribe(() => {
      this.showSnackBar('Apólice cadastrada com sucesso!');
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