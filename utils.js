import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import download from "downloadjs";

export function thousandSeparator(num, decimals) {
  const formatedNum = num.toFixed(decimals);
  return formatedNum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export async function createPdf(data) {
  console.log(data)
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const page = pdfDoc.addPage();
  page.setSize(500, 354);
  const { width, height } = page.getSize();
  const fontStyles = {
    size: 11,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  };

  page.drawText("Cliente:", {
    x: 10,
    y: height - 50,
    ...fontStyles,
  });
  page.drawText(data.clientName, {
    x: 10,
    y: height - 65,
    ...fontStyles,
  });
  page.drawText(`${data.idType} ${data.idNumber}`, {
    x: 10,
    y: height - 80,
    ...fontStyles,
  });

  try {
    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");
  } catch (error) {
    console.log(error);
  }
}
