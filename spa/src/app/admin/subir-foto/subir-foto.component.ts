import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Foto } from 'src/app/Models/Foto';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-subir-foto',
  templateUrl: './subir-foto.component.html',
  styleUrls: ['./subir-foto.component.css']
})
export class SubirFotoComponent implements OnInit {
  @Input() productoId: number;
  @Output() addFoto = new EventEmitter<Foto>();
  Foto: Foto;
  fotoActual: Foto;
  public uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.UrlApi;
  constructor() { }

  ngOnInit() {
    this.iniciarUpload();
   // this.obtenerFotos();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  iniciarUpload() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'Admin/' + this.productoId + '/Foto',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Foto = JSON.parse(response);
        const foto = {
          id: res.id,
          url: res.url,
          productoId: res.productoId,
          descripcion: res.descripcion,
          fecha: res.fecha,
          estado: res.estado,
          esPrincipal: res.esPrincipal
        };
        this.addFoto.emit(foto);
        }
    };
  }

}
