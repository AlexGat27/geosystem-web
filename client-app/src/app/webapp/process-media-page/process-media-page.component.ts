import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PotholeService } from 'src/app/shared/services/pothole.service';

@Component({
  selector: 'app-process-media-page',
  templateUrl: './process-media-page.component.html',
  styleUrls: ['./process-media-page.component.css']
})
export class ProcessMediaPageComponent implements AfterViewInit{

  @ViewChild('inputFile') inputRef: ElementRef;
  @ViewChild('canvBefore') canvasBefore: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvAfter') canvasAfter: ElementRef<HTMLCanvasElement>;
  isFilesComplete: boolean;

  constructor(private potholeServise: PotholeService){
  }

  ngAfterViewInit(){
    this.isFilesComplete = false;
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
      this.potholeServise.imageProcessing(file).subscribe((response) => {
        const imageAfter = 'data:image/jpeg;base64,' + response;
        this.displayImgBase64(this.canvasAfter, imageAfter);
        this.isFilesComplete = true;
      }, er => {
        console.log(er);
      });
      
    }
    event.target.value = '';
  }

  resetCanvas(){
    const canvasBefore = this.canvasBefore.nativeElement;
    const canvasAfter = this.canvasAfter.nativeElement;
    const ctxBefore = canvasBefore.getContext('2d');
    const ctxAfter = canvasAfter.getContext('2d');
    canvasBefore.height = canvasBefore.width / 4 * 3;
    canvasAfter.height = canvasAfter.width / 4 * 3;
    ctxBefore.clearRect(0, 0, canvasBefore.width, canvasBefore.height);
    ctxAfter.clearRect(0, 0, canvasAfter.width, canvasAfter.height);
    ctxBefore.textAlign = "center"; ctxBefore.font = 'bold 17px sans-serif';
    ctxAfter.textAlign = "center"; ctxAfter.font = 'bold 17px sans-serif';
    ctxBefore.fillText("Необработанное изображение", canvasBefore.width/2, canvasBefore.height/2);
    ctxAfter.fillText("Обработанное изображение", canvasAfter.width/2, canvasAfter.height/2);
    this.isFilesComplete = false;
  }
  private printLoadText(){
    const canvasBefore = this.canvasBefore.nativeElement;
    const canvasAfter = this.canvasAfter.nativeElement;
    const ctxBefore = canvasBefore.getContext('2d');
    const ctxAfter = canvasAfter.getContext('2d');
    ctxAfter.clearRect(0, 0, canvasAfter.width, canvasAfter.height);
    ctxBefore.clearRect(0, 0, canvasBefore.width, canvasBefore.height);
    ctxBefore.fillText("Загрузка изображения...", canvasBefore.width/2, canvasBefore.height/2);
    ctxAfter.fillText("Идет процесс обработки...", canvasAfter.width/2, canvasAfter.height/2);
  }

  private readAndDisplayImgFile(img: File){
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      this.displayImgBase64(this.canvasBefore, reader.result as string)
    };
  }
  private displayImgBase64(canv: ElementRef<HTMLCanvasElement>, imgBase64: string){
    const canvas = canv.nativeElement;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = imgBase64;
    image.onload= () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
  }
  private checkSimilarImages(){
    

  }
}
