import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SimpleDomainFlow from './components/SimpleDomainFlow';
import CodebookSetup from './components/CodebookSetup';
import StudyAnalysisDashboard from './components/StudyAnalysisDashboard';
import PaperListReview from './components/PaperListReview';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SimpleDomainFlow />} />
          <Route path="/codebook-setup" element={<CodebookSetup />} />
          <Route path="/paper-list-review" element={<PaperListReview />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
