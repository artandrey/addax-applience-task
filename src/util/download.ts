import { PlannedDate, Tag } from '../types/Planner';

export function download(url: string, filename?: string) {
  const link = document.createElement('a');
  link.download = filename ?? 'filename';
  link.href = url;
  link.click();
}

export function getFormatFromImageMime(mime: string) {
  return mime.split('/')[1];
}

export function exportTableToJsonFile(dates: Record<string, PlannedDate>, tags: Tag[]) {
  const result = JSON.stringify({
    dates,
    tags,
  });
  const uri = 'data:application/json;charset=utf-8,' + encodeURIComponent(result);
  download(uri, 'table.json');
}
