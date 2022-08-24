export const formatTranscript = (row: any) => {
  return row.transcript_available ? 'Download' : 'In Progress';
};

export const formatCertificate = (row: any) => {
  return row.user_certificate ? 'Download' : 'In Progress';
};
