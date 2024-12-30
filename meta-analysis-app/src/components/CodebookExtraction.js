import React, { useState } from 'react';
import { Book, CheckCircle, AlertCircle, ArrowLeft, ArrowRight, Save, Eye, FileText, HelpCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/Alert';
import { useNavigate } from 'react-router-dom';

function CodebookExtraction() {
  const [reviewStep, setReviewStep] = useState('codebook');
  const [currentPaper, setCurrentPaper] = useState(0);
  const [codebookAcknowledged, setCodebookAcknowledged] = useState(false);
  const [extractionData, setExtractionData] = useState({});

  // Sample codebook structure
  const codebook = {
    studyCharacteristics: {
      title: "Study Characteristics",
      fields: [
        {
          id: "studyDesign",
          label: "Study Design",
          type: "select",
          options: ["RCT", "Quasi-experimental", "Pre-post", "Other"],
          description: "The primary research design employed in the study",
          required: true
        },
        {
          id: "setting",
          label: "Study Setting",
          type: "multiselect",
          options: ["Urban", "Rural", "Suburban", "Mixed"],
          description: "The context in which the study was conducted",
          required: true
        }
      ]
    },
    participants: {
      title: "Participant Information",
      fields: [
        {
          id: "ageRange",
          label: "Age Range",
          type: "range",
          min: 0,
          max: 100,
          description: "The age range of study participants",
          required: true
        },
        {
          id: "demographics",
          label: "Demographics Reported",
          type: "checkbox",
          options: ["Gender", "Ethnicity", "SES", "Language"],
          description: "Demographic variables reported in the study",
          required: false
        }
      ]
    },
    intervention: {
      title: "Intervention Details",
      fields: [
        {
          id: "duration",
          label: "Duration (weeks)",
          type: "number",
          description: "Total duration of the intervention in weeks",
          required: true
        },
        {
          id: "frequency",
          label: "Session Frequency",
          type: "text",
          description: "How often intervention sessions occurred",
          required: true
        }
      ]
    },
    outcomes: {
      title: "Outcome Measures",
      fields: [
        {
          id: "primaryOutcome",
          label: "Primary Outcome",
          type: "text",
          description: "The main outcome measure used in the study",
          required: true
        },
        {
          id: "measurementTool",
          label: "Measurement Tool",
          type: "text",
          description: "Tool or instrument used to measure the primary outcome",
          required: true
        }
      ]
    }
  };

  // Sample papers data
  const papers = Array.from({ length: 45 }, (_, index) => ({
    id: index + 1,
    title: [
      "Impact Assessment of Treatment Intervention on Student Performance",
      "Experimental Analysis of Intervention Outcomes in Educational Settings",
      "Comparative Study of Treatment Effects on Learning Outcomes",
      "Randomized Control Trial of Educational Intervention",
      "Longitudinal Analysis of Treatment Impact on Achievement"
    ][index % 5] + ` (Study ${index + 1})`,
    year: 2018 + (index % 5)
  }));

  const handleFieldChange = (category, fieldId, value) => {
    setExtractionData(prev => ({
      ...prev,
      [papers[currentPaper].id]: {
        ...prev[papers[currentPaper].id],
        [category]: {
          ...(prev[papers[currentPaper].id]?.[category] || {}),
          [fieldId]: value
        }
      }
    }));
  };

  const renderField = (field, category) => {
    const currentValue = extractionData[papers[currentPaper].id]?.[category]?.[field.id] || '';

    switch (field.type) {
      case 'select':
        return (
          <select
            className="w-full p-2 border rounded-md"
            value={currentValue}
            onChange={(e) => handleFieldChange(category, field.id, e.target.value)}
          >
            <option value="">Select...</option>
            {field.options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      case 'multiselect':
        return (
          <div className="space-y-2">
            {field.options.map(opt => (
              <label key={opt} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={(currentValue || []).includes(opt)}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...(currentValue || []), opt]
                      : (currentValue || []).filter(v => v !== opt);
                    handleFieldChange(category, field.id, newValue);
                  }}
                  className="rounded"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options.map(opt => (
              <label key={opt} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={(currentValue || []).includes(opt)}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...(currentValue || []), opt]
                      : (currentValue || []).filter(v => v !== opt);
                    handleFieldChange(category, field.id, newValue);
                  }}
                  className="rounded"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        );
      case 'number':
      case 'range':
        return (
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={currentValue}
            min={field.min}
            max={field.max}
            onChange={(e) => handleFieldChange(category, field.id, e.target.value)}
          />
        );
      default:
        return (
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={currentValue}
            onChange={(e) => handleFieldChange(category, field.id, e.target.value)}
          />
        );
    }
  };
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Data Extraction Process</h1>
        <p className="text-gray-600">
          {reviewStep === 'codebook' 
            ? 'Review the codebook before proceeding with data extraction'
            : 'Extract data according to the codebook guidelines'}
        </p>
      </div>

      {reviewStep === 'codebook' ? (
        <>
          {/* Codebook Review Section */}
          <div className="bg-white rounded-lg shadow-sm border mb-8">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Book className="w-5 h-5 text-blue-500 mr-2" />
                  <h2 className="text-lg font-semibold">Codebook Review</h2>
                </div>
                <button
                  onClick={() => {/* Handle edit codebook */}}
                  className="text-blue-500 hover:text-blue-600 flex items-center"
                >
                  <FileText className="w-4 h-4 mr-1" />
                  Edit Codebook
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-8">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Please review the codebook carefully before proceeding to data extraction.
                  This ensures consistency and accuracy in the extraction process.
                </AlertDescription>
              </Alert>

              {Object.entries(codebook).map(([category, { title, fields }]) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {fields.map(field => (
                      <div key={field.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-lg text-gray-800">
                              {field.label}
                              {field.required && <span className="text-red-500 ml-1">*</span>}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">{field.description}</p>
                          </div>
                          {field.type === 'select' && (
                            <div className="text-sm text-gray-500">
                              Options: {field.options.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t bg-gray-50">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={codebookAcknowledged}
                  onChange={(e) => setCodebookAcknowledged(e.target.checked)}
                  className="rounded"
                />
                <span>I have reviewed and understood the codebook guidelines</span>
              </label>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-end">
            <button
              onClick={() => setReviewStep('extraction')}
              disabled={!codebookAcknowledged}
              className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
                codebookAcknowledged
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Proceed to Data Extraction
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Data Extraction Interface */}
          <div className="flex gap-8">
            {/* Left sidebar - Paper Info */}
            <div className="w-1/3">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Current Paper
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg">{papers[currentPaper].title}</h4>
                    <p className="text-sm text-gray-500">Year: {papers[currentPaper].year}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      Paper {currentPaper + 1} of {papers.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content - Extraction Form */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Data Extraction Form</h2>
                    <button
                      onClick={() => setReviewStep('codebook')}
                      className="text-blue-500 hover:text-blue-600 flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Review Codebook
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-8">
                  {Object.entries(codebook).map(([category, { title, fields }]) => (
                    <div key={category} className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {fields.map(field => (
                          <div key={field.id} className="space-y-2">
                            <label className="flex items-center">
                              <span className="font-medium text-gray-700">
                                {field.label}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                              </span>
                              <HelpCircle 
                                className="w-4 h-4 ml-2 text-gray-400 cursor-help"
                                title={field.description}
                              />
                            </label>
                            {renderField(field, category)}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => setCurrentPaper(p => Math.max(0, p - 1))}
              disabled={currentPaper === 0}
              className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Paper
            </button>
            
            <button
              onClick={() => {/* Save extraction data */}}
              className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Progress
            </button>

            <button
              onClick={() => setCurrentPaper(p => Math.min(papers.length - 1, p + 1))}
              disabled={currentPaper === papers.length - 1}
              className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Next Paper
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CodebookExtraction;