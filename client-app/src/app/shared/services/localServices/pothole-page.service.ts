import { ElementRef, Injectable } from "@angular/core";
import { PotholeService } from "../pothole.service";

@Injectable()
export class PotholePageService{
    private canvBefore: ElementRef<HTMLCanvasElement>;
    private canvAfter: ElementRef<HTMLCanvasElement>;
    private defaultWidth: number;
    constructor(private _potholeService: PotholeService){}

    initializeCanvas(canvasBefore: ElementRef<HTMLCanvasElement>, 
        canvasAfter: ElementRef<HTMLCanvasElement>){
            this.canvAfter = canvasAfter;
            this.canvBefore = canvasBefore;
            this.defaultWidth = canvasAfter.nativeElement.width;
    }

    updateCanvas(textAfter: string | null){
        const canvasBefore = this.canvBefore.nativeElement;
        const canvasAfter = this.canvAfter.nativeElement;
        const ctxBefore = canvasBefore.getContext('2d');
        const ctxAfter = canvasAfter.getContext('2d');
        canvasAfter.width = this.defaultWidth;
        ctxAfter.clearRect(0, 0, canvasAfter.width, canvasAfter.height);
        if (textAfter){
            ctxAfter.textAlign = "center"; ctxAfter.font = 'bold 17px sans-serif';
            this.wrapText(ctxAfter, textAfter, canvasAfter.width/2, canvasAfter.height/2, canvasAfter.width, 30);
        }else {
            canvasBefore.width = this.defaultWidth;
            ctxBefore.clearRect(0, 0, canvasBefore.width, canvasBefore.height);
        }
    }

    displayImgBase64(canv: ElementRef<HTMLCanvasElement>, imgBase64: string){
        const canvas = canv.nativeElement;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = imgBase64;
        console.log(image);
        image.onload= () => {
          ctx.drawImage(image, 0, 0, canvas.height / image.height * canvas.width, canvas.height);
        }
    }
    displayImgVideo(canv: ElementRef<HTMLCanvasElement>, frame: HTMLVideoElement){
        const canvas = canv.nativeElement;
        const ctx = canvas.getContext('2d');
        console.log(canvas.height, canvas.width);

        const normWidth = canvas.height / frame.videoHeight * frame.videoWidth;
        console.log(frame.videoHeight, frame.videoWidth);
        console.log((canvas.width - normWidth) / 2, (canvas.width + normWidth) / 2);
        ctx.drawImage(frame, (canvas.width - normWidth) / 2, 0, normWidth, canvas.height);
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