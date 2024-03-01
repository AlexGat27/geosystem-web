import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CameraService } from 'src/app/modules/webapp/services/camera.service';
import { PotholeService } from 'src/app/core/services/pothole.service';

@Component({
  selector: 'app-process-media-page',
  templateUrl: './process-media-page.component.html',
  styleUrls: ['./process-media-page.component.css'],
  viewProviders: [CameraService]
})
export class ProcessMediaPageComponent implements AfterViewInit{
  @ViewChild('videoElement') videoElementRef!: ElementRef;
  @ViewChild('divElement') divElementRef!: ElementRef;
  @ViewChild('imageBeforeElement') imageBeforeElement!: ElementRef;
  @ViewChild('imageAfterElement') imageAfterElement!: ElementRef;
  imageAfter: HTMLImageElement;
  imageBefore: HTMLImageElement;
  errorText: string = "";
  isDefaultState = true;
  isFilesError = false;
  isCameraActive = false;

  constructor(private _cameraService: CameraService,
    private _potholeService: PotholeService){}

  ngAfterViewInit() {
    this.imageAfter = this.imageAfterElement.nativeElement;
    this.imageBefore = this.imageBeforeElement.nativeElement;
    this.resetCanvas();
  }

  toggleCamera(){
    if (this.isCameraActive){
      this.isCameraActive = false;
      console.log(this.isCameraActive);
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
    this.setImgVideoURL(videoFrame);
    this._cameraService.CaptureScreenshot(videoFrame)
    .then(imageFile => {
      this._cameraService.HideCamera();
      this._cameraService.GetCameraPosition()
      .then(position =>{
        this._potholeService.imageProcessing(imageFile, position).subscribe((response) => {
          const imageAfterURL = 'data:image/jpeg;base64,' + response;
          this.setImgBase64URL(imageAfterURL);
        }, er => {
          this.isFilesError = true;
          this.errorText = er.error;
          console.log(er.error);
        });
      }).catch(er => {console.error(er);})
    }).catch(er => {console.error(er);});
  }

  resetCanvas(){
    this.imageBefore.width = 0; this.imageBefore.height = 0; this.imageAfter.width = 0; this.imageAfter.height = 0;
    this.imageBefore.src = ""; this.imageAfter.src = "";
    this.errorText = "";
    this.isFilesError = false;
    this.isDefaultState = true;
  }

  private setImgVideoURL(video: HTMLVideoElement){
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const divElement: HTMLDivElement = this.divElementRef.nativeElement;
    setTimeout(()=>{
      this.imageBefore.height = canvas.height = divElement.offsetHeight;
      this.imageBefore.width = canvas.width = divElement.offsetHeight * video.videoWidth / video.videoHeight;
      console.log(canvas.height, canvas.width)
      console.log(divElement.offsetHeight, divElement.offsetWidth)
    })
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    this.imageBefore.src = canvas.toDataURL('image/png');
  }
  private setImgBase64URL(url: string){
    this.imageAfter.height = this.imageBefore.height;
    this.imageAfter.width = this.imageBefore.width;
    this.imageAfter.src = url;
  }
}
