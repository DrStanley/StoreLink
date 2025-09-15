import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }
  /**
   * Asynchronously uploads an image file and returns its data URL as a string.
   *
   * This method reads the provided `File` object using a `FileReader` and resolves
   * with the base64-encoded data URL representation of the image. If an error occurs
   * during reading, the promise is rejected with the error.
   *
   * @param file - The image file to be uploaded.
   * @returns A promise that resolves to the data URL string of the image.
   *
   * @example
   * ```typescript
   * const imageUrl = await uploadImage(file);
   * console.log(imageUrl); // "data:image/png;base64,..."
   * ```
   */
  async uploadImage(file: File): Promise<string> {
    if (!file) {
      return null;
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}
