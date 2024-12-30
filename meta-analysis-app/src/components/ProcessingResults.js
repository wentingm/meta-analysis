import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertCircle, CheckCircle, Clock, AlertTriangle, XCircle, Download, Filter } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/Alert';
import { useNavigate } from 'react-router-dom';

const ProcessingResults = () => {
  // Sample processed data
  const processedPapers = Array.from({ length: 45 }, (_, index) => ({
    id: index + 1,
    title: [
      "Impact Assessment of Treatment Intervention on Student Performance",
      "Experimental Analysis of Intervention Outcomes in Educational Settings",
      "Comparative Study of Treatment Effects on Learning Outcomes",
      "Randomized Control Trial of Educational Intervention",
      "Longitudinal Analysis of Treatment Impact on Achievement"
    ][index % 5] + ` (Study ${index + 1})`,
    year: 2018 + (index % 5),
    status: ['success', 'success', 'success', 'error', 'warning'][Math.floor(Math.random() * 5)],
    processingTime: Math.random() * 10 + 1,
    dataQualityScore: Math.floor(Math.random() * 40 + 60),
    extractedFields: Math.floor(Math.random() * 10 + 20),
    validationIssues: Math.floor(Math.random() * 5)
  }));

  // Calculate summary statistics
  const stats = {
    total: processedPapers.length,
    successful: processedPapers.filter(p => p.status === 'success').length,
    warnings: processedPapers.filter(p => p.status === 'warning').length,
    errors: processedPapers.filter(p => p.status === 'error').length,
    averageTime: processedPapers.reduce((acc, p) => acc + p.processingTime, 0) / processedPapers.length,
    averageQuality: processedPapers.reduce((acc, p) => acc + p.dataQualityScore, 0) / processedPapers.length
  };

  // Data for charts
  const statusData = [
    { name: 'Successful', value: stats.successful, color: '#10B981' },
    { name: 'Warnings', value: stats.warnings, color: '#F59E0B' },
    { name: 'Errors', value: stats.errors, color: '#EF4444' }
  ];

  const qualityDistribution = [
    { name: '90-100', count: processedPapers.filter(p => p.dataQualityScore >= 90).length },
    { name: '80-89', count: processedPapers.filter(p => p.dataQualityScore >= 80 && p.dataQualityScore < 90).length },
    { name: '70-79', count: processedPapers.filter(p => p.dataQualityScore >= 70 && p.dataQualityScore < 80).length },
    { name: '60-69', count: processedPapers.filter(p => p.dataQualityScore >= 60 && p.dataQualityScore < 70).length }
  ];

  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPapers = processedPapers.filter(paper => {
    if (filterStatus === 'all') return true;
    return paper.status === filterStatus;
  });

  const pageCount = Math.ceil(filteredPapers.length / itemsPerPage);
  const paginatedPapers = filteredPapers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const navigate = useNavigate();
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-2">Processing Results</h1>
          <p className="text-gray-600">
            Complete overview of processed papers and extraction results
          </p>
        </div>
        <button 
          className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg font-semibold shadow-sm"
          onClick={() => {
            // Add statistical analysis logic here
            console.log('Running statistical analysis...');
          }}
        >
          Run Statistical Analysis
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Processed</p>
              <h3 className="text-2xl font-bold">{stats.total}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Successful</p>
              <h3 className="text-2xl font-bold text-green-600">{stats.successful}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">With Warnings</p>
              <h3 className="text-2xl font-bold text-yellow-600">{stats.warnings}</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Failed</p>
              <h3 className="text-2xl font-bold text-red-600">{stats.errors}</h3>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Processing Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Data Quality Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={qualityDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Results Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Detailed Results</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select 
                  className="px-3 py-1 border rounded-md text-sm"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Results</option>
                  <option value="success">Successful</option>
                  <option value="warning">With Warnings</option>
                  <option value="error">Failed</option>
                </select>
              </div>
              <button
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Results
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-sm font-medium text-gray-500">
                <th className="p-4">ID</th>
                <th className="p-4">Title</th>
                <th className="p-4">Status</th>
                <th className="p-4">Processing Time</th>
                <th className="p-4">Quality Score</th>
                <th className="p-4">Extracted Fields</th>
                <th className="p-4">Issues</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginatedPapers.map(paper => (
                <tr key={paper.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium">#{paper.id}</td>
                  <td className="p-4">{paper.title}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      paper.status === 'success' ? 'bg-green-100 text-green-800' :
                      paper.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">{paper.processingTime.toFixed(1)}s</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className={`font-medium ${
                        paper.dataQualityScore >= 80 ? 'text-green-600' :
                        paper.dataQualityScore >= 70 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {paper.dataQualityScore}%
                      </span>
                    </div>
                  </td>
                  <td className="p-4">{paper.extractedFields}</td>
                  <td className="p-4">
                    {paper.validationIssues > 0 ? (
                      <span className="text-yellow-600">{paper.validationIssues} issues</span>
                    ) : (
                      <span className="text-green-600">None</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between border-t p-4">
          <div className="flex items-center text-sm text-gray-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredPapers.length)} of {filteredPapers.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border'
              }`}
            >
              Previous
            </button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
              className={`px-3 py-1 rounded-md ${
                currentPage === pageCount
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* System Alert */}
      {stats.errors > 0 && (
        <div className="mt-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Processing Issues Detected</AlertTitle>
            <AlertDescription>
              {stats.errors} papers failed to process completely. Please review the errors and retry processing for these papers.
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      {/* Statistical Analysis Button */}
      <div className="mt-8 flex justify-center">
        <button 
          className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg font-semibold shadow-sm"
          onClick={() => {
            // Add statistical analysis logic here
            console.log('Running statistical analysis...');
          }}
        >
          Run Statistical Analysis
        </button>
      </div>
    </div>
  );
};

export default ProcessingResults;