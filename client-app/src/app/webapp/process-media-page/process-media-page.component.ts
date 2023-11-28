import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PotholeService } from 'src/app/shared/layouts/services/pothole.service';
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-process-media-page',
  templateUrl: './process-media-page.component.html',
  styleUrls: ['./process-media-page.component.css']
})
export class ProcessMediaPageComponent {

  @ViewChild('inputFile') inputRef: ElementRef;
  image: File;
  imageBefore = '';
  @Input()
  imageAfter;

  constructor(private potholeServide: PotholeService){
  }

  processingMedia(){
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any){
    const file = event.target.files[0];
    if (file){
      this.imageBefore = URL.createObjectURL(file);
      console.log(this.imageBefore);
    }
    this.potholeServide.imageProcessing(file).subscribe((response) => {
      const uint8array = new Uint8Array(response.length)
      for (let i = 0; i < response.length; i++) {
        uint8array[i] = response.charCodeAt(i);
      }
      const blob = new Blob([uint8array], {type: "image/jpeg"});
      this.imageAfter = URL.createObjectURL(blob);
      console.log(this.imageAfter);
      // const readerAfter = new FileReader();
      // readerAfter.onload = () => {
      //   this.imageAfter = readerAfter.result;
      // }
      // readerAfter.readAsDataURL(blob);
    }, er => {
      console.log(er);
    });
  }
}
