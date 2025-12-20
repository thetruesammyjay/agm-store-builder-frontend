import { useMutation } from '@tanstack/react-query';
import { upload } from '@/lib/api';

interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export function useUpload() {
  return useMutation({
    mutationFn: async ({
      file,
      type,
      onProgress,
    }: {
      file: File;
      type: 'logo' | 'product' | 'banner';
      onProgress?: (progress: UploadProgress) => void;
    }) => {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', type);

      const response = await upload<{ success: boolean; data: { url: string } }>(
        '/upload/image',
        formData,
        (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress({
              loaded: progressEvent.loaded,
              total: progressEvent.total,
              percentage,
            });
          }
        }
      );

      return response.data.url;
    },
  });
}
