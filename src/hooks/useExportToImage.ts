import html2canvas from 'html2canvas';
import { RefObject } from 'react';

interface ConvertationResult {
  mimeType: string;
  dataUrl: string;
}

interface ExportOptions {
  onExport: (result: ConvertationResult) => void;
  ref: RefObject<HTMLElement>;
}

export function useExportToImage(options: ExportOptions) {
  const { onExport, ref } = options;

  function convert(mimeType: string = 'image/jpeg') {
    if (!ref.current) return;
    html2canvas(ref.current).then((result) => {
      const url = result.toDataURL(mimeType);
      onExport({
        dataUrl: url,
        mimeType: mimeType,
      });
    });
  }

  return convert;
}
