import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PotholePageService } from 'src/app/shared/services/localServices/pothole-page.service';
import { CameraService } from 'src/app/shared/services/localServices/camera.service';
import { PotholeService } from 'src/app/shared/services/pothole.service';

@Component({
  selector: 'app-process-media-page',
  templateUrl: './process-media-page.component.html',
  styleUrls: ['./process-media-page.component.css'],
  viewProviders: [PotholePageService, CameraService]
})
export class ProcessMediaPageComponent implements AfterViewInit{
  @ViewChild('videoElement') videoElementRef!: ElementRef;
  @ViewChild('canvBefore') canvasBefore: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvAfter') canvasAfter: ElementRef<HTMLCanvasElement>;
  isDefaultState = true;
  isFilesError = false;
  isCameraActive = false;

  constructor(private _cameraService: CameraService,
    private _potholePageService: PotholePageService,
    private _potholeService: PotholeService){}

  ngAfterViewInit() {
    this._potholePageService.initializeCanvas(this.canvasBefore, this.canvasAfter);
    this.resetCanvas();
  }

  toggleCamera(){
    if (this.isCameraActive){
      this.isCameraActive = false;
      this._cameraService.HideCamera();
      this.resetCanvas();
    }else{
      const videoElement: HTMLVideoElement = this.videoElementRef.nativeElement;
      this._cameraService.ShowCamera()
      .then(stream => {
        console.log(stream);
        videoElement.srcObject = stream;
        this.isCameraActive = true;
      })
      .catch(er => {console.log("Есть проблемы с камерой: ", er)});
    }
  }
  
  takeFrame(){
    const videoFrame: HTMLVideoElement = this.videoElementRef.nativeElement;
    this.isCameraActive = false;
    this.isDefaultState = false;
    this._potholePageService.displayImgVideo(this.canvasBefore, videoFrame);
    this._cameraService.CaptureScreenshot(videoFrame)
    .then(imageFile => {
      this._cameraService.HideCamera();
      this._cameraService.GetCameraPosition()
      .then(position =>{
        this._potholeService.imageProcessing(imageFile, position).subscribe((response) => {
          const imageAfter = 'data:image/jpeg;base64,' + response;
          this._potholePageService.displayImgBase64(this.canvasAfter, imageAfter);
        }, er => {
          this.isFilesError = true;
          console.log(er.error)
          this._potholePageService.updateCanvas(null, er.error, true);
        });
      }).catch(er => {console.error(er);})
    }).catch(er => {console.error(er);});
  }

  resetCanvas(){
    this._potholePageService.updateCanvas("Необработанное изображение", "Обработанное изображение", false);
    this.isFilesError = false;
    this.isDefaultState = true;
  }
}
