import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './PaperListReview.css'; // Import the CSS file

function PaperListReview() {
  const [selectedPapers, setSelectedPapers] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const papersPerPage = 10;
  const navigate = useNavigate(); // Initialize useNavigate

  // Sample paper data
  const papers = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    title: `Sample Paper Title ${index + 1}`,
    authors: `Author ${index + 1}`,
    year: 2021,
    abstract: `This is a sample abstract for paper ${index + 1}.`,
    relevance: index % 2 === 0 ? 'High' : 'Medium',
  }));

  const currentPapers = papers.slice((currentPage - 1) * papersPerPage, currentPage * papersPerPage);

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Review Selected Papers</h1>
        <p className="description">Review and confirm papers for your meta-analysis</p>
      </div>

      <div>
        {currentPapers.map((paper) => (
          <div
            key={paper.id}
            className={`paper-card ${selectedPapers.has(paper.id) ? 'selected' : ''}`}
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
            <h3 className="paper-title">{paper.title}</h3>
            <div className="paper-meta">
              <span>{paper.authors}</span>
              <span>{paper.year}</span>
            </div>
            <p className="paper-abstract">{paper.abstract}</p>
            <span className={`relevance-tag relevance-${paper.relevance.toLowerCase()}`}>
              {paper.relevance} Relevance
            </span>
          </div>
        ))}
      </div>

      <div className="button-container">
        <button className="back-button">Back to Search</button>
        <button 
          className={`continue-button ${selectedPapers.size === 0 ? 'disabled' : ''}`} 
          disabled={selectedPapers.size === 0}
          onClick={() => {
            // Navigate to codebook setup
            navigate('/codebook-setup'); // Use navigate to go to the CodebookSetup page
          }}
        >
          Continue to Codebook Setup ({selectedPapers.size} papers)
        </button>
      </div>
    </div>
  );
}

export default PaperListReview;
