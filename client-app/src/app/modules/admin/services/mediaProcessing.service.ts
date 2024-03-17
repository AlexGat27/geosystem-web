import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import * as EXIF from "exif-js";
import { Observable, Subject, catchError, of, switchMap } from "rxjs";


@Injectable()
export class MediaProcessingService {
    constructor(private http: HttpClient) {}

    private uploading: boolean = false;
    private currentIndex: number = 0;
  
    private uploadProgressSubject = new Subject<number>();
    uploadProgress$ = this.uploadProgressSubject.asObservable();
  
    startUpload(files: File[]) {
      this.uploading = true;
      this.currentIndex = 0;
      this.uploadFiles(files).subscribe(()=>{
        console.log("succe");
      });
    }
  
    stopUpload() {
      this.uploading = false;
    }
  
    uploadFiles(files: File[]): Observable<any> {
        if (this.currentIndex >= files.length) {
          // Если индекс текущего файла больше или равен общему количеству файлов,
          // значит, все файлы были успешно загружены, и мы завершаем процесс.
          return of('All files uploaded successfully');
        }
    
        const file = files[this.currentIndex];
        const formData = new FormData();
        formData.append('file', file);
        console.log(formData)
        return this.http.post<any>('/api/v1/admin/mediaProcessing', formData).pipe(
          switchMap(() => {
            // Переходим к следующему файлу после успешной загрузки текущего файла
            this.currentIndex++;
            // Рекурсивно вызываем функцию для следующего файла
            return this.uploadFiles(files);
          }),
          catchError(error => {
            console.error('Ошибка при загрузке файла:', error);
            // В случае ошибки, завершаем процесс и передаем ошибку дальше
            return of(error);
          })
        );
      }
}