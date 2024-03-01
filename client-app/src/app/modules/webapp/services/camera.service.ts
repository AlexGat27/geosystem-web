import { Injectable } from '@angular/core';

@Injectable()
export class CameraService {

  private stream: MediaStream;

  ShowCamera(): Promise<MediaStream> {
    const videoConstraints: MediaStreamConstraints = {video: {facingMode: 'environment'}, audio: false};
    return navigator.mediaDevices.getUserMedia(videoConstraints)
    .then(stream => {
      return this.GetCameraPosition().then(pos =>{
        this.stream = stream;
        return stream;
      })
    })
  }

  HideCamera(){
    if (this.stream){
      this.stream.getTracks().forEach(track => track.stop())
    }
  }

  CaptureScreenshot(frame: HTMLVideoElement): Promise<Blob>{
    return new Promise<Blob>((resolve, reject) => {
        const canvas = document.createElement('canvas');
        canvas.width = frame.videoWidth;
        canvas.height = frame.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob: Blob | null) => {
          if (blob){
              resolve(blob);
          }else{
              reject(new Error('Unable to capture and save the file.'));
          }
        }, 'image/jpeg');
    })
  }
  GetCameraPosition(): Promise<GeolocationPosition>{
    return new Promise<GeolocationPosition>((resolve, reject) =>{
      navigator.geolocation.getCurrentPosition(pos =>{
        console.log(pos.coords);
        resolve(pos);
      },
        er =>{reject(er)});
    })
  }
}
