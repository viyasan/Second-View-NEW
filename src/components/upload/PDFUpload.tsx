import React, { useState, useCallback } from 'react';
import { Upload, FileText, Loader2, AlertCircle, X } from 'lucide-react';

export interface ExtractedBiomarker {
  name: string;
  displayName: string;
  value: number;
  unit: string;
  normalRangeMin: number;
  normalRangeMax: number;
  category: string;
  confidence: number;
  rawText: string;
}

interface PDFUploadProps {
  onExtracted: (biomarkers: ExtractedBiomarker[]) => void;
  onError: (error: string) => void;
  onBack: () => void;
}

export const PDFUpload: React.FC<PDFUploadProps> = ({ onExtracted, onError, onBack }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = useCallback((selectedFile: File) => {
    if (selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      onError('Please select a PDF file');
    }
  }, [onError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  }, [handleFileSelect]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress('Uploading PDF...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadProgress('Processing with OCR (this may take a minute)...');

      // Use environment variable for API URL in production, fallback to relative path for dev
      const apiBase = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiBase}/api/ocr/process`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        if (result.data.extractedBiomarkers.length === 0) {
          onError('No biomarkers found in the PDF. Please try manual entry or upload a different file.');
        } else {
          onExtracted(result.data.extractedBiomarkers);
        }
      } else {
        onError(result.error?.message || 'Failed to process PDF');
      }
    } catch (err) {
      onError('Failed to connect to server. Make sure the backend is running.');
    } finally {
      setIsUploading(false);
      setUploadProgress('');
    }
  };

  const clearFile = () => {
    setFile(null);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
        >
          ← Back to options
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Upload Your Blood Test
        </h1>
        <p className="text-gray-600">
          Upload a PDF of your lab report and we'll extract the biomarker values automatically
        </p>
      </div>

      {/* Upload Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center transition-all
          ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${file ? 'bg-green-50 border-green-300' : ''}
        `}
      >
        {!file ? (
          <>
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drop your PDF here, or click to browse
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Maximum file size: 10MB
            </p>
            <label className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
              <FileText className="w-5 h-5" />
              Select PDF
              <input
                type="file"
                accept="application/pdf"
                onChange={handleInputChange}
                className="hidden"
              />
            </label>
          </>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            {!isUploading && (
              <button
                onClick={clearFile}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Progress */}
      {isUploading && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          <span className="text-blue-700">{uploadProgress}</span>
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-semibold"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Extract Biomarkers
            </>
          )}
        </button>
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-amber-50 rounded-lg flex gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-medium mb-1">Tips for best results:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Use a clear, high-quality scan of your lab report</li>
            <li>Make sure the PDF is not password-protected</li>
            <li>You'll be able to review and correct extracted values</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
