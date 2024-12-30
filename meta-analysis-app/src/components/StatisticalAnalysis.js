import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { ArrowLeft, Download, TrendingUp, BookOpen, Brain, School } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { useNavigate } from 'react-router-dom';

const StatisticalAnalysis = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Studies data
  const studies = [
    { id: 1, title: "Impact Assessment of Treatment Intervention on Student Performance", design: "RCT", n: 156, d: 0.84, ci: [0.72, 0.96] },
    { id: 2, title: "Experimental Analysis of Intervention Outcomes in Educational Settings", design: "RCT", n: 142, d: 0.89, ci: [0.76, 1.02] },
    { id: 3, title: "Comparative Study of Treatment Effects on Learning Outcomes", design: "Quasi-Experimental", n: 128, d: 0.76, ci: [0.61, 0.91] },
    { id: 4, title: "Randomized Control Trial of Educational Intervention", design: "RCT", n: 198, d: 0.92, ci: [0.81, 1.03] },
    { id: 5, title: "Longitudinal Analysis of Treatment Impact on Achievement", design: "Longitudinal", n: 165, d: 0.71, ci: [0.58, 0.84] },
    { id: 6, title: "Digital Learning Enhancement through AI Integration", design: "Pre-Post", n: 112, d: 0.88, ci: [0.73, 1.03] },
    { id: 7, title: "Machine Learning Applications in Student Assessment", design: "Quasi-Experimental", n: 145, d: 0.79, ci: [0.65, 0.93] },
    { id: 8, title: "Adaptive Learning Systems Effectiveness Study", design: "RCT", n: 178, d: 0.86, ci: [0.74, 0.98] },
    { id: 9, title: "Personalized Learning Pathways Analysis", design: "Pre-Post", n: 98, d: 0.91, ci: [0.75, 1.07] },
    { id: 10, title: "Intelligent Tutoring Systems Impact Evaluation", design: "RCT", n: 167, d: 0.83, ci: [0.71, 0.95] },
    { id: 11, title: "AI-Driven Feedback Mechanisms Study", design: "Quasi-Experimental", n: 134, d: 0.77, ci: [0.63, 0.91] },
    { id: 12, title: "Educational Data Mining Outcomes Research", design: "Longitudinal", n: 189, d: 0.73, ci: [0.61, 0.85] },
    { id: 13, title: "Predictive Analytics in Student Support", design: "Pre-Post", n: 122, d: 0.85, ci: [0.70, 1.00] },
    { id: 14, title: "Natural Language Processing in Education", design: "RCT", n: 144, d: 0.88, ci: [0.75, 1.01] },
    { id: 15, title: "Automated Assessment System Evaluation", design: "Quasi-Experimental", n: 156, d: 0.81, ci: [0.68, 0.94] },
    { id: 16, title: "Deep Learning for Student Engagement", design: "Pre-Post", n: 108, d: 0.94, ci: [0.78, 1.10] },
    { id: 17, title: "Neural Networks in Educational Context", design: "RCT", n: 176, d: 0.87, ci: [0.75, 0.99] },
    { id: 18, title: "Computer Vision Applications in Learning", design: "Longitudinal", n: 145, d: 0.69, ci: [0.56, 0.82] },
    { id: 19, title: "Cognitive Computing Impact Study", design: "Quasi-Experimental", n: 132, d: 0.78, ci: [0.64, 0.92] },
    { id: 20, title: "AI-Enhanced Learning Environment Analysis", design: "Pre-Post", n: 116, d: 0.90, ci: [0.75, 1.05] },
    { id: 21, title: "Machine Learning-Based Assessment Tools", design: "RCT", n: 158, d: 0.85, ci: [0.72, 0.98] },
    { id: 22, title: "Automated Feedback Systems Evaluation", design: "Quasi-Experimental", n: 138, d: 0.75, ci: [0.61, 0.89] },
    { id: 23, title: "AI Integration in Educational Practice", design: "RCT", n: 182, d: 0.86, ci: [0.74, 0.98] }
  ];

  const totalPages = Math.ceil(studies.length / itemsPerPage);
  // Sample data for analysis
  const methodologyDistribution = [
    { name: 'Machine Learning', value: 45, color: '#3B82F6' },
    { name: 'Deep Learning', value: 30, color: '#10B981' },
    { name: 'Natural Language Processing', value: 15, color: '#F59E0B' },
    { name: 'Computer Vision', value: 10, color: '#6366F1' }
  ];

  const yearlyTrends = Array.from({ length: 5 }, (_, i) => ({
    year: 2019 + i,
    papers: Math.floor(Math.random() * 50 + 50),
    citations: Math.floor(Math.random() * 1000 + 500),
    impactFactor: (Math.random() * 2 + 2).toFixed(2)
  }));

  const outcomeMetrics = [
    { category: '90-100', academic: 45, engagement: 38 },
    { category: '80-89', academic: 65, engagement: 58 },
    { category: '70-79', academic: 35, engagement: 42 },
    { category: '60-69', academic: 25, engagement: 30 }
  ];

  const correlationData = Array.from({ length: 20 }, (_, i) => ({
    aiImplementation: Math.random() * 100,
    studentPerformance: Math.random() * 100 + (Math.random() * 20)
  }));

  const navigate = useNavigate();
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <button className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Results
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Statistical Analysis Results</h1>
            <h2 className="text-xl text-gray-600 font-semibold mb-1">AI-Enhanced Learning Analytics</h2>
            <p className="text-gray-500">
              Systematic review of AI integration in educational assessment and analytics
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              View Summary
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Papers Analyzed
            </CardTitle>
            <BookOpen className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-gray-500">+12% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Average Impact Factor
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.82</div>
            <p className="text-xs text-gray-500">Top quartile in field</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              AI Methods Used
            </CardTitle>
            <Brain className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-500">Across all studies</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Educational Contexts
            </CardTitle>
            <School className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-gray-500">Different settings</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">AI Methodology Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={methodologyDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {methodologyDistribution.map((entry, index) => (
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
          <h3 className="text-lg font-semibold mb-4">Publication Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yearlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="papers" stroke="#3B82F6" name="Papers Published" />
                <Line yAxisId="right" type="monotone" dataKey="citations" stroke="#10B981" name="Citations" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Effect Size Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h3 className="text-lg font-semibold mb-4">Average Effect Size by Research Design</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Overall Effect</div>
              <div className="text-2xl font-bold text-blue-700">d = 0.82</div>
              <div className="text-xs text-gray-500">95% CI [0.76, 0.88]</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Heterogeneity</div>
              <div className="text-2xl font-bold text-green-700">I² = 68%</div>
              <div className="text-xs text-gray-500">Moderate to high</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Studies</div>
              <div className="text-2xl font-bold text-yellow-700">N = 45</div>
              <div className="text-xs text-gray-500">Total studies</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Publication Bias</div>
              <div className="text-2xl font-bold text-purple-700">p = .34</div>
              <div className="text-xs text-gray-500">Egger's test</div>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={[
                  { design: 'Randomized Control Trial', effectSize: 0.85, ci: 0.12, studies: 15 },
                  { design: 'Quasi-Experimental', effectSize: 0.76, ci: 0.14, studies: 12 },
                  { design: 'Pre-Post Design', effectSize: 0.92, ci: 0.15, studies: 10 },
                  { design: 'Longitudinal', effectSize: 0.71, ci: 0.13, studies: 8 }
                ]}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 1.2]} />
                <YAxis type="category" dataKey="design" />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'effectSize') return [`${value} (Cohen's d)`, 'Effect Size'];
                    return [value, name];
                  }}
                />
                <Bar 
                  dataKey="effectSize" 
                  fill="#3B82F6"
                  label={{ position: 'right', formatter: (value) => `d = ${value}` }}
                >
                  {/* Error bars for confidence intervals */}
                  {[0, 1, 2, 3].map((index) => (
                    <Cell key={`cell-${index}`} fill="#3B82F6" fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="text-sm text-gray-600">
            <span className="font-semibold">Note:</span> Effect sizes are reported as Cohen's d. Error bars represent 95% confidence intervals. 
            Study designs are classified according to the PRISMA guidelines.
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Learning Outcomes Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={outcomeMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="academic" fill="#3B82F6" name="Academic Performance" />
                <Bar dataKey="engagement" fill="#10B981" name="Student Engagement" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">AI Implementation vs Student Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="aiImplementation" name="AI Implementation Score" />
                <YAxis type="number" dataKey="studentPerformance" name="Student Performance Score" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={correlationData} fill="#3B82F6" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Effect Size vs Sample Size Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h3 className="text-lg font-semibold mb-4">Effect Size vs Sample Size Analysis</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Median Sample Size</div>
              <div className="text-2xl font-bold text-indigo-700">N = 124</div>
              <div className="text-xs text-gray-500">Range: 45-485</div>
            </div>
            <div className="bg-cyan-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Small Study Effect</div>
              <div className="text-2xl font-bold text-cyan-700">r = -0.12</div>
              <div className="text-xs text-gray-500">Sample size correlation</div>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Power Analysis</div>
              <div className="text-2xl font-bold text-teal-700">74%</div>
              <div className="text-xs text-gray-500">Studies with ≥80% power</div>
            </div>
          </div>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  type="number" 
                  dataKey="sampleSize" 
                  name="Sample Size" 
                  label={{ value: 'Sample Size (N)', position: 'bottom', offset: 20 }}
                  scale="log"
                  domain={[10, 'auto']}
                  tickFormatter={(value) => value.toLocaleString()}
                />
                <YAxis 
                  type="number" 
                  dataKey="effectSize" 
                  name="Effect Size" 
                  label={{ value: "Effect Size (Cohen's d)", angle: -90, position: 'left', offset: 10 }}
                  domain={[-0.5, 2]}
                />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'Effect Size') return [`${value.toFixed(2)} (d)`, name];
                    if (name === 'Sample Size') return [value.toLocaleString(), name];
                    return [value, name];
                  }}
                />
                <Scatter 
                  name="Studies" 
                  data={[
                    ...Array.from({ length: 45 }, (_, i) => ({
                      sampleSize: Math.floor(Math.exp(Math.random() * Math.log(1500) + Math.log(20))),
                      effectSize: 0.82 + (Math.random() * 0.4 - 0.2) * (1 - Math.log(Math.random() * 1000 + 20) / Math.log(1500)),
                      precision: Math.random()
                    }))
                  ]}
                  fill="#6366F1"
                  fillOpacity={0.6}
                />
                {/* Reference lines */}
                <line
                  x1={0}
                  y1={0.82}
                  x2="100%"
                  y2={0.82}
                  stroke="#3B82F6"
                  strokeDasharray="5 5"
                  strokeWidth={1}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-blue-500"></div>
              <span className="text-sm text-gray-600">Pooled effect size (d = 0.82)</span>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Interpretation:</span> The funnel-like distribution shows studies with larger sample sizes tend to converge around the pooled effect size, while smaller studies show more variance. This pattern is typical and suggests limited publication bias.
            </p>
          </div>
        </div>
      </div>

      {/* Included Studies List */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Included Studies (N=23)</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800">Export List</button>
        </div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Study</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Design</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sample Size</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Effect Size</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">95% CI</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {studies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((study) => (
                <tr key={study.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-900">{study.title}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{study.design}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{study.n}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 font-medium">{study.d.toFixed(2)}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">[{study.ci[0].toFixed(2)}, {study.ci[1].toFixed(2)}]</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${
                  currentPage === 1
                    ? 'border-gray-200 bg-gray-50 text-gray-400'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className={`relative ml-3 inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${
                  currentPage === totalPages
                    ? 'border-gray-200 bg-gray-50 text-gray-400'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(currentPage * itemsPerPage, studies.length)}</span> of{' '}
                  <span className="font-medium">{studies.length}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${
                      currentPage === 1
                        ? 'bg-gray-50 text-gray-400'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        currentPage === idx + 1
                          ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                          : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                      currentPage === totalPages
                        ? 'bg-gray-50 text-gray-400'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Findings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h3 className="text-lg font-semibold mb-4">Key Findings</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-1 h-16 bg-blue-500 rounded-full"></div>
            <div>
              <h4 className="font-semibold">Implementation Impact</h4>
              <p className="text-gray-600">Machine learning algorithms show a strong positive correlation (r=0.78) with improved student performance across diverse educational contexts.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-1 h-16 bg-green-500 rounded-full"></div>
            <div>
              <h4 className="font-semibold">Engagement Metrics</h4>
              <p className="text-gray-600">AI-enhanced learning systems demonstrated a 42% increase in student engagement rates compared to traditional methods.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-1 h-16 bg-yellow-500 rounded-full"></div>
            <div>
              <h4 className="font-semibold">Methodology Trends</h4>
              <p className="text-gray-600">Deep learning approaches are showing rapid adoption growth, with a 65% increase in implementation over the past two years.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticalAnalysis;