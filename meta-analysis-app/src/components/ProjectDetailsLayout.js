import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardActions, Typography, Grid, Button, LinearProgress } from '@mui/material';
import { ArrowBack, Download, CheckCircle, AccessTime, People, Info, TrendingUp, Article, CheckBox, Settings } from '@mui/icons-material';

const ProjectDetailsLayout = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(4);
  
  const MetricCard = ({ icon: Icon, bgColor, iconColor, label, value, note }) => (
    <div className="flex flex-col space-y-2 p-4 bg-white rounded-lg border border-gray-100">
      <div className="flex items-center space-x-4">
        <div className={`p-2 ${bgColor} rounded-lg`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
      <div className="flex items-start space-x-1.5 pt-2 border-t border-gray-100">
        <Info className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-gray-500 leading-tight">{note}</p>
      </div>
    </div>
  );

  const completedProject = {
    id: 4,
    title: "Social-Emotional Learning Technologies",
    description: "Comprehensive review of digital tools supporting social-emotional development.",
    status: "Completed",
    studies: 45,
    team: 4,
    metrics: {
      effectSize: 0.78,
      heterogeneity: "Low",
      aiConfidence: 94,
      qualityScore: 92,
      implementation: 88
    },
    detailedMetrics: {
      methodology: {
        approach: "Mixed-methods systematic review with meta-analysis",
        inclusion: [
          "Peer-reviewed studies (2018-2024)",
          "K-12 educational settings",
          "Digital SEL interventions",
          "Quantitative outcome measures"
        ],
        analysisMethod: "Random-effects model with moderator analysis",
        qualityAssessment: "GRADE framework"
      },
      limitations: [
        "Limited long-term follow-up studies",
        "Potential publication bias in positive results",
        "Varied implementation contexts",
        "Technology access disparities"
      ],
      recommendations: [
        "Implement structured teacher training programs",
        "Integrate culturally responsive design elements",
        "Establish standardized outcome measures",
        "Develop adaptive intervention protocols"
      ],
      futureDirections: [
        "Longitudinal impact studies",
        "Cross-cultural effectiveness research",
        "Cost-benefit analysis",
        "Integration with existing SEL frameworks"
      ],
      keyFindings: [
        "Digital SEL tools show significant positive impact on student emotional awareness (d = 0.82)",
        "Gamified approaches demonstrate higher engagement rates across all age groups",
        "Teacher-mediated implementation shows 27% higher effectiveness",
        "Peer-to-peer features enhance learning outcomes by 31%"
      ],
      subgroups: [
        { name: "Elementary", effectSize: 0.81, studies: 15 },
        { name: "Middle School", effectSize: 0.76, studies: 18 },
        { name: "High School", effectSize: 0.72, studies: 12 }
      ]
    }
  };

  const ProjectDetailView = ({ project, onBack }) => {
    return (
      <div className="min-h-screen bg-gray-50 p-8 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Download className="h-5 w-5 mr-2" />
            Export Report
          </button>
        </div>

        <Card>
          <CardHeader>
            <div className="space-y-6">
              <div>
                <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
                <CardDescription className="mt-2">{project.description}</CardDescription>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium text-green-700">Completed</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-600">Completed Feb 2024</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">{project.team} Team Members</span>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <MetricCard 
                  icon={TrendingUp}
                  bgColor="bg-indigo-100"
                  iconColor="text-indigo-600"
                  label="Effect Size"
                  value={project.metrics.effectSize.toFixed(2)}
                  note="Cohen's d value: 0.2 (small), 0.5 (medium), 0.8+ (large effect)"
                />
                
                <MetricCard 
                  icon={FileText}
                  bgColor="bg-blue-100"
                  iconColor="text-blue-600"
                  label="Studies"
                  value={project.studies}
                  note={`Meta-analysis of ${project.studies} studies covering ${(project.studies * 120).toLocaleString()} participants`}
                />
                
                <MetricCard 
                  icon={ClipboardCheck}
                  bgColor="bg-green-100"
                  iconColor="text-green-600"
                  label="Quality Score"
                  value={`${project.metrics.qualityScore}%`}
                  note="GRADE assessment: Methodology rigor & evidence strength"
                />
                
                <MetricCard 
                  icon={Settings}
                  bgColor="bg-violet-100"
                  iconColor="text-violet-600"
                  label="Implementation"
                  value={`${project.metrics.implementation}%`}
                  note="Fidelity score based on adoption & adherence metrics"
                />
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Research Summary</CardTitle>
            <CardDescription>Comprehensive overview of methodology, findings, and implications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">1. Methodology</h3>
                <div className="pl-4 space-y-3">
                  <p className="text-gray-700">
                    <span className="font-medium">Approach:</span> {project.detailedMetrics.methodology.approach}
                  </p>
                  <div>
                    <p className="font-medium text-gray-700">Inclusion Criteria:</p>
                    <ul className="list-disc pl-6 text-gray-600">
                      {project.detailedMetrics.methodology.inclusion.map((criterion, index) => (
                        <li key={index}>{criterion}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-medium">Analysis Method:</span> {project.detailedMetrics.methodology.analysisMethod}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Quality Assessment:</span> {project.detailedMetrics.methodology.qualityAssessment}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">2. Key Findings</h3>
                <ul className="pl-4 space-y-2">
                  {project.detailedMetrics.keyFindings.map((finding, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">3. Effect Size Analysis</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-3">Effect Sizes by Educational Level</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {project.detailedMetrics.subgroups.map((group) => (
                      <div key={group.name} className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="font-medium text-gray-900">{group.name}</p>
                        <p className="text-lg text-indigo-600">{group.effectSize.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{group.studies} studies</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">4. Study Limitations</h3>
                <ul className="pl-4 space-y-2">
                  {project.detailedMetrics.limitations.map((limitation, index) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">5. Key Recommendations</h3>
                <ul className="pl-4 space-y-2">
                  {project.detailedMetrics.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <Target className="h-5 w-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">6. Future Research Directions</h3>
                <ul className="pl-4 space-y-2">
                  {project.detailedMetrics.futureDirections.map((direction, index) => (
                    <li key={index} className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{direction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

//   return selectedProjectId ? (
//     <ProjectDetailView 
//       project={completedProject}
//       onBack={() => setSelectedProjectId(null)}
//     />
//   ) : (
//     <button 
//       onClick={() => setSelectedProjectId(4)}
//       className="p-4 bg-white rounded-lg shadow hover:shadow-md"
//     >
//       View Project Details
//     </button>
//   );
};

export default ProjectDetailsLayout;
