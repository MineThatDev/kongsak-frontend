export default function file() {
  const openFiles = (files) => {
    if (files && files.length) {
      for (const file of files) {
        const dataUrl = `data:image/png;base64,${file.content}`;
        const newTab = window.open();
        newTab.document.write(`<img src="${dataUrl}" alt="File Preview"/>`);
      }
    }
  };
  const createUrlFromBase64 = (content) => {
      const dataUrl = `data:image/png;base64,${content}`;
      return dataUrl
  };
  const createUrlFromFile = (file) => {
    if (file && file.name) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(file);
      });
    }
  };
  return { openFiles, createUrlFromFile, createUrlFromBase64 };
}
