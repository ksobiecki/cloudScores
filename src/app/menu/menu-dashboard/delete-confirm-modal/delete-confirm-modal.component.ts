import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { RoomsService } from 'src/shared/services/rooms.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.template.html',
  styleUrls: ['./delete-confirm-modal.less'],
})
export class DeleteConfirmModalComponent {
  faClose = faTimes;
  faTimesCircle = faTimesCircle;

  constructor(
    private roomsService: RoomsService,
    public dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onDeleteRoom(): void {
    if (this.data.isAuthor) this.roomsService.deleteRoom(this.data.currentRoom._id);
    // else this.roomsService.
    this.router.navigate(['/rooms']);
    this.closeModal();
  }

  closeModal(): void {
    const thisDialogRef = this.dialog.closeAll();
  }
}
