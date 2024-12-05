import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ScatterPlot, Scatter, ResponsiveContainer,
  ComposedChart, Line
} from 'recharts';
import { FileSearch, Filter, Download, ArrowUpDown } from 'lucide-react';

// Sample data - in real app this would come from your backend
const generateSampleData = () => {
  const designs = ['RCT', 'Quasi-Experimental', 'Pre-Post', 'Crossover'];
  const domains = ['Healthcare', 'Education', 'Psychology', 'Social Work'];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Study ${i + 1}`,
    authors: `Author ${i + 1} et al.`,
    year: Math.floor(Math.random() * (2024 - 2020) + 2020),
    design: designs[Math.floor(Math.random() * designs.length)],
    domain: domains[Math.floor(Math.random() * domains.length)],
    sampleSize: Math.floor(Math.random() * (1000 - 50) + 50),
    effectSize: Number((Math.random() * (1.2 - 0.1) + 0.1).toFixed(2)),
    pValue: Number((Math.random() * 0.05).toFixed(3)),
    ci95: {
      lower: Number((Math.random() * (-0.5 - -1.0) + -1.0).toFixed(2)),
      upper: Number((Math.random() * (1.0 - 0.5) + 0.5).toFixed(2))
    }
  }));
};

const StudyAnalysisDashboard = () => {
  const [studies] = useState(generateSampleData());
  const [sortConfig, setSortConfig] = useState({ key: 'effectSize', direction: 'desc' });
  const [filter, setFilter] = useState({ design: 'all', domain: 'all' });
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate aggregate statistics
  const aggregateByDesign = studies.reduce((acc, study) => {
    if (!acc[study.design]) {
      acc[study.design] = {
        design: study.design,
        count: 0,
        totalEffectSize: 0,
        studies: []
      };
    }
    acc[study.design].count += 1;
    acc[study.design].totalEffectSize += study.effectSize;
    acc[study.design].studies.push(study);
    return acc;
  }, {});

  const designStats = Object.values(aggregateByDesign).map(item => ({
    design: item.design,
    count: item.count,
    averageEffectSize: Number((item.totalEffectSize / item.count).toFixed(2))
  }));

  // Filter and sort studies
  const filteredStudies = studies.filter(study => {
    const matchesDesign = filter.design === 'all' || study.design === filter.design;
    const matchesDomain = filter.domain === 'all' || study.domain === filter.domain;
    const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         study.authors.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDesign && matchesDomain && matchesSearch;
  });

  const sortedStudies = [...filteredStudies].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  // Prepare scatter plot data
  const scatterData = studies.map(study => ({
    sampleSize: study.sampleSize,
    effectSize: study.effectSize,
    design: study.design
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Meta-Analysis Dashboard</h1>
        <p className="text-gray-600">Analysis of 50 studies examining effect sizes across different experimental designs</p>
      </div>

      {/* Filters and Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="relative">
          <FileSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search studies..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border rounded-lg"
          value={filter.design}
          onChange={(e) => setFilter({ ...filter, design: e.target.value })}
        >
          <option value="all">All Designs</option>
          <option value="RCT">RCT</option>
          <option value="Quasi-Experimental">Quasi-Experimental</option>
          <option value="Pre-Post">Pre-Post</option>
          <option value="Crossover">Crossover</option>
        </select>
        <select
          className="px-4 py-2 border rounded-lg"
          value={filter.domain}
          onChange={(e) => setFilter({ ...filter, domain: e.target.value })}
        >
          <option value="all">All Domains</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Psychology">Psychology</option>
          <option value="Social Work">Social Work</option>
        </select>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Download className="h-5 w-5" />
          Export Analysis
        </button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Effect Size by Design */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Average Effect Size by Design</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={designStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="design" />
                <YAxis label={{ value: 'Effect Size', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="averageEffectSize" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Effect Size vs Sample Size */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Effect Size vs Sample Size</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={scatterData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="sampleSize" 
                  label={{ value: 'Sample Size', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  label={{ value: 'Effect Size', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip />
                <Scatter dataKey="effectSize" fill="#4F46E5" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Studies Table */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Individual Studies</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Study</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Design</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Domain</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                    onClick={() => setSortConfig({ 
                      key: 'sampleSize', 
                      direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' 
                    })}
                >
                  <div className="flex items-center gap-2">
                    Sample Size
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                    onClick={() => setSortConfig({ 
                      key: 'effectSize', 
                      direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' 
                    })}
                >
                  <div className="flex items-center gap-2">
                    Effect Size
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">95% CI</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">p-value</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudies.map((study) => (
                <tr key={study.id} className="border-b">
                  <td className="px-6 py-4">
                    <div className="font-medium">{study.title}</div>
                    <div className="text-sm text-gray-500">{study.authors}</div>
                  </td>
                  <td className="px-6 py-4">{study.design}</td>
                  <td className="px-6 py-4">{study.domain}</td>
                  <td className="px-6 py-4">{study.sampleSize}</td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${
                      study.effectSize > 0.5 ? 'text-green-600' : 
                      study.effectSize > 0.2 ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {study.effectSize.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    [{study.ci95.lower.toFixed(2)}, {study.ci95.upper.toFixed(2)}]
                  </td>
                  <td className="px-6 py-4">
                    <span className={study.pValue < 0.05 ? 'text-green-600' : 'text-red-600'}>
                      {study.pValue.toFixed(3)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudyAnalysisDashboard;
