import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { 
  ArrowLeft,
  ChevronRight,
  Download,
  FileText,
  TrendingUp,
  BarChart2,
  Users,
  ChevronLeft
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const StatisticalAnalysisDashboard = () => {
  const [powerLevel, setPowerLevel] = useState(0.8);
  const [significanceLevel, setSignificanceLevel] = useState(0.05);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const navigate = useNavigate();
  const studyData = [
    { id: 1, study: "Smith et al. (2023)", effectSize: 0.82, ci_lower: 0.75, ci_upper: 0.89, weight: 15.2, n: 245 },
    { id: 2, study: "Johnson et al. (2023)", effectSize: 0.79, ci_lower: 0.71, ci_upper: 0.87, weight: 18.4, n: 312 },
    { id: 3, study: "Williams et al. (2022)", effectSize: 0.75, ci_lower: 0.68, ci_upper: 0.82, weight: 12.6, n: 189 },
    { id: 4, study: "Brown et al. (2022)", effectSize: 0.81, ci_lower: 0.74, ci_upper: 0.88, weight: 20.1, n: 378 },
    { id: 5, study: "Davis et al. (2023)", effectSize: 0.77, ci_lower: 0.69, ci_upper: 0.85, weight: 15.8, n: 256 },
    { id: 6, study: "Miller et al. (2022)", effectSize: 0.73, ci_lower: 0.65, ci_upper: 0.81, weight: 17.9, n: 423 },
    { id: 7, study: "Wilson et al. (2023)", effectSize: 0.84, ci_lower: 0.76, ci_upper: 0.92, weight: 14.2, n: 289 },
    { id: 8, study: "Moore et al. (2022)", effectSize: 0.76, ci_lower: 0.68, ci_upper: 0.84, weight: 16.3, n: 334 },
    { id: 9, study: "Taylor et al. (2023)", effectSize: 0.80, ci_lower: 0.72, ci_upper: 0.88, weight: 13.0, n: 267 },
    { id: 10, study: "Anderson et al. (2022)", effectSize: 0.78, ci_lower: 0.70, ci_upper: 0.86, weight: 16.6, n: 345 },
    { id: 11, study: "Thompson et al. (2023)", effectSize: 0.83, ci_lower: 0.75, ci_upper: 0.91, weight: 14.8, n: 298 },
    { id: 12, study: "Garcia et al. (2023)", effectSize: 0.76, ci_lower: 0.68, ci_upper: 0.84, weight: 15.5, n: 312 },
    { id: 13, study: "Martinez et al. (2022)", effectSize: 0.79, ci_lower: 0.71, ci_upper: 0.87, weight: 16.2, n: 345 },
    { id: 14, study: "Lee et al. (2023)", effectSize: 0.81, ci_lower: 0.73, ci_upper: 0.89, weight: 13.9, n: 276 },
    { id: 15, study: "White et al. (2022)", effectSize: 0.77, ci_lower: 0.69, ci_upper: 0.85, weight: 15.1, n: 301 },
    { id: 16, study: "Rodriguez et al. (2023)", effectSize: 0.85, ci_lower: 0.77, ci_upper: 0.93, weight: 16.8, n: 356 },
    { id: 17, study: "Kim et al. (2023)", effectSize: 0.78, ci_lower: 0.70, ci_upper: 0.86, weight: 15.3, n: 287 },
    { id: 18, study: "Chen et al. (2022)", effectSize: 0.82, ci_lower: 0.74, ci_upper: 0.90, weight: 17.2, n: 394 },
    { id: 19, study: "Patel et al. (2023)", effectSize: 0.76, ci_lower: 0.68, ci_upper: 0.84, weight: 14.7, n: 265 },
    { id: 20, study: "Lewis et al. (2022)", effectSize: 0.80, ci_lower: 0.72, ci_upper: 0.88, weight: 16.4, n: 328 }
  ];

  const totalPages = Math.ceil(studyData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudies = studyData.slice(startIndex, endIndex);

  const totalSampleSize = studyData.reduce((sum, study) => sum + study.n, 0);
  const meanEffectSize = (studyData.reduce((sum, study) => sum + study.effectSize, 0) / studyData.length).toFixed(2);

  const powerCurveData = Array.from({ length: 20 }, (_, i) => {
    const n = (i + 1) * 50;
    const power = 1 - Math.exp(-n / 500);
    return { n, power };
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Social-Emotional Learning Technologies</h1>
        <p className="text-lg text-gray-600">Comprehensive review of digital tools supporting social-emotional development.</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div onClick={() => { navigate('/dashboard'); }} className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Overview
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
            <Download className="h-5 w-5 mr-2" />
            Export Analysis
          </button>
          <button onClick={() => { navigate('/project-dashboard'); }}  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            View Summary
            <ChevronRight className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Studies</p>
                <p className="text-2xl font-bold text-gray-900">{studyData.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Mean Effect Size</p>
                <p className="text-2xl font-bold text-gray-900">{meanEffectSize}</p>
              </div>
              <div className="p-2 bg-indigo-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Heterogeneity (I²)</p>
                <p className="text-2xl font-bold text-gray-900">32.5%</p>
              </div>
              <div className="p-2 bg-violet-100 rounded-lg">
                <BarChart2 className="h-5 w-5 text-violet-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sample</p>
                <p className="text-2xl font-bold text-gray-900">{totalSampleSize.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Effect Size Analysis</CardTitle>
          <CardDescription>
            Showing studies {startIndex + 1}-{Math.min(endIndex, studyData.length)} of {studyData.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Study</th>
                  <th className="text-right py-3 px-4">Effect Size</th>
                  <th className="text-right py-3 px-4">95% CI</th>
                  <th className="text-right py-3 px-4">Weight (%)</th>
                  <th className="text-right py-3 px-4">Sample Size</th>
                </tr>
              </thead>
              <tbody>
                {currentStudies.map((study) => (
                  <tr key={study.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{study.study}</td>
                    <td className="text-right py-3 px-4">{study.effectSize.toFixed(2)}</td>
                    <td className="text-right py-3 px-4">[{study.ci_lower.toFixed(2)}, {study.ci_upper.toFixed(2)}]</td>
                    <td className="text-right py-3 px-4">{study.weight.toFixed(1)}</td>
                    <td className="text-right py-3 px-4">{study.n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Power Analysis</CardTitle>
          <CardDescription>Statistical power by sample size</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Power Level</label>
              <input
                type="range"
                min="0.5"
                max="0.95"
                step="0.05"
                value={powerLevel}
                onChange={(e) => setPowerLevel(parseFloat(e.target.value))}
                className="w-48"
              />
              <span className="ml-2">{(powerLevel * 100).toFixed(0)}%</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Significance Level (α)</label>
              <select
                value={significanceLevel}
                onChange={(e) => setSignificanceLevel(parseFloat(e.target.value))}
                className="bg-white border rounded-md px-3 py-1.5"
              >
                <option value="0.01">0.01</option>
                <option value="0.05">0.05</option>
                <option value="0.10">0.10</option>
              </select>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={powerCurveData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="n" 
                  label={{ value: 'Sample Size', position: 'bottom' }} 
                />
                <YAxis 
                  domain={[0, 1]} 
                  label={{ value: 'Power', angle: -90, position: 'insideLeft' }} 
                />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="power" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.3} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticalAnalysisDashboard;
