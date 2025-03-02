import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
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
  const [yearRange, setYearRange] = useState([2019, 2024]);
  const [isDragging, setIsDragging] = useState(null);
  const [showTooltips, setShowTooltips] = useState([false, false]);

  const sliderRef = useRef(null);
  const MIN_YEAR = 1900;
  const MAX_YEAR = 2024;
  const RANGE = MAX_YEAR - MIN_YEAR;

  const calculatePercentage = (year) => ((year - MIN_YEAR) / RANGE) * 100;
  
  const getYearFromPosition = (clientX) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = (clientX - rect.left) / rect.width;
    const year = Math.round(MIN_YEAR + (RANGE * percentage));
    return Math.min(Math.max(year, MIN_YEAR), MAX_YEAR);
  };

  const handleMouseDown = (index) => (e) => {
    e.preventDefault();
    setIsDragging(index);
    const newTooltips = [...showTooltips];
    newTooltips[index] = true;
    setShowTooltips(newTooltips);
  };

  const handleMouseUp = () => {
    setIsDragging(null);
    setShowTooltips([false, false]);
  };

  const handleMouseMove = (e) => {
    if (isDragging === null) return;
    
    const newYear = getYearFromPosition(e.clientX);
    setYearRange(prev => {
      const newRange = [...prev];
      newRange[isDragging] = newYear;
      
      if (isDragging === 0 && newRange[0] > newRange[1]) {
        newRange[0] = newRange[1];
      } else if (isDragging === 1 && newRange[1] < newRange[0]) {
        newRange[1] = newRange[0];
      }
      
      return newRange;
    });
  };

  const handleMouseEnter = (index) => () => {
    const newTooltips = [...showTooltips];
    newTooltips[index] = true;
    setShowTooltips(newTooltips);
  };

  const handleMouseLeave = (index) => () => {
    if (isDragging !== index) {
      const newTooltips = [...showTooltips];
      newTooltips[index] = false;
      setShowTooltips(newTooltips);
    }
  };

  useEffect(() => {
    if (isDragging !== null) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);
      return () => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [isDragging]);

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
      name: 'PubMed',
      url: 'https://pubmed.ncbi.nlm.nih.gov/',
      description: 'Biomedical literature and life sciences database'
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

  const handleBeginAnalysis = async () => {
    setSearchStatus('searching')
    navigate("/paper-list-review");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <button className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
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

      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-5 w-5 text-blue-500" />
          <h3 className="font-semibold">Search Filters</h3>
        </div>
        
        <div className="grid gap-6">
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-4">Year Range</h4>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">Start Year</label>
                  <input
                    type="number"
                    value={yearRange[0]}
                    onChange={(e) => {
                      const newYear = Math.min(parseInt(e.target.value), yearRange[1]);
                      setYearRange([newYear, yearRange[1]]);
                    }}
                    min={MIN_YEAR}
                    max={yearRange[1]}
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">End Year</label>
                  <input
                    type="number"
                    value={yearRange[1]}
                    onChange={(e) => {
                      const newYear = Math.max(parseInt(e.target.value), yearRange[0]);
                      setYearRange([yearRange[0], newYear]);
                    }}
                    min={yearRange[0]}
                    max={MAX_YEAR}
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>
              </div>
              
              <div 
                className="relative h-2 bg-gray-200 rounded cursor-pointer mt-8"
                ref={sliderRef}
              >
                <div
                  className="absolute h-full bg-blue-500 rounded"
                  style={{
                    left: `${calculatePercentage(yearRange[0])}%`,
                    right: `${100 - calculatePercentage(yearRange[1])}%`
                  }}
                />
                {[0, 1].map(index => (
                  <div
                    key={index}
                    className="relative"
                  >
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-grab hover:bg-blue-50"
                      style={{
                        left: `${calculatePercentage(yearRange[index])}%`,
                        zIndex: isDragging === index ? 30 : 20
                      }}
                      onMouseDown={handleMouseDown(index)}
                      onMouseEnter={handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave(index)}
                    >
                      {showTooltips[index] && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                          {yearRange[index]}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>{MIN_YEAR}</span>
                <span>{MAX_YEAR}</span>
              </div>
            </div>
          </div>

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
