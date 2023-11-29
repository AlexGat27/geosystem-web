import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PotholeService } from 'src/app/shared/layouts/services/pothole.service';
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-process-media-page',
  templateUrl: './process-media-page.component.html',
  styleUrls: ['./process-media-page.component.css']
})
export class ProcessMediaPageComponent implements OnInit{

  @ViewChild('inputFile') inputRef: ElementRef;
  isFilesComplete: boolean;
  imageBefore: string | ArrayBuffer;
  imageAfter: string | ArrayBuffer;

  constructor(private potholeServide: PotholeService){
  }

  ngOnInit(): void {
    this.imageAfter = '';
    this.imageBefore = '';
    this.isFilesComplete = false;
  }

  processingMedia(){
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any){
    const file = event.target.files[0];
    if (file){
      this.potholeServide.imageProcessing(file).subscribe((response) => {
        let data = JSON.parse(response)
        this.imageAfter = 'data:image/jpeg;base64,' + data.imageUrl;
        this.readAndDisplayImg(file);
        this.isFilesComplete = true;
      }, er => {
        console.log(er);
      });
    }
  }

  private readAndDisplayImg(img: File){
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      this.imageBefore = reader.result;
    };
  }
}
