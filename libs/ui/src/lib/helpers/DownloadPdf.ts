export function downloadPdf(pdf: Blob) {
  const file = new Blob([pdf], { type: 'application/pdf' });
  const fileURL = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = fileURL;
  a.target = '_blank';
  a.download = 'cirrus-certificate.pdf';
  document.body.appendChild(a);
  a.click();
}
