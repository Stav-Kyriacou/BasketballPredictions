import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    }

    onConfirm(): void {
      // Close the dialog, return true
      this.dialogRef.close(true);
    }
  
    onDismiss(): void {
      // Close the dialog, return false
      this.dialogRef.close(false);
    }
  }
  
  /**
   * Class to represent confirm dialog model.
   *
   * It has been kept here to keep it as part of shared component.
   */
  export class ConfirmDialogModel {
  
    constructor(public title: string, public message: string) {
    }
  }
