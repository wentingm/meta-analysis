import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  FileText,
  Filter,
  Download,
  HelpCircle,
  RefreshCw,
  CheckCircle,
  Book,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EducationAnalysisSetup = () => {
  const [searchStatus, setSearchStatus] = useState('ready');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedDatabases, setSelectedDatabases] = useState([]);

  const databases = [
    {
      name: 'Semantic Scholar',
      url: 'https://www.semanticscholar.org/',
      description: 'AI-powered research paper database'
    },
    {
      name: 'Google Scholar',
      url: 'https://scholar.google.ca/',
      description: 'Comprehensive academic search engine'
    },
    {
      name: 'ERIC',
      url: 'https://eric.ed.gov/',
      description: 'Education Resources Information Center'
    },
    {
      name: 'Open Access Journals',
      url: 'https://doaj.org/',
      description: 'Directory of Open Access Journals'
    },
    {
      name: 'ScienceOpen',
      url: 'https://www.scienceopen.com/',
      description: 'Research and publishing network'
    }
  ];

  const filters = {
    yearRange: ['Last 5 years', 'Last 10 years', 'Custom range'],
    studyTypes: ['Randomized Control Trials', 'Quasi-experimental', 'Observational'],
    publicationTypes: ['Peer-reviewed', 'Conference Papers', 'Dissertations'],
    languages: ['English', 'Spanish', 'French']
  };

  const toggleDatabase = (dbName) => {
    setSelectedDatabases(prev => 
      prev.includes(dbName)
        ? prev.filter(name => name !== dbName)
        : [...prev, dbName]
    );
  };
  const navigate = useNavigate();
  const handleBeginAnalysis = () => {
    if (selectedDatabases.length > 0) {
      setSearchStatus('searching');
    }
    navigate('/paper-screening');
  };
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <button onClick={() => { navigate('/create-project'); }} className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Setup
        </button>
        <div className="flex items-center space-x-4">
          <Book className="h-8 w-8 text-blue-500" />
          <div>
            <h1 className="text-2xl font-bold">Educational Meta-Analysis</h1>
            <p className="text-gray-600">Project-based Learning in Middle Schools</p>
          </div>
        </div>
      </div>

      {/* Search Progress */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Database Search</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {selectedDatabases.length} databases selected
            </span>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="grid gap-4">
          {databases.map((db) => (
            <div 
              key={db.name}
              className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                selectedDatabases.includes(db.name)
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => toggleDatabase(db.name)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedDatabases.includes(db.name)}
                    onChange={() => toggleDatabase(db.name)}
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500 mr-3"
                  />
                  <span className="font-medium">{db.name}</span>
                </div>
                <a 
                  href={db.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <div className="text-sm text-gray-500 ml-7">
                {db.description}
              </div>
              <div className="text-sm text-gray-500 mt-2 ml-7">
                {searchStatus === 'searching' && selectedDatabases.includes(db.name) ? (
                  <div className="flex items-center text-blue-500">
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Searching...
                  </div>
                ) : searchStatus === 'complete' && selectedDatabases.includes(db.name) ? (
                  <div className="flex items-center text-green-500">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Search complete
                  </div>
                ) : (
                  "Ready to search"
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-5 w-5 text-blue-500" />
          <h3 className="font-semibold">Search Filters</h3>
        </div>
        
        <div className="grid">
          {Object.entries(filters).map(([category, options]) => (
            <div key={category} className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <div className="space-y-2">
                {options.map((option) => (
                  <label key={option} className="flex items-center">
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
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
          Save Configuration
        </button>
        
        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Settings
          </button>
          <button 
            className={`px-6 py-3 rounded-lg transition-colors flex items-center ${
              selectedDatabases.length > 0
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleBeginAnalysis}
          >
            <Search className="h-4 w-4 mr-2" />
            Begin Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationAnalysisSetup;
