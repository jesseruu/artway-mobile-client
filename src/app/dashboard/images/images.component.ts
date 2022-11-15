import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { ImagesServices } from 'src/app/services/image.service';

const IMAGE_DIR = 'stored-image';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {

  image: LocalFile;
  images: any[];
  preview = false;
  isButtonDisabled = true;
  name: string;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    private plt: Platform,
    private imageService: ImagesServices
  ) { }

  ngOnInit() { }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Espera un momento',
      spinner: 'circular'
    });

    loading.present();
    return loading;
  }

  async loadFiles() {

    const loading = await this.showLoading();
    console.log('Go here');
    await Filesystem.readdir({
      path: IMAGE_DIR,
      directory: Directory.Data
    })
      .then(
        (result) => {
          console.log(result);
          this.loadFileData(result.files);
        },
        async (err) => {
          // Folder does not yet exists!
          await Filesystem.mkdir({
            path: IMAGE_DIR,
            directory: Directory.Data
          });
        }
      )
      .then(async (_) => {
        loading.dismiss();
      });
  }

  async loadFileData(fileNames: any[]) {
    console.log(fileNames);
    for (const f of fileNames) {
      console.log(f);

      const readFile = await Filesystem.readFile({
        path: f.uri
      });

      this.image = {
        name: '',
        path: f.uri,
        data: `data:image/jpeg;base64,${readFile.data}`
      };

      console.log(this.image);
    }
  }

  async selectImage() {
    await this.clear();
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos // Camera, Photos or Prompt!
    });

    if (image) {
      this.saveImage(image);
    }
  }

  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data
    });

    // Reload the file list
    // Improve by only loading for the new image and unshifting array!
    this.loadFiles();
  }

  async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  async deleteFile() {

    try {
      await Filesystem.readdir({
        path: IMAGE_DIR,
        directory: Directory.Data
      }).then((result) => {
        result.files.forEach(async (file) => {
          await Filesystem.deleteFile({
            path: file.uri
          });
        });
      });
    } catch (error) {
      await Filesystem.mkdir({
        path: IMAGE_DIR,
        directory: Directory.Data
      });
    }
  }

  goBack() {
    this.router.navigate(['dashboard/home']);
  }

  getName(event: any) {
    this.name = event.detail.value;
    this.image.name = this.name;
  }

  checkInputs() {
    if (this.name) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }

  async upload() {
    const loading = await this.showLoading();
    this.imageService.uploadImage(this.image.name, this.image.data).subscribe(
      result => {
        console.log(result);
        this.router.navigate(['dashboard/home']);
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }

  async clear() {
    this.isButtonDisabled = true;
    this.image = null;
    this.name = null;
    await this.deleteFile();
  }
}
