export const formatTranscript = (row: any) => {
  return row.transcript_available ? 'Download' : 'In Progress';
};

export const formatCertificate = (row: any) => {
  const completedOrProgress =
    row.progress.status === 'completed' ? 'Completed' : 'In Progress';

  return row.user_certificates?.length > 0 ? 'Download' : completedOrProgress;
};
