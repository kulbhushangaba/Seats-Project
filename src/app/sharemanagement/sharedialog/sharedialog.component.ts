import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-sharedialog',
  templateUrl: './sharedialog.component.html',
  styleUrls: ['./sharedialog.component.scss']
})
export class SharedialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SharedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      console.log(data);
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
  }
