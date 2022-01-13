import { PDFDocument, StandardFonts, rgb, degrees, grayscale } from "pdf-lib";
import download from "downloadjs";
import { collection, getDocs } from "firebase/firestore/lite";
import db from "./firebase/clientApp";

export function thousandSeparator(num, decimals) {
  const formatedNum = num.toFixed(decimals);
  return formatedNum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function formatDate(date, locale, options) {
  return new Intl.DateTimeFormat(locale, options).format(date);
}

export async function createPdf(data) {
  const snapshot = await getDocs(collection(db, "invoiceCount"));
  const invoiceCountArr = snapshot.docs.map(doc => doc.data());
  const invoiceCount = invoiceCountArr[0].count;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const {
    clientName,
    idType,
    idNumber,
    addres1,
    addres2,
    city,
    department,
    orderedProducts,
  } = data;
  const pageConfig = {
    width: 595,
    height: 420,
    leftColX: 15,
    rightColX: 280,
  };
  const { width, height, leftColX, rightColX } = pageConfig;
  const tablePositionX = {
    col1: leftColX + 5,
    col2: leftColX + 130,
    col3: leftColX + 235,
    col4: leftColX + 335,
  };
  const fontStyles = {
    size: 11,
    font: timesRomanFont,
    // color: rgb(0, 0.53, 0.71),
  };

  function addInvoiceData() {
    const invoiceDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(invoiceDate.getDate() + 30);
    const formatedInvoiceDate = formatDate(invoiceDate, "es");
    const formatedDueDate = formatDate(dueDate, "es");
    page.drawText(`Cuenta de cobro N° ${invoiceCount}`, {
      ...fontStyles,
      x: rightColX,
      y: height - 20,
    });
    page.drawText(`Fecha: ${formatedInvoiceDate}`, {
      ...fontStyles,
      x: rightColX,
      y: height - 35,
    });
    page.drawText(`Vence: ${formatedDueDate}`, {
      ...fontStyles,
      x: rightColX,
      y: height - 50,
    });
  }

  function addLeftHeader() {
    const props = {
      x: leftColX,
      ...fontStyles,
    };
    page.drawText("Cliente:", { ...props, y: height - 95 });
    page.drawText(clientName, { ...props, y: height - 110 });
    page.drawText(`${idType} ${idNumber}`, { ...props, y: height - 125 });
    page.drawText(`${addres1}. ${addres2}`, { ...props, y: height - 140 });
    page.drawText(`${city}, ${department}`, { ...props, y: height - 155 });
  }

  function addRightHeader() {
    const props = {
      x: rightColX,
      ...fontStyles,
    };
    page.drawText("Debe A:", { ...props, y: height - 95 });
    page.drawText("Catalina Restrepo", { ...props, y: height - 110 });
    page.drawText("CC 1.039.454.392", { ...props, y: height - 125 });
    page.drawText("Ahorros Bancolombia", { ...props, y: height - 140 });
    page.drawText("N°693 657 886 85", { ...props, y: height - 155 });
  }

  function addTableHeader() {
    page.drawText("PRODUCTO", { ...fontStyles, x: tablePositionX.col1, y: height - 200 });
    page.drawText("CANTIDAD", { ...fontStyles, x: tablePositionX.col2, y: height - 200 });
    page.drawText("PRECIO", { ...fontStyles, x: tablePositionX.col3, y: height - 200 });
    page.drawText("TOTAL", { ...fontStyles, x: tablePositionX.col4, y: height - 200 });
  }

  function addProducts() {
    addTableHeader();
    let newLineY = 200;
    const props = { ...fontStyles, y: height - newLineY };
    orderedProducts.forEach(product => {
      const discountedPrice = product.price - product.price * product.discount;
      newLineY += 20;
      props.y = height - newLineY;
      page.drawText(product.item, {
        ...props,
        x: tablePositionX.col1,
      });
      page.drawText(String(product.quantity), {
        ...props,
        x: tablePositionX.col2,
      });
      page.drawText(`$${thousandSeparator(discountedPrice, 0)}`, {
        ...props,
        x: tablePositionX.col3,
      });
      page.drawText(`$${thousandSeparator(product.subtotal, 0)}`, {
        ...props,
        x: tablePositionX.col4,
      });
    });
  }

  function addFooter() {
    page.drawText("Observaciones", { ...fontStyles, x: leftColX, y: 80 });
    page.drawText("Recibido Por:", { ...fontStyles, x: rightColX, y: 80 });
    page.drawText(
      "DE LA TIERRA - Cll 6 sur # 50 - 30. Medellín - Cel. 304 4070005 - WP 305 4806327",
      { ...fontStyles, size: 9, x: leftColX * 2, y: 10 }
    );
  }

  page.setSize(width, height);
  addInvoiceData();
  addLeftHeader();
  addRightHeader();
  addProducts();
  addFooter();
  page.drawRectangle({
    x: leftColX,
    y: 210 - orderedProducts.length * 20,
    width: width - 200,
    height: 25 + orderedProducts.length * 20,
    borderWidth: 1,
    borderColor: grayscale(0.5),
    opacity: 0.5,
    borderOpacity: 0.75,
  });

  const jpgUrl = "https://pdf-lib.js.org/assets/cat_riding_unicorn.jpg";
  const jpgImageBytes = await fetch(jpgUrl).then(res => res.arrayBuffer());
  const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
  page.drawImage(jpgImage, {
    x: leftColX,
    y: height - 70,
    width: 100,
    height: 60,
    opacity: 0.75,
  });

  try {
    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");
  } catch (error) {
    console.log(error);
  }
}
