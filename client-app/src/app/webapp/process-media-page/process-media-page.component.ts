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
  imageBefore = '';
  imageAfter = '';

  constructor(private potholeServide: PotholeService){
  }

  processingMedia(){
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any){
    const file = event.target.files[0];
    if (file){
      this.readAndDisplayimage(file);
    }
    this.potholeServide.imageProcessing(file).subscribe((response) => {
      const blob = new Blob([response.data], {type: 'image/jpeg'});
      this.imageAfter = URL.createObjectURL(blob);
      console.log(this.imageAfter)
    }, er => {
      console.log(er);
    });
  }

  readAndDisplayimage(file: File){
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageBefore = e.target.result;
    }
    reader.readAsDataURL(file);
  }

  private arrayBufferToBase64(buffer: Uint8Array): string {
    let binary = '';
    buffer.forEach(byte => binary += String.fromCharCode(byte));
    return btoa(binary);
  }
}
