import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './EducationAnalysisSetup.css';
import {
  ArrowLeft,
  Search,
  FileText,
  BarChart2,
  Filter,
  Settings,
  Download,
  HelpCircle,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Book
} from 'lucide-react';

const EducationAnalysisSetup = () => {
  const [searchStatus, setSearchStatus] = useState('ready'); // ready, searching, complete
  const [selectedFilters, setSelectedFilters] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  const filters = {
    yearRange: ['Last 5 years', 'Last 10 years', 'Custom range'],
    studyTypes: ['Randomized Control Trials', 'Quasi-experimental', 'Observational'],
    publicationTypes: ['Peer-reviewed', 'Conference Papers', 'Dissertations'],
    languages: ['English', 'Spanish', 'French']
  };

  const handleBeginAnalysis = () => {
    setSearchStatus('searching');
    navigate('/paper-list-review'); // Navigate to /paper-list-review
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header header-container">
        <button className="flex items-center header-back-button">
          <ArrowLeft className="icon" />
          Back to Setup
        </button>
        <div className="header-title">
          <Book className="icon-large header-icon" />
          <div>
            <h1>Educational Meta-Analysis</h1>
            <p className="header-subtitle">Project-based Learning in Middle Schools</p>
          </div>
        </div>
      </div>

      {/* Search Progress */}
      <div className="card">
        <div className="section-header section-search">
          <h2>Database Search</h2>
          <div className="search-info flex items-center space-x-2">
            <span className="text-sm">3 databases selected</span>
            <HelpCircle className="help-icon" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {['ERIC', 'Google Scholar', 'Semantic Scholar'].map((db) => (
            <div key={db} className="card">
              <div className="card-header">
                <span>{db}</span>
                {searchStatus === 'complete' && (
                  <CheckCircle className="icon-success" />
                )}
              </div>
              <div className={`card-text ${searchStatus}`}>
                {searchStatus === 'searching' ? (
                  <div className="search-status">
                    <RefreshCw className="icon animate-spin" />
                    Searching...
                  </div>
                ) : searchStatus === 'complete' ? (
                  "Search complete"
                ) : (
                  "Ready to search"
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search Filters */}
      <div className="filters-section">
        <div className="section-header">
          <Filter className="icon" />
          <h3>Search Filters</h3>
        </div>

        {Object.entries(filters).map(([category, options]) => (
          <div key={category} className="filter-category">
            <h4 className="filter-category-title">
              {category.replace(/([A-Z])/g, ' $1').trim()}
            </h4>
            <div className="space-y-2">
              {options.map((option) => (
                <label key={option} className="filter-option">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    checked={selectedFilters.includes(option)}
                    onChange={() => {
                      if (selectedFilters.includes(option)) {
                        setSelectedFilters(selectedFilters.filter(f => f !== option));
                      } else {
                        setSelectedFilters([...selectedFilters, option]);
                      }
                    }}
                  />
                  <span className="ml-2 text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Analysis Settings */}
      <div className="filters-section">
        <div className="section-header">
          <Settings className="icon" />
          <h3>Analysis Settings</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Effect Size Measure
            </label>
            <select className="select-dropdown">
              <option>Hedges' g</option>
              <option>Cohen's d</option>
              <option>Risk Ratio</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Analysis Model
            </label>
            <select className="select-dropdown">
              <option>Random Effects</option>
              <option>Fixed Effects</option>
              <option>Mixed Effects</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heterogeneity Analysis
            </label>
            <select className="select-dropdown">
              <option>I² Statistic</option>
              <option>Q-test</option>
              <option>Both</option>
            </select>
          </div>
        </div>
      </div>

      {/* Preview Stats */}
      <div className="filters-section">
        <div className="section-header">
          <BarChart2 className="icon" />
          <h3>Analysis Preview</h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-title text-sm text-gray-500 mb-1">Estimated Studies</div>
            <div className="text-info text-2xl font-semibold">150-200</div>
          </div>

          <div>
            <div className="text-title text-sm text-gray-500 mb-1">Time Estimate</div>
            <div className="text-info text-2xl font-semibold">15-20 min</div>
          </div>

          <div className="text-more pt-4 border-t">
            <div className="text-content flex items-center text-sm text-gray-500 mb-2">
              <AlertCircle className="icon" />
              Recommendations
            </div>
            <ul className="text-list text-sm space-y-2">
              <li className="flex items-center text-gray-600">
                <ChevronRight className="icon" />
                Consider adding date filters
              </li>
              <li className="flex items-center text-gray-600">
                <ChevronRight className="icon" />
                Include dissertations for broader coverage
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="save-button">Save Configuration</button>
        
        <div className="flex space-x-4 button-wrapper">
          <button className="export-button">
            <Download className="icon" />
            Export Settings
          </button>
          <button 
            className="begin-analysis-button"
            onClick={handleBeginAnalysis} // Use the handler for navigation and search state
          >
            <Search className="icon" />
            Begin Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationAnalysisSetup;
