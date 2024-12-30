import React, { useState } from 'react';
import { Trash2, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EditableField = ({ field }) => (
  <div className="space-y-1 relative bg-white rounded-lg p-3 border">
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg text-gray-900">{field.name}</h3>
          <div className="text-sm text-gray-500 mt-1">
            Type: {field.type}
            {field.required && <span className="text-red-500 ml-2">Required</span>}
          </div>
          {field.type === 'select' && field.options && (
            <div className="text-sm text-gray-500 mt-1">
              Options: {field.options.join(', ')}
            </div>
          )}
          {field.placeholder && (
            <div className="text-sm text-gray-500 mt-1">
              Example: {field.placeholder}
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <button className="text-red-500 hover:text-red-700">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const TestResultsSection = ({ section }) => (
  <div className="bg-white rounded-lg p-4 mb-4 border">
    <div className="flex justify-between items-center mb-3">
      <h3 className="font-medium text-lg">{section.title}</h3>
      <button className="text-blue-500 hover:text-blue-700 flex items-center">
        <Plus size={16} className="mr-1" />
        Add Field
      </button>
    </div>
    <div className="grid grid-cols-2 gap-4">
      {section.fields.map(field => (
        <EditableField key={field.id} field={field} />
      ))}
    </div>
  </div>
);

const CodebookSetup = () => {
  const [addingToSection, setAddingToSection] = useState(null);
  const [codebookElements] = useState({
    standardVariables: {
      title: "Standard Variables",
      description: "Configure standard variables and parameters that will be used across all studies",
      publicationDetails: {
        title: "Publication Details",
        fields: [
          {
            id: 'authors',
            name: 'Authors',
            type: 'text',
            required: true,
            placeholder: 'e.g., Smith, J., Jones, M.'
          },
          {
            id: 'year',
            name: 'Year of Publication',
            type: 'number',
            required: true,
            placeholder: '2024'
          },
          {
            id: 'paperType',
            name: 'Type of Paper',
            type: 'select',
            required: true,
            options: ['Journal Article', 'Conference Paper', 'Book Chapter', 'Technical Report', 'Dissertation']
          },
          {
            id: 'country',
            name: 'Country of Study',
            type: 'text',
            required: true,
            placeholder: 'e.g., United States'
          }
        ]
      },
      basicInformation: {
        title: "Basic Information",
        fields: [
          {
            id: 'primaryOutcome',
            name: 'Primary Outcome Measure',
            type: 'text',
            required: true,
            placeholder: 'e.g., Mathematics Achievement Score'
          },
          {
            id: 'measurementTool',
            name: 'Measurement Tool/Scale',
            type: 'text',
            required: true,
            placeholder: 'e.g., Standardized Math Test'
          },
          {
            id: 'timePoints',
            name: 'Measurement Time Points',
            type: 'select',
            required: true,
            options: ['Pre-Post', 'Pre-Post-Follow up', 'Multiple time points']
          },
          {
            id: 'studyDuration',
            name: 'Duration of Study',
            type: 'select',
            required: true,
            options: ['Less than 1 month', '1-3 months', '3-6 months', '6-12 months', 'More than 12 months']
          },
          {
            id: 'experimentSetting',
            name: 'Experiment Setting',
            type: 'select',
            required: true,
            options: ['Laboratory', 'Classroom', 'Field Study', 'Remote/Online', 'Mixed Setting']
          },
          {
            id: 'experimentalDesign',
            name: 'Experimental Design',
            type: 'select',
            required: true,
            options: [
              'Randomized Controlled Trial',
              'Quasi-experimental',
              'Pre-experimental',
              'Single Subject Design',
              'Cross-over Design'
            ]
          },
          {
            id: 'interventionFrequency',
            name: 'Intervention Frequency',
            type: 'select',
            required: true,
            options: ['Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'Variable']
          },
          {
            id: 'sessionDuration',
            name: 'Session Duration',
            type: 'text',
            required: true,
            placeholder: 'e.g., 45 minutes'
          }
        ]
      },
      domainSpecific: {
        title: "Domain Specific Variables",
        fields: [
          {
            id: 'subjectArea',
            name: 'Subject Area',
            type: 'select',
            required: true,
            options: ['Mathematics', 'Science', 'Language', 'Social Studies', 'Arts', 'Physical Education']
          },
          {
            id: 'educationLevel',
            name: 'Education Level',
            type: 'select',
            required: true,
            options: ['Primary', 'Secondary', 'Higher Education', 'Adult Education']
          },
          {
            id: 'interventionType',
            name: 'Intervention Type',
            type: 'select',
            required: true,
            options: ['Technology-based', 'Traditional', 'Blended', 'Game-based', 'Project-based']
          },
          {
            id: 'instructionalSetting',
            name: 'Instructional Setting',
            type: 'select',
            required: true,
            options: ['Classroom', 'Laboratory', 'Online', 'Field-based', 'Hybrid']
          }
        ]
      },
      testResults: {
        title: "Statistical Results",
        sections: [
          {
            title: "Intervention Group",
            color: "blue",
            fields: [
              {
                id: 'int_n',
                name: 'Number of Participants (n)',
                type: 'number',
                required: true,
                placeholder: '0'
              },
              {
                id: 'int_pre_mean',
                name: 'Pre-test Mean',
                type: 'number',
                required: true,
                placeholder: '0.00'
              },
              {
                id: 'int_pre_sd',
                name: 'Pre-test SD',
                type: 'number',
                required: true,
                placeholder: '0.00'
              },
              {
                id: 'int_post_mean',
                name: 'Post-test Mean',
                type: 'number',
                required: true,
                placeholder: '0.00'
              },
              {
                id: 'int_post_sd',
                name: 'Post-test SD',
                type: 'number',
                required: true,
                placeholder: '0.00'
              }
            ]
          },
          {
            title: "Control Group",
            color: "gray",
            fields: [
              {
                id: 'ctrl_n',
                name: 'Number of Participants (n)',
                type: 'number',
                required: true,
                placeholder: '0'
              },
              {
                id: 'ctrl_pre_mean',
                name: 'Pre-test Mean',
                type: 'number',
                required: true,
                placeholder: '0.00'
              },
              {
                id: 'ctrl_pre_sd',
                name: 'Pre-test SD',
                type: 'number',
                required: true,
                placeholder: '0.00'
              },
              {
                id: 'ctrl_post_mean',
                name: 'Post-test Mean',
                type: 'number',
                required: true,
                placeholder: '0.00'
              },
              {
                id: 'ctrl_post_sd',
                name: 'Post-test SD',
                type: 'number',
                required: true,
                placeholder: '0.00'
              }
            ]
          },
          {
            title: "Statistical Tests",
            color: "green",
            fields: [
              {
                id: 'test_type',
                name: 'Statistical Test',
                type: 'select',
                required: true,
                options: ['t-test', 'F-test', 'ANOVA', 'ANCOVA']
              },
              {
                id: 'test_value',
                name: 'Test Value',
                type: 'number',
                required: true,
                placeholder: '0.00'
              },
              {
                id: 'df',
                name: 'Degrees of Freedom',
                type: 'number',
                required: true,
                placeholder: '0'
              },
              {
                id: 'p_value',
                name: 'p-value',
                type: 'number',
                required: true,
                placeholder: '0.00'
              },
              {
                id: 'effect_size',
                name: 'Effect Size',
                type: 'number',
                required: true,
                placeholder: '0.00'
              }
            ]
          }
        ]
      }
    }
  });
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <span className="mr-2">←</span>
          Back to Selection Criteria
        </button>
        <h1 className="text-2xl font-bold mb-2">Statistical Results Codebook Setup</h1>
        <p className="text-gray-600">Configure the variables and parameters that will be used in your codebook</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">{codebookElements.standardVariables.title}</h2>
            <p className="text-gray-600 mb-6">{codebookElements.standardVariables.description}</p>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {codebookElements.standardVariables.publicationDetails.title}
                </h3>
                <button 
                  onClick={() => setAddingToSection("Publication Details")}
                  className="text-blue-500 hover:text-blue-700 flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Add Field
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {codebookElements.standardVariables.publicationDetails.fields.map(field => (
                  <EditableField key={field.id} field={field} />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {codebookElements.standardVariables.basicInformation.title}
                </h3>
                <button 
                  onClick={() => setAddingToSection("Basic Information")}
                  className="text-blue-500 hover:text-blue-700 flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Add Field
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {codebookElements.standardVariables.basicInformation.fields.map(field => (
                  <EditableField key={field.id} field={field} />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {codebookElements.standardVariables.domainSpecific.title}
                </h3>
                <button 
                  onClick={() => setAddingToSection("Domain Specific")}
                  className="text-blue-500 hover:text-blue-700 flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Add Field
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {codebookElements.standardVariables.domainSpecific.fields.map(field => (
                  <EditableField key={field.id} field={field} />
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{codebookElements.standardVariables.testResults.title}</h3>
              </div>
              {codebookElements.standardVariables.testResults.sections.map(section => (
                <TestResultsSection key={section.title} section={section} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
          Save Draft
        </button>
        <button onClick={() => { navigate('/analysis-setting'); }} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
          Continue
        </button>
      </div>

      {addingToSection && (
        <AddFieldForm
          onAdd={handleAddField}
          onCancel={() => setAddingToSection(null)}
        />
      )}
    </div>
  );
};

export default CodebookSetup;
