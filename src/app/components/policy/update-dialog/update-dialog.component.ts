import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Policy } from '../policy.model';
import { PolicyService } from '../policy.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class PolicyUpdateDialogComponent implements OnInit {

  policy: Policy = {
    startOfTerm: new Date(),
    endOfTerm: new Date(),
    vehicleLicensePlate: '',
    policyValue: 0
  };

  vehicleLicensePlateFormControl = new FormControl('', [
    Validators.required
  ]);
  policyValueFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PolicyUpdateDialogComponent>,
    private policyService: PolicyService, 
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.policyService.readById(this.data['id']).subscribe(policy => {
      this.policy = policy;
    }, err => {
      console.log(err);
    });
  }

  showSnackBar(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  updatePolicy(): void {
    this.policyService.update(this.policy).subscribe(() => {
      this.showSnackBar('Apólice atualizada com sucesso!');
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