import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MediaProcessingService } from '../../services/mediaProcessing.service';

@Component({
  selector: 'app-admin-mediaprocess-page',
  templateUrl: './admin-mediaprocess-page.component.html',
  styleUrls: ['./admin-mediaprocess-page.component.css']
})
export class AdminMediaprocessPageComponent {
  files: File[] = [];
  progress: number = 0;
  uploading: boolean = false;

  constructor(private mediaProcessService: MediaProcessingService) {}

  onFileDropped($event: any) {
    let files = $event.target.files || $event.dataTransfer.files;
    if (files.length === 0)
      return;

    this.files = Array.from(files);
  }

  startUpload() {
    if (this.files.length > 0){
      this.uploading = true;
      this.progress = 0;
      this.mediaProcessService.startUpload(this.files);
      this.mediaProcessService.uploadProgress$.subscribe(progress => {
        this.progress = progress;
      }); 
    }
  }

  stopUpload() {
    this.uploading = false;
    this.mediaProcessService.stopUpload();
    this.files = [];
  }
}
