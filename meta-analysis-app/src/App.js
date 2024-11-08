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


// import AuthComponent from './components/AuthComponent';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<AuthComponent />} /> */}
          <Route path="/" element={<DashboardLayout />} />
          <Route path="/create-project" element={<SimpleDomainFlow />} />
          <Route path="/codebook-setup" element={<CodebookSetup />} />
          <Route path="/education-analysis-setup" element={<EducationAnalysisSetup />} />
          <Route path="/paper-list-review" element={<PaperListReview />} />
          <Route path="/analysis-setting" element={<MetaAnalysisSettings />} />
          {/* <Route path="/paper-screening" element={<PaperScreening />} /> */}

        </Routes>
      </div>
    </Router>
  );
};

export default App;
