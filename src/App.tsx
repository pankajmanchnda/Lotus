const handleDownloadPDF = async () => {
  const doc = new jsPDF();
  
  // Page 1: Practitioner
  doc.setFontSize(16);
  doc.text("Practitioner Clinical Notes", 20, 20);
  // Add table logic here iterating over result.practitionerPage.rows
  
  // Page 2: Patient
  doc.addPage();
  doc.setFontSize(16);
  doc.text("Your Daily Wellness Plan", 20, 20);
  // Add table logic here iterating over result.patientPage.rows
  
  doc.save("Ayurvedic_Protocol.pdf");
};
