import React, { useState, useEffect } from 'react';
import { Play, Pause, Download, RefreshCw, CheckCircle, XCircle, AlertCircle, FileText, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/Alert';
import { useNavigate } from 'react-router-dom';

function BatchExtraction() {
  const [status, setStatus] = useState('ready'); // ready, running, paused, completed
  const [currentStudyIndex, setCurrentStudyIndex] = useState(0);
  const [extractedData, setExtractedData] = useState({});
  const [errors, setErrors] = useState([]);
  const [validationResults, setValidationResults] = useState({});

  // Sample papers (same as before)
  const papers = Array.from({ length: 45 }, (_, index) => ({
    id: index + 1,
    title: [
      "Impact Assessment of Treatment Intervention on Student Performance",
      "Experimental Analysis of Intervention Outcomes in Educational Settings",
      "Comparative Study of Treatment Effects on Learning Outcomes",
      "Randomized Control Trial of Educational Intervention",
      "Longitudinal Analysis of Treatment Impact on Achievement"
    ][index % 5] + ` (Study ${index + 1})`,
    year: 2018 + (index % 5),
    status: 'pending' // pending, processing, completed, error
  }));

  const validateData = (data) => {
    const validationIssues = [];
    // Add validation logic here
    return validationIssues;
  };

  const handleStartExtraction = () => {
    setStatus('running');
    // Implement extraction logic
  };

  const handlePauseExtraction = () => {
    setStatus('paused');
  };

  const handleResumeExtraction = () => {
    setStatus('running');
  };

  const handleExportData = () => {
    // Implement export logic
    const exportData = {
      metadata: {
        totalStudies: papers.length,
        extractionDate: new Date().toISOString(),
        completedStudies: Object.keys(extractedData).length
      },
      studies: extractedData
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extraction-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const navigate = useNavigate();
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <button 
        onClick={() => { navigate('/codebook-extraction'); }}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Data Extraction
        </button>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Batch Data Extraction</h1>
        <p className="text-gray-600">
          Extract data from multiple studies using the predefined codebook
        </p>
      </div>

      {/* Status and Controls */}
      <div className="bg-white rounded-lg shadow-sm border mb-8">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold">Extraction Progress</h2>
              <span className={`px-3 py-1 rounded-full text-sm ${
                status === 'running' ? 'bg-green-100 text-green-800' :
                status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                status === 'completed' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {status === 'ready' && (
                <button
                  onClick={handleStartExtraction}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Extraction
                </button>
              )}
              {status === 'running' && (
                <button
                  onClick={handlePauseExtraction}
                  className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </button>
              )}
              {status === 'paused' && (
                <button
                  onClick={handleResumeExtraction}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Resume
                </button>
              )}
              <button
                onClick={handleExportData}
                disabled={Object.keys(extractedData).length === 0}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  Object.keys(extractedData).length === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
              <button
                onClick={() => { navigate('/processing-results'); }}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="p-4 grid grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Total Studies</div>
            <div className="text-2xl font-semibold">{papers.length}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Completed</div>
            <div className="text-2xl font-semibold text-green-600">
              {Object.keys(extractedData).length}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">In Progress</div>
            <div className="text-2xl font-semibold text-blue-600">
              {status === 'running' ? 1 : 0}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Errors</div>
            <div className="text-2xl font-semibold text-red-600">{errors.length}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 pb-4">
          <div className="w-full bg-gray-100 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-500"
              style={{
                width: `${(Object.keys(extractedData).length / papers.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* Studies List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Studies Status</h2>
            <div className="flex items-center space-x-4">
              <select className="px-3 py-1 border rounded-md text-sm">
                <option value="all">All Studies</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="error">With Errors</option>
                <option value="validation">With Validation Issues</option>
              </select>
              <input
                type="text"
                placeholder="Search studies..."
                className="px-3 py-1 border rounded-md text-sm"
              />
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-500">
          <div className="col-span-1">Status</div>
          <div className="col-span-1">ID</div>
          <div className="col-span-4">Title</div>
          <div className="col-span-1">Year</div>
          <div className="col-span-2">Extraction Time</div>
          <div className="col-span-2">Validation Status</div>
          <div className="col-span-1">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y">
          {papers.map((paper, index) => (
            <div
              key={paper.id}
              className={`grid grid-cols-12 gap-4 p-4 items-center ${
                currentStudyIndex === index && status === 'running'
                  ? 'bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              {/* Status Icon */}
              <div className="col-span-1">
                {paper.id in extractedData ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                ) : errors.includes(paper.id) ? (
                  <div className="flex items-center text-red-600" title="Extraction failed">
                    <XCircle className="w-5 h-5" />
                  </div>
                ) : currentStudyIndex === index && status === 'running' ? (
                  <div className="flex items-center text-blue-600">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
                )}
              </div>

              {/* ID */}
              <div className="col-span-1 font-medium">#{paper.id}</div>

              {/* Title */}
              <div className="col-span-4">
                <div className="font-medium text-gray-900">{paper.title}</div>
                {paper.id in extractedData && (
                  <div className="text-sm text-gray-500">
                    Extracted {extractedData[paper.id]?.timestamp || 'Previously'}
                  </div>
                )}
              </div>

              {/* Year */}
              <div className="col-span-1 text-gray-600">{paper.year}</div>

              {/* Extraction Time */}
              <div className="col-span-2 text-sm">
                {paper.id in extractedData ? (
                  <span className="text-green-600">
                    Completed in {extractedData[paper.id]?.duration || '2.3s'}
                  </span>
                ) : errors.includes(paper.id) ? (
                  <span className="text-red-600">Failed</span>
                ) : (
                  <span className="text-gray-400">Pending</span>
                )}
              </div>

              {/* Validation Status */}
              <div className="col-span-2">
                {paper.id in validationResults ? (
                  <div className="flex items-center text-yellow-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {validationResults[paper.id].length} issues found
                  </div>
                ) : paper.id in extractedData ? (
                  <div className="flex items-center text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Validated
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">Not validated</span>
                )}
              </div>

              {/* Actions */}
              <div className="col-span-1">
                <button
                  className="text-blue-500 hover:text-blue-600"
                  onClick={() => {/* Handle view/retry */}}
                >
                  {errors.includes(paper.id) ? 'Retry' : 'View'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Error Summary */}
      {errors.length > 0 && (
        <div className="mt-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Extraction Errors</AlertTitle>
            <AlertDescription>
              {errors.length} studies encountered errors during extraction.
              Please review and retry these studies manually.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}

export default BatchExtraction;