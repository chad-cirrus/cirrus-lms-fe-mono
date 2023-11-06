import { PdfDownloadFile } from '@cirrus/models';

export function downloadPdf(pdf: PdfDownloadFile) {
  const file = new Blob([pdf.file], { type: 'application/pdf' });
  const fileURL = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = fileURL;
  a.target = '_blank';
  a.download = pdf.filename
  document.body.appendChild(a);
  a.click();
}
