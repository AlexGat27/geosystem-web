import { Injectable } from '@angular/core';

@Injectable()
export class CameraService {

  private stream: MediaStream;

  async ShowCamera(videoElement: HTMLVideoElement){
    try{
      this.stream = await navigator.mediaDevices.getUserMedia({video: true})
      videoElement.srcObject = this.stream;
    }catch (er){
      console.error("Есть проблемы с камерой: ", er);
    }
  }

  HideCamera(){
    if (this.stream){
      this.stream.getTracks().forEach(track => track.stop())
    }
  }

  captureAndSendScreenshot(frame: HTMLVideoElement): Promise<Blob>{
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
}
