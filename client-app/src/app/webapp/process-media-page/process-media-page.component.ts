import { Component, ElementRef, ViewChild } from '@angular/core';
import { PotholeService } from 'src/app/shared/layouts/services/pothole.service';

@Component({
  selector: 'app-process-media-page',
  templateUrl: './process-media-page.component.html',
  styleUrls: ['./process-media-page.component.css']
})
export class ProcessMediaPageComponent {

  @ViewChild('inputFile') inputRef: ElementRef;
  image: File;
  imagePreview: '';

  constructor(private potholeServide: PotholeService){
  }

  processingMedia(){
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any){
    const file = event.target.files[0];
    this.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      // this.imagePreview = reader.result;
    }
  }
}
