import { Component, OnInit } from '@angular/core';
import { Policy } from '../policy.model';
import { PolicyService } from '../policy.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PolicyRegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';
import { PolicyUpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { PolicyDeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { PolicyDetailComponent } from '../policy-detail/policy-detail.component';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css']
})
export class PolicyListComponent implements OnInit {

  displayedColumns = ['id', 'policyNumber', 'startOfTerm', 'endOfTerm', 'vehicleLicensePlate', 'policyValue', 'action'];

  policies: Policy[] = [];

  policyDetail = {
    status: '',
    vehicleLicensePlate: '',
    policyValue: 0,
    daysToExpire: 0,
    daysOverdue: 0
  };

  policyNumberDetail: number = 0;

  constructor(private policyService: PolicyService, 
    private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.policyService.read().subscribe(policies => {
      this.policies = policies;
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
    const dialogRef = this.dialog.open(PolicyRegistrationDialogComponent, {
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  openUpdateModal(id: string): void {
    const dialogRef = this.dialog.open(PolicyUpdateDialogComponent, {
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
    const dialogRef = this.dialog.open(PolicyDeleteDialogComponent, {
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

  openDetailDialog(): void {
    this.policyService.readByPolicyNumber(this.policyNumberDetail).subscribe(response => {
      this.policyDetail.policyValue = response.policyValue;
      this.policyDetail.vehicleLicensePlate = response.vehicleLicensePlate;
      this.policyDetail.status = 'Válido';
      const actualDate = new Date();
      const endOfTerm = new Date(response.endOfTerm);
      if (actualDate.getTime() > endOfTerm.getTime()) {
        this.policyDetail.status = 'Vencido';
        const timeDifference = Math.abs(actualDate.getTime() - endOfTerm.getTime());
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        this.policyDetail.daysOverdue = daysDifference;
      } else if (actualDate.getTime() < endOfTerm.getTime()) {
        const timeDifference = Math.abs(endOfTerm.getTime() - actualDate.getTime());
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        this.policyDetail.daysToExpire = daysDifference;
      }
      const dialogRef = this.dialog.open(PolicyDetailComponent, {
        width: '25%',
        data: this.policyDetail
      });
    }, err => {
      this.showSnackBar('Apólice não encontrada');
    });
  }

}