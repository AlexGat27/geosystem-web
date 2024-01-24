import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PotholePageService } from 'src/app/shared/services/localServices/pothole-page.service';
import { PotholeService } from 'src/app/shared/services/pothole.service';

@Component({
  selector: 'app-process-media-page',
  templateUrl: './process-media-page.component.html',
  styleUrls: ['./process-media-page.component.css'],
  viewProviders: [PotholePageService]
})
export class ProcessMediaPageComponent implements AfterViewInit{

  @ViewChild('inputFile') inputRef: ElementRef;
  @ViewChild('canvBefore') canvasBefore: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvAfter') canvasAfter: ElementRef<HTMLCanvasElement>;
  isFilesComplete: boolean;

  constructor(private potholeService: PotholeService,
    private potholePageservice: PotholePageService){}

  ngAfterViewInit(){
    this.isFilesComplete = false;
    this.potholePageservice.initializeCanvas(this.canvasBefore, this.canvasAfter);
    this.resetCanvas()
  }

  processingMedia(){
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any){
    const file = event.target.files[0];
    if (file){
      this.readAndDisplayImgFile(file);
      this.printLoadText();
      this.isFilesComplete = true;
      this.potholeService.imageProcessing(file).subscribe((response) => {
        const imageAfter = 'data:image/jpeg;base64,' + response;
        this.potholePageservice.displayImgBase64(this.canvasAfter, imageAfter);
      }, er => {this.potholePageservice.errorHandleCanvas(er.error);});
    }
    event.target.value = '';
  }

  resetCanvas(){
    this.potholePageservice.updateCanvas("Необработанное изображение", "Обработанное изображение");
    this.isFilesComplete = false;
  }
  private printLoadText(){
    this.potholePageservice.updateCanvas("Загрузка изображения...", "Идет обработка изображения...");
  }
  private readAndDisplayImgFile(img: File){
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      this.potholePageservice.displayImgBase64(this.canvasBefore, reader.result as string)
    };
  }

}
