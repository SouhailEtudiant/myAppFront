import { HttpClient, HttpEventType, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EnvironmentUrlService } from '../../services/environment-url.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  progress: number=0;
  message: string="";

  @Output() public onUploadFinished = new EventEmitter();
  
  constructor(private http: HttpClient, private envUrl : EnvironmentUrlService ,) { }

  ngOnInit() {
   
    
  }

  uploadFile = (files: FileList | null) => {
    if (files?.length === 0) {
      return ; 
    }

    let fileToUpload = <File>files?.[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.http.post(this.envUrl.urlAddress+'/api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / (event.total || 1));
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }

  // uploadFile = (files) => {
  //   if (files.length === 0) {
  //     return;
  //   }

  //   let filesToUpload : File[] = files;
  //   const formData = new FormData();
    
  //   Array.from(filesToUpload).map((file, index) => {
  //     return formData.append('file'+index, file, file.name);
  //   });

  //   this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
  //     .subscribe(
  //       {next: (event) => {
  //       if (event.type === HttpEventType.UploadProgress)
  //         this.progress = Math.round(100 * event.loaded / event.total);
  //       else if (event.type === HttpEventType.Response) {
  //         this.message = 'Upload success.';
  //         this.onUploadFinished.emit(event.body);
  //       }
  //     },
  //     error: (err: HttpErrorResponse) => console.log(err)
  //   });
  // }
}
