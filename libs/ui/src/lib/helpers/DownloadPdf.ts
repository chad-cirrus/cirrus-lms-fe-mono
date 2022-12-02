export function downloadPdf(pdf: Blob, type: string) {
  const formatType =
    type === 'cert' ? 'cirrus-certificate.pdf' : 'cirrus-transcript.pdf';
  const file = new Blob([pdf], { type: 'application/pdf' });
  const fileURL = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = fileURL;
  a.target = '_blank';
  a.download = formatType;
  document.body.appendChild(a);
  a.click();
}
