import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
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
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const StatisticalAnalysisDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const studyData = [
    { id: 45, study: "van der Berg et al. (2023)", effectSize: 0.82, ci_lower: 0.74, ci_upper: 0.90, weight: 16.0, n: 329, design: "Longitudinal" },
    { id: 44, study: "Chowdhury et al. (2023)", effectSize: 0.78, ci_lower: 0.70, ci_upper: 0.86, weight: 15.4, n: 301, design: "RCT" },
    { id: 43, study: "Fitzgerald et al. (2023)", effectSize: 0.79, ci_lower: 0.71, ci_upper: 0.87, weight: 15.7, n: 316, design: "RCT" },
    { id: 42, study: "Yamamoto et al. (2023)", effectSize: 0.84, ci_lower: 0.76, ci_upper: 0.92, weight: 16.3, n: 339, design: "Longitudinal" },
    { id: 41, study: "Patel-Singh et al. (2023)", effectSize: 0.77, ci_lower: 0.69, ci_upper: 0.85, weight: 15.2, n: 293, design: "Quasi-Experimental" },
    { id: 40, study: "De Silva et al. (2023)", effectSize: 0.83, ci_lower: 0.75, ci_upper: 0.91, weight: 16.1, n: 334, design: "RCT" },
    { id: 39, study: "Kowalski et al. (2023)", effectSize: 0.78, ci_lower: 0.70, ci_upper: 0.86, weight: 15.5, n: 308, design: "Quasi-Experimental" },
    { id: 38, study: "Ibrahim et al. (2023)", effectSize: 0.86, ci_lower: 0.78, ci_upper: 0.94, weight: 16.7, n: 359, design: "Longitudinal" },
    { id: 37, study: "Dubois et al. (2023)", effectSize: 0.81, ci_lower: 0.73, ci_upper: 0.89, weight: 15.8, n: 319, design: "RCT" },
    { id: 36, study: "Chang et al. (2023)", effectSize: 0.75, ci_lower: 0.67, ci_upper: 0.83, weight: 14.9, n: 286, design: "Longitudinal" },
    { id: 35, study: "Romano et al. (2023)", effectSize: 0.87, ci_lower: 0.79, ci_upper: 0.95, weight: 16.4, n: 352, design: "Quasi-Experimental" },
    { id: 34, study: "Petrov et al. (2023)", effectSize: 0.77, ci_lower: 0.69, ci_upper: 0.85, weight: 15.3, n: 295, design: "Quasi-Experimental" },
    { id: 33, study: "Montgomery et al. (2023)", effectSize: 0.85, ci_lower: 0.77, ci_upper: 0.93, weight: 16.6, n: 344, design: "RCT" },
    { id: 32, study: "Hassan et al. (2023)", effectSize: 0.76, ci_lower: 0.68, ci_upper: 0.84, weight: 15.5, n: 305, design: "RCT" },
    { id: 31, study: "Santos et al. (2023)", effectSize: 0.84, ci_lower: 0.76, ci_upper: 0.92, weight: 16.2, n: 332, design: "Quasi-Experimental" },
    { id: 30, study: "Müller et al. (2023)", effectSize: 0.79, ci_lower: 0.71, ci_upper: 0.87, weight: 15.8, n: 328, design: "Longitudinal" },
    { id: 29, study: "Gupta et al. (2023)", effectSize: 0.82, ci_lower: 0.74, ci_upper: 0.90, weight: 16.4, n: 338, design: "RCT" },
    { id: 28, study: "O'Connor et al. (2023)", effectSize: 0.75, ci_lower: 0.67, ci_upper: 0.83, weight: 15.6, n: 309, design: "Quasi-Experimental" },
    { id: 27, study: "Sato et al. (2023)", effectSize: 0.88, ci_lower: 0.80, ci_upper: 0.96, weight: 16.7, n: 347, design: "RCT" },
    { id: 26, study: "Ivanova et al. (2023)", effectSize: 0.74, ci_lower: 0.66, ci_upper: 0.82, weight: 15.4, n: 302, design: "Longitudinal" },
    { id: 25, study: "Park et al. (2023)", effectSize: 0.80, ci_lower: 0.72, ci_upper: 0.88, weight: 15.9, n: 325, design: "RCT" },
    { id: 24, study: "Sharma et al. (2023)", effectSize: 0.86, ci_lower: 0.78, ci_upper: 0.94, weight: 16.5, n: 342, design: "Quasi-Experimental" },
    { id: 23, study: "Cohen et al. (2023)", effectSize: 0.77, ci_lower: 0.69, ci_upper: 0.85, weight: 14.9, n: 278, design: "RCT" },
    { id: 22, study: "Kumar et al. (2023)", effectSize: 0.83, ci_lower: 0.75, ci_upper: 0.91, weight: 17.3, n: 367, design: "Longitudinal" },
    { id: 21, study: "Nguyen et al. (2023)", effectSize: 0.78, ci_lower: 0.70, ci_upper: 0.86, weight: 16.1, n: 315, design: "Quasi-Experimental" },
    { id: 20, study: "Zhang et al. (2023)", effectSize: 0.81, ci_lower: 0.73, ci_upper: 0.89, weight: 15.7, n: 298, design: "RCT" },
    { id: 1, study: "Smith et al. (2023)", effectSize: 0.82, ci_lower: 0.75, ci_upper: 0.89, weight: 15.2, n: 245, design: "RCT" },
    { id: 2, study: "Johnson et al. (2023)", effectSize: 0.79, ci_lower: 0.71, ci_upper: 0.87, weight: 18.4, n: 312, design: "Quasi-Experimental" },
    { id: 3, study: "Williams et al. (2022)", effectSize: 0.75, ci_lower: 0.68, ci_upper: 0.82, weight: 12.6, n: 189, design: "RCT" },
    { id: 4, study: "Brown et al. (2022)", effectSize: 0.81, ci_lower: 0.74, ci_upper: 0.88, weight: 20.1, n: 378, design: "RCT" },
    { id: 5, study: "Davis et al. (2023)", effectSize: 0.77, ci_lower: 0.69, ci_upper: 0.85, weight: 15.8, n: 256, design: "Quasi-Experimental" },
    { id: 6, study: "Miller et al. (2022)", effectSize: 0.73, ci_lower: 0.65, ci_upper: 0.81, weight: 17.9, n: 423, design: "Longitudinal" },
    { id: 7, study: "Wilson et al. (2023)", effectSize: 0.84, ci_lower: 0.76, ci_upper: 0.92, weight: 14.2, n: 289, design: "RCT" },
    { id: 8, study: "Moore et al. (2022)", effectSize: 0.76, ci_lower: 0.68, ci_upper: 0.84, weight: 16.3, n: 334, design: "Quasi-Experimental" },
    { id: 9, study: "Taylor et al. (2023)", effectSize: 0.80, ci_lower: 0.72, ci_upper: 0.88, weight: 13.0, n: 267, design: "RCT" },
    { id: 10, study: "Anderson et al. (2022)", effectSize: 0.78, ci_lower: 0.70, ci_upper: 0.86, weight: 16.6, n: 345, design: "Longitudinal" },
    { id: 11, study: "Thompson et al. (2023)", effectSize: 0.83, ci_lower: 0.75, ci_upper: 0.91, weight: 14.8, n: 298, design: "RCT" },
    { id: 12, study: "Garcia et al. (2023)", effectSize: 0.76, ci_lower: 0.68, ci_upper: 0.84, weight: 15.5, n: 312, design: "Quasi-Experimental" },
    { id: 13, study: "Martinez et al. (2022)", effectSize: 0.79, ci_lower: 0.71, ci_upper: 0.87, weight: 16.2, n: 345, design: "RCT" },
    { id: 14, study: "Lee et al. (2023)", effectSize: 0.81, ci_lower: 0.73, ci_upper: 0.89, weight: 13.9, n: 276, design: "Longitudinal" },
    { id: 15, study: "White et al. (2022)", effectSize: 0.77, ci_lower: 0.69, ci_upper: 0.85, weight: 15.1, n: 301, design: "RCT" },
    { id: 16, study: "Rodriguez et al. (2023)", effectSize: 0.85, ci_lower: 0.77, ci_upper: 0.93, weight: 16.8, n: 356, design: "Quasi-Experimental" },
    { id: 17, study: "Kim et al. (2023)", effectSize: 0.78, ci_lower: 0.70, ci_upper: 0.86, weight: 15.3, n: 287, design: "RCT" },
    { id: 18, study: "Chen et al. (2022)", effectSize: 0.82, ci_lower: 0.74, ci_upper: 0.90, weight: 17.2, n: 394, design: "RCT" },
    { id: 19, study: "Patel et al. (2023)", effectSize: 0.76, ci_lower: 0.68, ci_upper: 0.84, weight: 14.7, n: 265, design: "Quasi-Experimental" }
  ];

  const designAverages = Object.entries(
    studyData.reduce((acc, study) => {
      if (!acc[study.design]) {
        acc[study.design] = { total: 0, count: 0 };
      }
      acc[study.design].total += study.effectSize;
      acc[study.design].count += 1;
      return acc;
    }, {})
  ).map(([design, data]) => ({
    design,
    averageEffect: data.total / data.count
  }));

  const totalPages = Math.ceil(studyData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudies = studyData.slice(startIndex, endIndex);

  const totalSampleSize = studyData.reduce((sum, study) => sum + study.n, 0);
  const meanEffectSize = (studyData.reduce((sum, study) => sum + study.effectSize, 0) / studyData.length).toFixed(2);
  const navigate = useNavigate();

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

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Average Effect Size by Design</CardTitle>
            <CardDescription>Comparison across study methodologies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer>
                <BarChart data={designAverages}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="design" />
                  <YAxis domain={[0.5, 1]} />
                  <Tooltip />
                  <Bar dataKey="averageEffect" fill="#8884d8" name="Average Effect Size" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Effect Size vs Sample Size</CardTitle>
            <CardDescription>Relationship between study size and effect</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="n" 
                    type="number" 
                    name="Sample Size"
                    domain={['auto', 'auto']}
                  />
                  <YAxis 
                    dataKey="effectSize" 
                    type="number" 
                    name="Effect Size"
                    domain={[0.5, 1]}
                  />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Studies" data={studyData} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticalAnalysisDashboard;