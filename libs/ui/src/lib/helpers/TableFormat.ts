export const formatTranscript = (row: any) => {
  return row.transcript_available ? 'Download' : 'In Progress';
};

export const formatCertificate = (row: any) => {
  console.log('row', row);
  const completedOrProgress =
    row.progress.status === 'completed' ? 'Completed' : 'In Progress';

  return row.user_certificate ? 'Download' : completedOrProgress;
};
