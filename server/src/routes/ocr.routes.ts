import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { convertPdfToImages, cleanupTempFiles } from '../services/pdf.service.js';
import { performOcr } from '../services/ocr.service.js';
import { extractBiomarkers } from '../services/biomarker.service.js';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
});

router.post('/process', upload.single('file'), async (req: Request, res: Response) => {
  const startTime = Date.now();
  let imagePaths: string[] = [];
  let pdfPath: string | undefined;

  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        error: {
          code: 'NO_FILE',
          message: 'No PDF file uploaded',
        },
      });
      return;
    }

    pdfPath = req.file.path;

    // Step 1: Convert PDF to images
    console.log('Converting PDF to images...');
    const conversionResult = await convertPdfToImages(pdfPath);
    imagePaths = conversionResult.imagePaths;

    if (imagePaths.length === 0) {
      res.status(400).json({
        success: false,
        error: {
          code: 'CONVERSION_FAILED',
          message: 'Failed to convert PDF to images',
        },
      });
      return;
    }

    // Step 2: Perform OCR on images
    console.log(`Performing OCR on ${imagePaths.length} page(s)...`);
    const ocrResult = await performOcr(imagePaths);

    // Step 3: Extract biomarkers from OCR text
    console.log('Extracting biomarkers...');
    const extractedBiomarkers = extractBiomarkers(ocrResult.fullText);

    const processingTimeMs = Date.now() - startTime;

    res.json({
      success: true,
      data: {
        extractedBiomarkers,
        rawOcrText: ocrResult.fullText,
        pageCount: ocrResult.pageCount,
        ocrConfidence: ocrResult.confidence,
        processingTimeMs,
      },
    });
  } catch (error) {
    console.error('OCR processing error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'PROCESSING_FAILED',
        message: error instanceof Error ? error.message : 'OCR processing failed',
      },
    });
  } finally {
    // Cleanup temporary files
    if (imagePaths.length > 0) {
      await cleanupTempFiles(imagePaths);
    }
    if (pdfPath) {
      await fs.unlink(pdfPath).catch(() => {});
    }
  }
});

export { router as ocrRouter };
