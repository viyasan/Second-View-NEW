import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export interface PdfConversionResult {
  imagePaths: string[];
  pageCount: number;
}

export async function convertPdfToImages(pdfPath: string): Promise<PdfConversionResult> {
  const timestamp = Date.now();
  const outputDir = path.join(process.cwd(), 'uploads', 'temp', timestamp.toString());

  await fs.mkdir(outputDir, { recursive: true });

  const outputPrefix = path.join(outputDir, 'page');

  // Use pdftoppm from poppler to convert PDF to PNG images
  // -png: output PNG format
  // -r 300: 300 DPI for good OCR quality
  const command = `pdftoppm -png -r 300 "${pdfPath}" "${outputPrefix}"`;

  try {
    await execAsync(command);

    // Get list of generated images
    const files = await fs.readdir(outputDir);
    const imagePaths = files
      .filter(f => f.endsWith('.png'))
      .sort()
      .map(f => path.join(outputDir, f));

    return {
      imagePaths,
      pageCount: imagePaths.length,
    };
  } catch (error) {
    // Clean up on error
    await fs.rm(outputDir, { recursive: true, force: true }).catch(() => {});
    throw new Error(`PDF conversion failed: ${error}`);
  }
}

export async function cleanupTempFiles(imagePaths: string[]): Promise<void> {
  if (imagePaths.length === 0) return;

  // Get the parent directory (temp folder with timestamp)
  const tempDir = path.dirname(imagePaths[0]);

  try {
    await fs.rm(tempDir, { recursive: true, force: true });
  } catch (error) {
    console.error('Failed to cleanup temp files:', error);
  }
}
