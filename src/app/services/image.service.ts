import { Injectable, inject } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly storage: Storage = inject(Storage);

  async uploadImage(file: File): Promise<string> {
    const storageRef = ref(this.storage, `products/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }
}
