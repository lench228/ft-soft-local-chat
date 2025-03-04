const loadState = <T>(initialState: T, isSession: boolean, name: string): T => {
  try {
    console.log(sessionStorage.getItem(name));
    const serializedState = isSession
      ? sessionStorage.getItem(name)
      : localStorage.getItem(name);
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch {
    return initialState;
  }
};

const saveState = <T>(state: T, isSession: boolean, name: string) => {
  try {
    const serializedState = JSON.stringify(state);

    if (isSession) sessionStorage.setItem(name, serializedState);
    else localStorage.setItem(name, serializedState);
  } catch (err) {
    console.error(err);
  }
};
// Вроде самое простое сжатие, работает, до оптимизации, мог загрузить в сумме картинок 10 максимум)
async function compressImage(
  blob: Blob,
  maxWidth: number,
  maxHeight: number,
  quality: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Не удалось получить контекст canvas"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (newBlob) => {
          if (newBlob) {
            resolve(newBlob);
          } else {
            reject(new Error("Не удалось создать Blob из canvas"));
          }
        },
        "image/jpeg",
        quality,
      );
    };
    img.onerror = (error) => {
      reject(error);
    };

    img.src = URL.createObjectURL(blob);
  });
}

async function saveBlobToLocalStorage(blob: Blob, key: string) {
  try {
    const compressedBlob = await compressImage(blob, 800, 600, 0.7);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          localStorage.setItem(key, reader.result as string);
          resolve(key);
        } catch (error) {
          console.error("Ошибка при сохранении в localStorage:", error);
          reject(error);
        }
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsDataURL(compressedBlob);
    });
  } catch (error) {
    console.error("Ошибка при сжатии изображения:", error);
    throw error;
  }
}
// В идеале использовать service-worker и хранить в кэше, тк в localStorage не хватает памяти под нормальную работу,
// Но я в этом не силен, поэтому останется так( + как я понимаю нужен https
async function loadBlobFromLocalStorage(key: string): Promise<Blob> {
  const base64String = localStorage.getItem(key);
  if (base64String) {
    try {
      const response = await fetch(base64String);

      return await response.blob();
    } catch (error) {
      console.error("Ошибка при декодировании Data URL в Blob:", error);
      return new Blob();
    }
  }
  return new Blob();
}

export {
  saveState,
  loadState,
  loadBlobFromLocalStorage,
  saveBlobToLocalStorage,
};
