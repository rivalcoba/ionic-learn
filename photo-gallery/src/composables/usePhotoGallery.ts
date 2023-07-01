import { ref, onMounted, watch, resolveComponent } from 'vue';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

const convertBlobToBase64 = (blob: Blob) => new Promise((res, rej) => {
  const reader = new FileReader();
  reader.onerror = rej;
  reader.onload = () => {
    res(reader.result);
  };
  reader.readAsDataURL(blob);
});

const photos = ref<UserPhoto[]>([]);

const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
  // TODO: https://ionicframework.com/docs/vue/your-first-app/saving-photos
}

export const usePhotoGallery = () => {
    const takePhoto = async () => {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });
      
      const fileName = Date.now() + '.jpeg';
      const savedFileImage = {
        filepath: fileName,
        webviewPath: photo.webPath
      };

      photos.value = [savedFileImage, ...photos.value];
    };
  
    return {
      photos,
      takePhoto,
    };
  };