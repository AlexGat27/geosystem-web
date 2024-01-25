import { ElementRef, Injectable } from "@angular/core";
import { PotholeService } from "../pothole.service";

@Injectable()
export class PotholePageService{
    private canvBefore: ElementRef<HTMLCanvasElement>;
    private canvAfter: ElementRef<HTMLCanvasElement>;

    constructor(private _potholeService: PotholeService){}

    initializeCanvas(canvasBefore: ElementRef<HTMLCanvasElement>, 
        canvasAfter: ElementRef<HTMLCanvasElement>){
            this.canvAfter = canvasAfter;
            this.canvBefore = canvasBefore;
    }

    updateCanvas(textBefore: string | null, textAfter: string | null, isError: boolean){
        const canvasBefore = this.canvBefore.nativeElement;
        const canvasAfter = this.canvAfter.nativeElement;
        const ctxBefore = canvasBefore.getContext('2d');
        const ctxAfter = canvasAfter.getContext('2d');
        ctxAfter.clearRect(0, 0, canvasAfter.width, canvasAfter.height);
        ctxAfter.textAlign = "center"; ctxAfter.font = 'bold 17px sans-serif';
        this.wrapText(ctxAfter, textAfter, canvasAfter.width/2, canvasAfter.height/2, canvasAfter.width, 30);
        if (!isError){
            ctxBefore.clearRect(0, 0, canvasBefore.width, canvasBefore.height);
            ctxBefore.textAlign = "center"; ctxBefore.font = 'bold 17px sans-serif';
            this.wrapText(ctxBefore, textBefore, canvasBefore.width/2, canvasBefore.height/2, canvasBefore.width, 30);
        }
    }

    displayImgBase64(canv: ElementRef<HTMLCanvasElement>, imgBase64: string){
        const canvas = canv.nativeElement;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = imgBase64;
        image.onload= () => {
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
    }
    displayImgVideo(canv: ElementRef<HTMLCanvasElement>, frame: HTMLVideoElement){
        const canvas = canv.nativeElement;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
    }

    errorHandleCanvas(errorLog: string){
        const canvasBefore = this.canvBefore.nativeElement;
        const canvasAfter = this.canvAfter.nativeElement;
        const ctxBefore = canvasBefore.getContext('2d');
        const ctxAfter = canvasAfter.getContext('2d');
        ctxAfter.clearRect(0, 0, canvasAfter.width, canvasAfter.height);
        ctxBefore.fillStyle = "rgba(255, 0, 0, 0.2)";
        ctxAfter.fillStyle = "rgba(255, 0, 0, 0.4)";
        ctxBefore.fillRect(0, 0, canvasBefore.width, canvasBefore.height);
        ctxAfter.fillRect(0, 0, canvasAfter.width, canvasAfter.height);
        ctxAfter.fillStyle = "black";
    
    }

    private wrapText(context, text, marginLeft, marginTop, maxWidth, lineHeight){
        var words = text.split(" ");
        var countWords = words.length;
        var line = "";
        for (var n = 0; n < countWords; n++) {
            var testLine = line + words[n] + " ";
            var testWidth = context.measureText(testLine).width;
            if (testWidth > maxWidth) {
                context.fillText(line, marginLeft, marginTop);
                line = words[n] + " ";
                marginTop += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        context.fillText(line, marginLeft, marginTop);
    }
}