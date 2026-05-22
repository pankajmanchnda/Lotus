const handleDownloadPDF = async () => {
  setIsGeneratingPDF(true);
  const doc = new jsPDF();
  
  // Page 1: Practitioner View
  doc.setFontSize(16);
  doc.text(result!.practitionerPage.title, 20, 20);
  result!.practitionerPage.rows.forEach((row, i) => {
    doc.text(`${row.medication} | ${row.dosage}`, 20, 30 + (i * 10));
  });

  // Page 2: Patient View
  doc.addPage();
  doc.text(result!.patientPage.title, 20, 20);
  // ... similar iteration for simplified rows

  doc.save("Ayurvedic_Protocol.pdf");
  setIsGeneratingPDF(false);
};
