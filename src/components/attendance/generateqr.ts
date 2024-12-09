import { BarcodeFormat, WriterException, QRCodeWriter, EncodeHintType } from '@zxing/library';

const generateQRCode = (text: string, length: number = 200): string => {
  try {
    const writer = new QRCodeWriter();
    const hints = new Map<EncodeHintType, any>();
    hints.set(EncodeHintType.CHARACTER_SET, 'UTF-8'); // Set character encoding
    hints.set(EncodeHintType.ERROR_CORRECTION, 'L'); // Low error correction level

    const bitMatrix = writer.encode(text, BarcodeFormat.QR_CODE, length, length, hints);

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${length}" height="${length}">`;
    for (let x = 0; x < length; x++) {
      for (let y = 0; y < length; y++) {
        if (bitMatrix.get(x, y)) {
          svg += `<rect x="${x}" y="${y}" width="1" height="1" fill="black"/>`;
        }
      }
    }
    svg += '</svg>';

    return svg;
  } catch (error) {
    if (error instanceof WriterException) {
      console.error('Error generating QR code:', error.message);
    }
    throw error;
  }
};

export default generateQRCode;
