import { storage, ID, InputFile } from './appwrite';
import * as FileSystem from 'expo-file-system';

const BUCKET_ID = '689e1cbf002bf73a9b8e';

function getMimeType(fileName) {
  const ext = (fileName || '').split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    default:
      return 'application/octet-stream';
  }
}

async function normalizeToFilePath(uri, name) {
  if (typeof uri !== 'string') {
    throw new Error('Invalid file uri');
  }
  if (uri.startsWith('content://')) {
    const dest = `${FileSystem.cacheDirectory}${name || `upload_${Date.now()}`}`;
    await FileSystem.copyAsync({ from: uri, to: dest });
    return dest;
  }
  return uri;
}

/* fileUriToBlob removed: using InputFile or RN file object */

const ImageUploadService = {
  async uploadImage(file) {
    if (!file?.uri) {
      throw new Error('No file to upload');
    }

    const fileName = file.name || `upload_${Date.now()}`;
    const path = await normalizeToFilePath(file.uri, fileName);
    
    const hasFromFile = !!(InputFile && typeof InputFile.fromFile === 'function');
    const input = hasFromFile
      ? InputFile.fromFile(path, fileName)
      : { uri: path, name: fileName, type: getMimeType(fileName) };
    
    console.log('[ImageUploadService.uploadImage]', { method: hasFromFile ? 'InputFile.fromFile' : 'RNFileObject', path, fileName });
    
    const response = await storage.createFile(BUCKET_ID, ID.unique(), input);
    return response.$id;
  },

  getImageUrl(fileId) {
    const url = storage.getFileView(BUCKET_ID, fileId);
    return typeof url === 'string' ? url : url?.toString?.() || '';
  },
};

export default ImageUploadService;
