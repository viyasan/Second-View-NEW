import Tesseract from 'tesseract.js';
import sharp from 'sharp';
import path from 'path';

export interface OcrResult {
  fullText: string;
  pageCount: number;
  confidence: number;
}

async function preprocessImage(imagePath: string): Promise<string> {
  const outputPath = imagePath.replace('.png', '_processed.png');

  // Enhance image for better OCR accuracy
  await sharp(imagePath)
    .grayscale()           // Convert to grayscale
    .normalize()           // Increase contrast
    .sharpen()             // Sharpen text edges
    .toFile(outputPath);

  return outputPath;
}

export async function performOcr(imagePaths: string[]): Promise<OcrResult> {
  const worker = await Tesseract.createWorker('eng');

  const pageTexts: string[] = [];
  let totalConfidence = 0;

  try {
    for (const imagePath of imagePaths) {
      // Preprocess image for better accuracy
      let processedPath: string;
      try {
        processedPath = await preprocessImage(imagePath);
      } catch {
        // If preprocessing fails, use original
        processedPath = imagePath;
      }

      const { data } = await worker.recognize(processedPath);
      pageTexts.push(data.text);
      totalConfidence += data.confidence;
    }

    return {
      fullText: pageTexts.join('\n\n--- PAGE BREAK ---\n\n'),
      pageCount: imagePaths.length,
      confidence: totalConfidence / imagePaths.length,
    };
  } finally {
    await worker.terminate();
  }
}
