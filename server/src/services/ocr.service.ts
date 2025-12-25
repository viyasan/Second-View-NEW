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
  // Process pages in parallel for faster results
  const processPage = async (imagePath: string): Promise<{ text: string; confidence: number }> => {
    const worker = await Tesseract.createWorker('eng');

    try {
      let processedPath: string;
      try {
        processedPath = await preprocessImage(imagePath);
      } catch {
        processedPath = imagePath;
      }

      const { data } = await worker.recognize(processedPath);
      return { text: data.text, confidence: data.confidence };
    } finally {
      await worker.terminate();
    }
  };

  // Process up to 3 pages in parallel to balance speed vs memory
  const batchSize = 3;
  const results: { text: string; confidence: number }[] = [];

  for (let i = 0; i < imagePaths.length; i += batchSize) {
    const batch = imagePaths.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(processPage));
    results.push(...batchResults);
  }

  const totalConfidence = results.reduce((sum, r) => sum + r.confidence, 0);

  return {
    fullText: results.map(r => r.text).join('\n\n--- PAGE BREAK ---\n\n'),
    pageCount: imagePaths.length,
    confidence: totalConfidence / results.length,
  };
}
