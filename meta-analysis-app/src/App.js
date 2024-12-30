import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import SimpleDomainFlow from './components/SimpleDomainFlow';
import CodebookSetup from './components/CodebookSetup';

import StudyAnalysisDashboard from './components/StudyAnalysisDashboard';
import PaperListReview from './components/PaperListReview';
import EducationAnalysisSetup from './components/EducationAnalysisSetup';
import DashboardLayout from './components/DashboardLayout';
import MetaAnalysisSettings from './components/MetaAnalysisSettings';
import PaperScreening from './components/PaperScreening';
import ProjectDetailsLayout from './components/ProjectDetailsLayout';


import AuthComponent from './components/AuthComponent';
import StatisticalAnalysisDashboard from './components/StatisticalAnalysisDashboard';
import ProjectSetup from './components/ProjectSetup';
import PicoFlow from './components/PicoFlow';
import ProjectSetupOverview from './components/ProjectSetupOverview';
import SinglePagePicoFlow from './components/SinglePagePicoFlow.js';
import PaperPoolOverview from './components/PaperPoolOverview';
import SelectionCriteriaResults from './components/SelectionCriteriaResults';
import CodebookExtraction from './components/CodebookExtraction';
import BatchExtraction from './components/BatchExtraction';
import ProcessingResults from './components/ProcessingResults';
import StatisticalAnalysis from './components/StatisticalAnalysis';
import ProjectSummary from './components/ProjectSummary';
import EducationAnalysisSettings from './components/EducationAnalysisSettings';



const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthComponent />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/select-domain" element={<SimpleDomainFlow />} />
          <Route path="/pico" element={<PicoFlow />} />
          <Route path="/codebook-setup" element={<CodebookSetup />} />
          <Route path="/education-analysis-settings" element={<EducationAnalysisSettings />} />
          <Route path="/education-analysis-setup" element={<EducationAnalysisSetup />} />
          <Route path="/paper-list-review" element={<PaperListReview />} />
          <Route path="/analysis-setting" element={<MetaAnalysisSettings />} />
          <Route path="/paper-screening" element={<PaperScreening />} />
          <Route path="/project-dashboard" element={<ProjectDetailsLayout />} />
          <Route path="/statistical-analysis-dashboard" element={<StatisticalAnalysisDashboard />} />
          <Route path="/project-setup" element={<ProjectSetup />} />  
          <Route path="/project-overview" element={<ProjectSetupOverview />} /> 
          <Route path="/pico-flow" element={<SinglePagePicoFlow />} />  
          <Route path="/paperpool-overview" element={<PaperPoolOverview />} />  
          <Route path="/selection-criteria-results" element={<SelectionCriteriaResults />} />  
          <Route path="/codebook-extraction" element={<CodebookExtraction />} />  
          <Route path="/batch-extraction" element={<BatchExtraction />} />  
          <Route path="/processing-results" element={<ProcessingResults />} />  
          <Route path="/statistical-analysis" element={<StatisticalAnalysis />} />  
          <Route path="/project-summary" element={<ProjectSummary />} />  
        </Routes>
      </div>
    </Router>
  );
};

export default App;
