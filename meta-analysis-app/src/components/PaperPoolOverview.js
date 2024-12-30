import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, ArrowRight, Calendar, Users, BookOpen, Library, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function PaperPoolOverview() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const papersPerPage = 10;

  // Filter state
  const [filters, setFilters] = useState({
    method: '',
    year: '',
    studyType: '',
    journal: ''
  });

  // Generate 50 papers with varied properties
  const selectedPapers = Array.from({ length: 50 }, (_, index) => {
    const methods = ["Quantitative", "Qualitative", "Mixed Methods"];
    const studyTypes = ["Cross-sectional", "Longitudinal", "Experimental", "Quasi-experimental"];
    const sampleSizes = [
      120, 245, 189, 567, 234, 789, 156, 432, 654, 321,
      198, 276, 543, 187, 298, 465, 732, 198, 387, 265
    ];
    const years = [2018, 2019, 2020, 2021, 2022];
    const journals = [
      "Educational Research Quarterly",
      "Teaching and Learning Research",
      "Journal of Educational Methods",
      "International Journal of Education",
      "Educational Psychology Review",
      "Learning and Instruction",
      "Journal of Research in Education",
      "Educational Studies",
      "Teaching and Teacher Education",
      "Education Sciences"
    ];
    
    return {
      id: index + 1,
      title: [
        "The Impact of Project-Based Learning on Middle School Student Achievement",
        "Implementing Project-Based Learning in Digital Environments",
        "Student Engagement Through Project-Based Learning Methods",
        "A Comparative Study of Traditional vs Project-Based Learning",
        "Long-term Effects of Project-Based Learning on Academic Performance"
      ][index % 5] + ` (Study ${index + 1})`,
      year: years[Math.floor(Math.random() * years.length)],
      method: methods[Math.floor(Math.random() * methods.length)],
      sampleSize: sampleSizes[index % sampleSizes.length],
      studyType: studyTypes[Math.floor(Math.random() * studyTypes.length)],
      journal: journals[index % journals.length]
    };
  });

  // Get unique values for filters
  const filterOptions = {
    method: [...new Set(selectedPapers.map(p => p.method))],
    year: [...new Set(selectedPapers.map(p => p.year))].sort(),
    studyType: [...new Set(selectedPapers.map(p => p.studyType))],
    journal: [...new Set(selectedPapers.map(p => p.journal))]
  };

  // Filter papers based on current filters
  const filteredPapers = useMemo(() => {
    return selectedPapers.filter(paper => {
      return (!filters.method || paper.method === filters.method) &&
             (!filters.year || paper.year.toString() === filters.year) &&
             (!filters.studyType || paper.studyType === filters.studyType) &&
             (!filters.journal || paper.journal === filters.journal);
    });
  }, [filters, selectedPapers]);

  // Calculate year distribution
  const yearCounts = selectedPapers.reduce((acc, paper) => {
    acc[paper.year] = (acc[paper.year] || 0) + 1;
    return acc;
  }, {});

  const yearDistribution = Object.entries(yearCounts)
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year - b.year);

  // Calculate pool metrics
  const poolMetrics = {
    totalPapers: selectedPapers.length,
    yearRange: `${Math.min(...selectedPapers.map(p => p.year))}-${Math.max(...selectedPapers.map(p => p.year))}`,
    averageSampleSize: Math.round(
      selectedPapers.reduce((sum, paper) => sum + paper.sampleSize, 0) / selectedPapers.length
    ),
    journals: new Set(selectedPapers.map(p => p.journal)).size,
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredPapers.length / papersPerPage);
  const indexOfLastPaper = currentPage * papersPerPage;
  const indexOfFirstPaper = indexOfLastPaper - papersPerPage;
  const currentPapers = filteredPapers.slice(indexOfFirstPaper, indexOfLastPaper);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      method: '',
      year: '',
      studyType: '',
      journal: ''
    });
  };

  const FilterSelect = ({ name, options, value, onChange, placeholder }) => (
    <select
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      className="border rounded-lg px-3 py-2 text-sm bg-white"
    >
      <option value="">{placeholder}</option>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  const PaginationControls = () => (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      <div className="flex items-center text-sm text-gray-500">
        Showing {indexOfFirstPaper + 1}-{Math.min(indexOfLastPaper, filteredPapers.length)} of {filteredPapers.length} papers
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`p-1 rounded ${
            currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
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
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`p-1 rounded ${
            currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
  const navigate = useNavigate();
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Paper Pool Overview</h1>
        <p className="text-gray-600">
          Review your paper pool before applying selection criteria
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-2 text-blue-600 mb-2">
            <Library className="w-5 h-5" />
            <span className="text-sm font-medium">Total Papers</span>
          </div>
          <p className="text-2xl font-bold">{poolMetrics.totalPapers}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-2 text-blue-600 mb-2">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">Year Range</span>
          </div>
          <p className="text-2xl font-bold">{poolMetrics.yearRange}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-2 text-blue-600 mb-2">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">Avg. Sample Size</span>
          </div>
          <p className="text-2xl font-bold">{poolMetrics.averageSampleSize}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-2 text-blue-600 mb-2">
            <BookOpen className="w-5 h-5" />
            <span className="text-sm font-medium">Unique Journals</span>
          </div>
          <p className="text-2xl font-bold">{poolMetrics.journals}</p>
        </div>
      </div>

      {/* Publication Year Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h2 className="text-lg font-semibold mb-4">Publication Year Distribution</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearDistribution}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Paper List Preview */}
      <div className="bg-white rounded-lg shadow-sm border mb-8">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Papers in Pool ({filteredPapers.length})</h2>
        </div>

        {/* Filters */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <FilterSelect
                name="method"
                options={filterOptions.method}
                value={filters.method}
                onChange={handleFilterChange}
                placeholder="All Methods"
              />
              <FilterSelect
                name="year"
                options={filterOptions.year}
                value={filters.year}
                onChange={handleFilterChange}
                placeholder="All Years"
              />
              <FilterSelect
                name="studyType"
                options={filterOptions.studyType}
                value={filters.studyType}
                onChange={handleFilterChange}
                placeholder="All Study Types"
              />
              <FilterSelect
                name="journal"
                options={filterOptions.journal}
                value={filters.journal}
                onChange={handleFilterChange}
                placeholder="All Journals"
              />
            </div>
            {Object.values(filters).some(Boolean) && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <div className="divide-y">
          {currentPapers.map((paper) => (
            <div key={paper.id} className="p-4 hover:bg-gray-50">
              <h3 className="text-lg mb-2">{paper.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{paper.year}</span>
                <span>•</span>
                <span>{paper.method}</span>
                <span>•</span>
                <span>n = {paper.sampleSize}</span>
                <span>•</span>
                <span>{paper.studyType}</span>
                <span>•</span>
                <span className="text-blue-600">{paper.journal}</span>
              </div>
            </div>
          ))}
        </div>
        <PaginationControls />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button onClick={() => { navigate('/paper-list-review'); }} className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Paper Selection
        </button>
        <button onClick={() => { navigate('/selection-criteria-results'); }} className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Continue to Selection Criteria
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}

export default PaperPoolOverview;
