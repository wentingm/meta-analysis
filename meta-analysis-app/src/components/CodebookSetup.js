import React, { useState } from 'react';
import './CodebookSetup.css'; // Import the CSS file

function CodebookSetup({ selectedCount = 0, onBack }) {
  const [expandedSection, setExpandedSection] = useState(null);

  const codebookElements = {
    studyCharacteristics: {
      title: "Study Characteristics",
      icon: "📚",
      fields: [
        { id: 'year', name: 'Publication Year', type: 'number', required: true },
        { id: 'authors', name: 'Authors', type: 'text', required: true },
        { id: 'country', name: 'Country of Study', type: 'text', required: false },
        { id: 'setting', name: 'Study Setting', type: 'select', required: true,
          options: ['School', 'University', 'Online', 'Mixed'] },
        { id: 'design', name: 'Study Design', type: 'select', required: true,
          options: ['RCT', 'Quasi-experimental', 'Pre-post', 'Observational'] }
      ]
    },
    population: {
      title: "Population Details",
      icon: "👥",
      fields: [
        { id: 'sampleSize', name: 'Total Sample Size', type: 'number', required: true },
        { id: 'ageRange', name: 'Age Range', type: 'text', required: true },
        { id: 'gradeLevel', name: 'Grade/Education Level', type: 'select', required: true,
          options: ['Elementary', 'Middle School', 'High School', 'University'] },
        { id: 'demographics', name: 'Demographics', type: 'text', required: false }
      ]
    },
    interventionDetails: {
      title: "Intervention Details",
      icon: "🎯",
      fields: [
        { id: 'duration', name: 'Duration', type: 'text', required: true },
        { id: 'frequency', name: 'Frequency', type: 'text', required: true },
        { id: 'format', name: 'Delivery Format', type: 'select', required: true,
          options: ['Individual', 'Group', 'Online', 'Blended'] },
        { id: 'provider', name: 'Intervention Provider', type: 'text', required: false }
      ]
    },
    outcomes: {
      title: "Outcome Measures & Results",
      icon: "📊",
      fields: [
        { id: 'primaryOutcome', name: 'Primary Outcome', type: 'text', required: true },
        { id: 'measurementTool', name: 'Measurement Tool', type: 'text', required: true },
        { id: 'timePoints', name: 'Measurement Time Points', type: 'text', required: true }
      ],
      testResults: {
        title: "Test Results",
        experimentalGroup: [
          { id: 'expPreMean', name: 'Pre-test Mean', type: 'number', required: true },
          { id: 'expPreSD', name: 'Pre-test SD', type: 'number', required: true },
          { id: 'expPostMean', name: 'Post-test Mean', type: 'number', required: true },
          { id: 'expPostSD', name: 'Post-test SD', type: 'number', required: true },
          { id: 'expN', name: 'Number of Participants', type: 'number', required: true }
        ],
        controlGroup: [
          { id: 'ctrlPreMean', name: 'Pre-test Mean', type: 'number', required: true },
          { id: 'ctrlPreSD', name: 'Pre-test SD', type: 'number', required: true },
          { id: 'ctrlPostMean', name: 'Post-test Mean', type: 'number', required: true },
          { id: 'ctrlPostSD', name: 'Post-test SD', type: 'number', required: true },
          { id: 'ctrlN', name: 'Number of Participants', type: 'number', required: true }
        ],
        statistics: [
          { id: 'testType', name: 'Statistical Test', type: 'select', required: true,
            options: ['t-test', 'F-test', 'ANOVA', 'ANCOVA'] },
          { id: 'testValue', name: 'Test Value', type: 'number', required: true },
          { id: 'pValue', name: 'p-value', type: 'number', required: true },
          { id: 'effectSize', name: 'Effect Size', type: 'number', required: true },
          { id: 'confidenceInterval', name: 'Confidence Interval', type: 'text', required: true }
        ]
      }
    }
  };

  const CategoryCard = ({ category, data }) => (
    <div className="category-card">
      <div 
        className="category-header"
        onClick={() => setExpandedSection(expandedSection === category ? null : category)}
      >
        <div className="category-title">
          <span className="text-2xl">{data.icon}</span>
          <h2 className="text-lg font-semibold">{data.title}</h2>
        </div>
        <span className={`transform transition-transform ${expandedSection === category ? 'rotate-180' : ''}`}>▼</span>
      </div>

      {expandedSection === category && (
        <div className="expanded-section">
          {category === 'outcomes' ? (
            <div className="space-y-6">
              {/* Regular Outcome Fields */}
              <div className="space-y-4">
                {data.fields.map((field) => (
                  <div key={field.id} className="field-group">
                    <label>{field.name}</label>
                    <input 
                      type={field.type}
                      placeholder={field.name}
                    />
                  </div>
                ))}
              </div>

              {/* Test Results Section */}
              <div className="field-group">
                <h3 className="text-lg font-semibold mb-4">{data.testResults.title}</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Experimental Group */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-blue-600">Experimental Group</h4>
                    {data.testResults.experimentalGroup.map((field) => (
                      <div key={field.id} className="field-group">
                        <label>{field.name}</label>
                        <input 
                          type={field.type}
                          placeholder={field.name}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Control Group */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-blue-600">Control Group</h4>
                    {data.testResults.controlGroup.map((field) => (
                      <div key={field.id} className="field-group">
                        <label>{field.name}</label>
                        <input 
                          type={field.type}
                          placeholder={field.name}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Statistical Results */}
                <div className="mt-6">
                  <h4 className="font-medium text-blue-600 mb-4">Statistical Results</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {data.testResults.statistics.map((field) => (
                      <div key={field.id} className="field-group">
                        <label>{field.name}</label>
                        {field.type === 'select' ? (
                          <select>
                            {field.options.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          <input 
                            type={field.type}
                            placeholder={field.name}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {data.fields.map((field) => (
                <div key={field.id} className="field-group">
                  <label>{field.name}</label>
                  {field.type === 'select' ? (
                    <select>
                      {field.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input 
                      type={field.type}
                      placeholder={field.name}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <span className="mr-2">←</span>
          Back to Paper Selection
        </button>
        <h1>Codebook Setup</h1>
        <p>Configure data extraction elements for {selectedCount} selected papers</p>
      </div>

      {/* Categories */}
      <div>
        {Object.entries(codebookElements).map(([category, data]) => (
          <CategoryCard key={category} category={category} data={data} />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="button-container">
        <button className="button save-draft">
          Save Draft
        </button>
        <button className="button start-extraction">
          Start Data Extraction
        </button>
      </div>
    </div>
  );
}

export default CodebookSetup;
