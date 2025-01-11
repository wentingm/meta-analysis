import React, { useState } from 'react';
import { FileDown, Eye, Check, Database, ExternalLink, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function PaperListReview() {
  const [selectedPapers, setSelectedPapers] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');
  const papersPerPage = 10;

  // Simulate database status - in real app, this would come from your backend
  const paperDatabase = new Set([1, 3, 5, 7, 9]); // Papers already in database

  // Generate larger paper list with additional metadata
  const papers = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    title: [
      "The Impact of Project-Based Learning on Middle School Student Achievement",
      "Implementing Project-Based Learning in Digital Environments",
      "Student Engagement Through Project-Based Learning Methods",
      "A Comparative Study of Traditional vs Project-Based Learning",
      "Long-term Effects of Project-Based Learning on Academic Performance"
    ][index % 5] + ` (Study ${index + 1})`,
    authors: [
      "Johnson, M., Smith, K.",
      "Wilson, R., Brown, J.",
      "Davis, A., Miller, P.",
      "Anderson, L., Taylor, M.",
      "Thompson, S., White, R."
    ][index % 5],
    year: 2018 + (index % 5),
    journal: [
      "Educational Research Quarterly",
      "Teaching and Learning Research",
      "Journal of Educational Methods",
      "International Journal of Education",
      "Educational Psychology Review"
    ][index % 5],
    database: ["ERIC", "Semantic Scholar", "Google Scholar"][index % 3],
    abstract: "This study examines the effectiveness of project-based learning approaches...",
    relevance: ["High", "Medium", "High", "Medium", "High"][index % 5],
    fullTextAvailable: index % 4 !== 0,
    citations: Math.floor(Math.random() * 100),
    doi: `10.1234/journal.${index + 1}`,
    inDatabase: paperDatabase.has(index + 1),
    pdfUrl: index % 4 !== 0 ? `/sample/paper${index + 1}.pdf` : null,
    viewUrl: `/view/paper${index + 1}`
  }));

  // Pagination calculations
  const totalPages = Math.ceil(papers.length / papersPerPage);
  const currentPapers = papers.slice(
    (currentPage - 1) * papersPerPage,
    currentPage * papersPerPage
  );

  // Clear selection handler
  const handleClearSelection = () => {
    setSelectedPapers(new Set());
  };

  // Handle paper actions
  const handleViewPaper = (e, paper) => {
    e.stopPropagation();
    window.open(paper.viewUrl, '_blank');
  };

  const handleDownloadPaper = (e, paper) => {
    e.stopPropagation();
    if (paper.pdfUrl) {
      // In a real app, this would trigger the download through your backend
      console.log(`Downloading paper: ${paper.title}`);
    }
  };

  const PaginationControls = () => (
    <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-lg shadow-sm border">
      <div className="flex flex-1 items-center justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">{((currentPage - 1) * papersPerPage) + 1}</span>
            {' '}-{' '}
            <span className="font-medium">
              {Math.min(currentPage * papersPerPage, papers.length)}
            </span>
            {' '}of{' '}
            <span className="font-medium">{papers.length}</span>
            {' '}papers
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <button 
        onClick={() => { navigate('/education-analysis-setup'); }}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Educational Analysis
      </button>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Review Selected Papers</h1>
        <p className="text-gray-600">
          Review and confirm papers for your meta-analysis
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-8">
            <div>
              <span className="text-sm text-gray-500">Total Papers</span>
              <p className="text-lg font-semibold">{papers.length}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Selected</span>
              <p className="text-lg font-semibold text-blue-600">
                {selectedPapers.size}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              className="border rounded-lg px-3 py-2 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="year">Sort by Year</option>
              <option value="citations">Sort by Citations</option>
            </select>
            
            <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
              Select All on Page
            </button>
            <button 
              onClick={handleClearSelection}
              className={`
                px-4 py-2 text-sm rounded-lg transition-colors
                ${selectedPapers.size > 0 
                  ? 'bg-gray-50 text-gray-600 hover:bg-gray-100 cursor-pointer' 
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }
              `}
              disabled={selectedPapers.size === 0}
            >
              Clear Selection
            </button>
          </div>
        </div>
      </div>

      {/* Papers List */}
      <div className="space-y-4 mb-6">
        {currentPapers.map((paper) => (
          <div 
            key={paper.id}
            className={`
              bg-white rounded-lg shadow-sm border p-6
              ${selectedPapers.has(paper.id) ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'}
              transition-colors cursor-pointer
            `}
            onClick={() => {
              const newSelected = new Set(selectedPapers);
              if (newSelected.has(paper.id)) {
                newSelected.delete(paper.id);
              } else {
                newSelected.add(paper.id);
              }
              setSelectedPapers(newSelected);
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg">{paper.title}</h3>
                  <div className="flex items-center space-x-2 ml-4">
                    {paper.inDatabase && (
                      <span className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded text-xs">
                        <Database className="w-3 h-3 mr-1" />
                        In Database
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                  <span>{paper.authors}</span>
                  <span>•</span>
                  <span>{paper.year}</span>
                  <span>•</span>
                  <span>{paper.journal}</span>
                  <span>•</span>
                  <span>{paper.citations} citations</span>
                  <a href={`https://doi.org/${paper.doi}`} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-blue-600 hover:text-blue-800 flex items-center"
                     onClick={(e) => e.stopPropagation()}>
                    <ExternalLink className="w-3 h-3 mr-1" />
                    {paper.doi}
                  </a>
                </div>
                <p className="text-sm text-gray-600 mb-3">{paper.abstract}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {paper.database}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      paper.relevance === 'High' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {paper.relevance} Relevance
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => handleViewPaper(e, paper)}
                      className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    {paper.fullTextAvailable && (
                      <button
                        onClick={(e) => handleDownloadPaper(e, paper)}
                        className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                        disabled={paper.inDatabase}
                      >
                        <FileDown className="w-4 h-4 mr-1" />
                        {paper.inDatabase ? 'Already Saved' : 'Download PDF'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${selectedPapers.has(paper.id) 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-gray-300'
                  }
                `}>
                  {selectedPapers.has(paper.id) && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mb-6">
        <PaginationControls />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button onClick={() => navigate('/education-analysis-setup')} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          Back to Search
        </button>
        <button 
          className={`
            px-6 py-3 rounded-lg transition-colors flex items-center space-x-2
            ${selectedPapers.size > 0
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
          disabled={selectedPapers.size === 0}
          onClick={() => {
            // Navigate to codebook setup
            console.log('Navigate to selection criteria with papers:', selectedPapers);
            navigate('/paperpool-overview');
          }}
        >
          <span>Review Paper Pool</span>
          <span>({selectedPapers.size} papers)</span>
        </button>
      </div>
    </div>
  );
}

export default PaperListReview;