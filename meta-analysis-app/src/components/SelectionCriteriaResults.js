import React, { useState } from 'react';
import { Check, X, ArrowLeft, ArrowRight, FileText, Filter, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function SelectionCriteriaResults() {
  const [currentPage, setCurrentPage] = useState(1);
  const papersPerPage = 10;

  // Generate 45 qualified papers
  const qualifiedPapers = Array.from({ length: 45 }, (_, index) => ({
    id: index + 1,
    title: [
      "Impact Assessment of Treatment Intervention on Student Performance",
      "Experimental Analysis of Intervention Outcomes in Educational Settings",
      "Comparative Study of Treatment Effects on Learning Outcomes",
      "Randomized Control Trial of Educational Intervention",
      "Longitudinal Analysis of Treatment Impact on Achievement"
    ][index % 5] + ` (Study ${index + 1})`,
    year: 2018 + (index % 5),
    sampleSize: 150 + (index * 10),
    controlGroupSize: 75 + (index * 5),
    effectSize: (0.3 + (Math.random() * 0.5)).toFixed(2),
    journal: [
      "Educational Research Quarterly",
      "Journal of Educational Psychology",
      "Learning and Instruction",
      "Educational Studies",
      "Journal of Research in Education"
    ][index % 5],
    phase: "Included"
  }));

  // Pagination calculations
  const totalPages = Math.ceil(qualifiedPapers.length / papersPerPage);
  const currentPapers = qualifiedPapers.slice(
    (currentPage - 1) * papersPerPage,
    currentPage * papersPerPage
  );

  // Flow diagram details
  const flowStages = [
    {
      title: "Identification",
      papers: 50,
      details: "All records identified through database searching"
    },
    {
      title: "Screening",
      papers: 50,
      excluded: 0,
      details: "Title and abstract screening"
    },
    {
      title: "Eligibility",
      papers: 50,
      excluded: 5,
      details: "Full-text articles assessed",
      exclusionReasons: [
        { reason: "Not original data", count: 1 },
        { reason: "No control group", count: 2 },
        { reason: "Insufficient effect size data", count: 1 },
        { reason: "No measurable outcomes", count: 1 }
      ]
    },
    {
      title: "Included",
      papers: 45,
      details: "Studies included in meta-analysis"
    }
  ];
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Selection Process Results</h1>
        <p className="text-gray-600">
          PRISMA flow diagram and detailed results of the study selection process
        </p>
      </div>

      {/* Flow Diagram Visual */}
      <div className="bg-white rounded-lg shadow-sm border mb-8">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Study Selection Flow</h2>
        </div>
        <div className="p-6 space-y-4">
          {flowStages.map((stage, index) => (
            <div key={stage.title} className="relative">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg text-blue-800">{stage.title}</h3>
                  <div className="text-blue-600 font-semibold">
                    n = {stage.papers}
                  </div>
                </div>
                <p className="text-sm text-blue-600">{stage.details}</p>
                
                {stage.excluded > 0 && (
                  <div className="mt-3 bg-red-50 p-3 rounded border border-red-100">
                    <div className="text-red-600 font-medium mb-1">
                      Excluded (n = {stage.excluded})
                    </div>
                    <ul className="text-sm text-red-600 space-y-1">
                      {stage.exclusionReasons?.map((reason, i) => (
                        <li key={i}>• {reason.reason} (n = {reason.count})</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {index < flowStages.length - 1 && (
                <div className="absolute left-1/2 -ml-0.5 w-1 h-8 bg-blue-200" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Papers List */}
      <div className="bg-white rounded-lg shadow-sm border mb-8">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold">Included Studies ({qualifiedPapers.length})</h2>
            </div>
            <div className="text-sm text-gray-500">
              Showing {(currentPage - 1) * papersPerPage + 1}-
              {Math.min(currentPage * papersPerPage, qualifiedPapers.length)} of {qualifiedPapers.length}
            </div>
          </div>
        </div>

        <div className="divide-y">
          {currentPapers.map((paper) => (
            <div key={paper.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg mb-2">{paper.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{paper.year}</span>
                    <span>•</span>
                    <span>Treatment n = {paper.sampleSize}</span>
                    <span>•</span>
                    <span>Control n = {paper.controlGroupSize}</span>
                    <span>•</span>
                    <span>Effect Size = {paper.effectSize}</span>
                    <span>•</span>
                    <span className="text-blue-600">{paper.journal}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`flex items-center px-3 py-1 rounded ${
              currentPage === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`flex items-center px-3 py-1 rounded ${
              currentPage === totalPages 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button onClick={() => { navigate('/paperpool-overview'); }} className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Paper Pool
        </button>
        <button onClick={() => { navigate('/codebook-extraction'); }} className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Continue to Data Extraction
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}

export default SelectionCriteriaResults;
