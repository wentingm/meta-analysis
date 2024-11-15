import React, { useState } from 'react';
import '../index.css';
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
import { useNavigate } from 'react-router-dom';

const EducationAnalysisSetup = () => {
  const [searchStatus, setSearchStatus] = useState('ready'); // ready, searching, complete
  const [selectedFilters, setSelectedFilters] = useState([]);

  const filters = {
    yearRange: ['Last 5 years', 'Last 10 years', 'Custom range'],
    studyTypes: ['Randomized Control Trials', 'Quasi-experimental', 'Observational'],
    publicationTypes: ['Peer-reviewed', 'Conference Papers', 'Dissertations'],
    languages: ['English', 'Spanish', 'French']
  };
  const navigate = useNavigate(); 
  
  const handleBeginAnalysis = () => {
    setSearchStatus('searching');
    navigate('/paper-screening'); 
  };
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
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

      {/* Search Progress */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Database Search</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">3 databases selected</span>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="grid gap-4">
          {['ERIC', 'Google Scholar', 'Semantic Scholar'].map((db) => (
            <div key={db} className="p-4 rounded-lg border bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{db}</span>
                {searchStatus === 'complete' && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </div>
              <div className="text-sm text-gray-500">
                {searchStatus === 'searching' ? (
                  <div className="flex items-center">
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
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
      <div className="grid gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold">Search Filters</h3>
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

        {/* Analysis Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Settings className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold">Analysis Settings</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Effect Size Measure
              </label>
              <select className="w-full rounded-lg border-gray-300">
                <option>Hedges' g</option>
                <option>Cohen's d</option>
                <option>Risk Ratio</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Analysis Model
              </label>
              <select className="w-full rounded-lg border-gray-300">
                <option>Random Effects</option>
                <option>Fixed Effects</option>
                <option>Mixed Effects</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heterogeneity Analysis
              </label>
              <select className="w-full rounded-lg border-gray-300">
                <option>I² Statistic</option>
                <option>Q-test</option>
                <option>Both</option>
              </select>
            </div>
          </div>
        </div>

        {/* Preview Stats */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart2 className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold">Analysis Preview</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Estimated Studies</div>
              <div className="text-2xl font-semibold">150-200</div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">Time Estimate</div>
              <div className="text-2xl font-semibold">15-20 min</div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <AlertCircle className="h-4 w-4 mr-1" />
                Recommendations
              </div>
              <ul className="text-sm space-y-2">
                <li className="flex items-center text-gray-600">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Consider adding date filters
                </li>
                <li className="flex items-center text-gray-600">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Include dissertations for broader coverage
                </li>
              </ul>
            </div>
          </div>
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
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            onClick={handleBeginAnalysis}
          >
            <Search className="h-4 w-4 mr-2" />
            Begin Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationAnalysisSetup;
