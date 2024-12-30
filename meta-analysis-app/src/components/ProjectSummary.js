import React from 'react';
import { ArrowLeft, Download, Search, Filter, Book, Users, BarChart, Brain } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { useNavigate } from 'react-router-dom';

const ProjectSummary = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <button className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Analysis
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Project Summary</h1>
            <h2 className="text-xl text-gray-600 font-semibold mb-1">AI-Enhanced Learning Analytics</h2>
            <p className="text-gray-500">
              Systematic review of AI integration in educational assessment and analytics
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export Summary
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Studies Analyzed</CardTitle>
            <Book className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-gray-500">From 2018-2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Participants</CardTitle>
            <Users className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,248</div>
            <p className="text-xs text-gray-500">Across all studies</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Effect Size</CardTitle>
            <BarChart className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.82</div>
            <p className="text-xs text-gray-500">Mean Cohen's d</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">AI Methods</CardTitle>
            <Brain className="w-4 h-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500">Different approaches</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Research Questions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Research Questions</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <p className="text-gray-700">What is the overall effectiveness of AI-enhanced learning analytics in improving student performance?</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold">2</span>
              </div>
              <p className="text-gray-700">How do different AI methodologies compare in their impact on educational outcomes?</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold">3</span>
              </div>
              <p className="text-gray-700">What are the key implementation factors that influence the success of AI integration in education?</p>
            </div>
          </div>
        </div>

        {/* Methodology Overview */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Methodology</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Search Strategy</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Systematic search across 6 major databases</li>
                <li>• Publication period: 2018-2023</li>
                <li>• Peer-reviewed articles only</li>
                <li>• English language publications</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Analysis Approach</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Random-effects meta-analysis</li>
                <li>• Subgroup analysis by AI methodology</li>
                <li>• Meta-regression for moderators</li>
                <li>• Publication bias assessment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Study Characteristics Overview */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Study Characteristics Overview</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Geographic Distribution</h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>North America</span>
                    <span className="font-medium">8 studies (35%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Europe</span>
                    <span className="font-medium">6 studies (26%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Asia Pacific</span>
                    <span className="font-medium">5 studies (22%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Other Regions</span>
                    <span className="font-medium">4 studies (17%)</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Educational Levels</h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Higher Education</span>
                    <span className="font-medium">10 studies (43%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Secondary Education</span>
                    <span className="font-medium">7 studies (30%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Primary Education</span>
                    <span className="font-medium">4 studies (17%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Adult Learning</span>
                    <span className="font-medium">2 studies (9%)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Study Duration</h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Less than 6 months</span>
                    <span className="font-medium">5 studies (22%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>6-12 months</span>
                    <span className="font-medium">9 studies (39%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1-2 years</span>
                    <span className="font-medium">6 studies (26%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Over 2 years</span>
                    <span className="font-medium">3 studies (13%)</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Subject Areas</h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>STEM Subjects</span>
                    <span className="font-medium">11 studies (48%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Language Learning</span>
                    <span className="font-medium">5 studies (22%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Social Sciences</span>
                    <span className="font-medium">4 studies (17%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mixed Subjects</span>
                    <span className="font-medium">3 studies (13%)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Technology Implementation</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Machine Learning</span>
                    <span className="font-medium">8 studies (35%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Natural Language Processing</span>
                    <span className="font-medium">6 studies (26%)</span>
                  </div>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Computer Vision</span>
                    <span className="font-medium">4 studies (17%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hybrid Approaches</span>
                    <span className="font-medium">5 studies (22%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Assessment */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Quality Assessment</h3>
          <div className="space-y-6">
            {/* Risk of Bias Assessment */}
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Risk of Bias Assessment</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Selection Bias</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((_, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded ${
                          i < 3 ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Performance Bias</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((_, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded ${
                          i < 4 ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Detection Bias</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((_, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded ${
                          i < 3 ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Attrition Bias</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((_, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded ${
                          i < 2 ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Study Design Quality */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Study Design Quality Ratings</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>High Quality (Score 8-10)</span>
                    <span className="font-medium">7 studies (30%)</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Moderate Quality (Score 5-7)</span>
                    <span className="font-medium">12 studies (52%)</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Low Quality (Score &lt;5)</span>
                    <span className="font-medium">4 studies (17%)</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Methodological Quality Scores</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Randomization</span>
                    <span className="font-medium">8.2/10</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Control Groups</span>
                    <span className="font-medium">7.8/10</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Outcome Measures</span>
                    <span className="font-medium">8.5/10</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Analysis Methods</span>
                    <span className="font-medium">7.9/10</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Trends */}
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Quality Assessment Summary</h4>
              <div className="text-gray-600 space-y-2">
                <p>• 82% of studies met all primary quality criteria</p>
                <p>• Strong methodological rigor in randomization and outcome measurement</p>
                <p>• Moderate concerns in long-term follow-up procedures</p>
                <p>• High reliability in data collection and analysis methods</p>
              </div>
            </div>
          </div>
        </div>

        {/* Effect Size Analysis */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Effect Size Analysis</h3>
          <div className="space-y-4">
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
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Publication Bias</div>
                <div className="text-2xl font-bold text-purple-700">p = .34</div>
                <div className="text-xs text-gray-500">Egger's test</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Power Analysis</div>
                <div className="text-2xl font-bold text-orange-700">74%</div>
                <div className="text-xs text-gray-500">≥80% power</div>
              </div>
            </div>
            <div className="space-y-3 text-gray-600">
              <p>• Machine Learning (d = 0.89, n = 8): Highest effectiveness in personalized learning paths</p>
              <p>• Natural Language Processing (d = 0.78, n = 6): Strong impact on feedback systems</p>
              <p>• Computer Vision (d = 0.73, n = 4): Moderate effects in engagement tracking</p>
              <p>• Hybrid Approaches (d = 0.85, n = 5): Strong effects in combined implementations</p>
            </div>
          </div>
        </div>

        {/* Key Findings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Key Findings</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-1 h-16 bg-green-500 rounded-full"></div>
              <div>
                <h4 className="font-semibold">Overall Effectiveness</h4>
                <p className="text-gray-600">Strong positive effect (d = 0.82, 95% CI [0.76, 0.88]) of AI integration on student performance across diverse educational contexts.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-1 h-16 bg-blue-500 rounded-full"></div>
              <div>
                <h4 className="font-semibold">Methodology Comparison</h4>
                <p className="text-gray-600">Machine learning algorithms showed highest effectiveness (d = 0.89), followed by natural language processing (d = 0.78) and computer vision applications (d = 0.73).</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-1 h-16 bg-purple-500 rounded-full"></div>
              <div>
                <h4 className="font-semibold">Implementation Factors</h4>
                <p className="text-gray-600">Teacher training, infrastructure readiness, and adaptive feedback mechanisms were identified as critical success factors.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Study Limitations */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Study Limitations</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-1 h-16 bg-red-500 rounded-full"></div>
              <div>
                <h4 className="font-semibold">Methodological Constraints</h4>
                <p className="text-gray-600">Limited long-term follow-up studies and varied outcome measures across studies affecting direct comparability.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-1 h-16 bg-yellow-500 rounded-full"></div>
              <div>
                <h4 className="font-semibold">Sample Characteristics</h4>
                <p className="text-gray-600">Geographic concentration in developed countries and underrepresentation of diverse educational contexts.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-1 h-16 bg-orange-500 rounded-full"></div>
              <div>
                <h4 className="font-semibold">Technical Considerations</h4>
                <p className="text-gray-600">Varying technical implementations and infrastructure requirements limiting generalizability of findings.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Recommendations */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Key Recommendations</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">For Practitioners</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Implement comprehensive teacher training programs</li>
                  <li>• Start with pilot programs before full deployment</li>
                  <li>• Focus on integration with existing workflows</li>
                  <li>• Regular assessment of student feedback</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">For Institutions</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Develop clear AI implementation policies</li>
                  <li>• Ensure robust technical infrastructure</li>
                  <li>• Establish data privacy frameworks</li>
                  <li>• Create support systems for teachers</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">For Researchers</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Conduct longitudinal studies</li>
                  <li>• Standardize outcome measures</li>
                  <li>• Investigate cost-effectiveness</li>
                  <li>• Expand to diverse contexts</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">For Policy Makers</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Develop AI education guidelines</li>
                  <li>• Support research funding</li>
                  <li>• Create ethical frameworks</li>
                  <li>• Promote accessibility standards</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Future Directions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Future Directions</h3>
          <div className="space-y-3 text-gray-600">
            <p>• Investigation of long-term retention and transfer effects</p>
            <p>• Comparative analysis of different educational contexts and subject areas</p>
            <p>• Cost-effectiveness studies of AI implementation in education</p>
            <p>• Development of standardized implementation frameworks</p>
            <p>• Integration with existing educational technologies and practices</p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-sm text-gray-500 mt-8">
          <p>This summary is based on a systematic review conducted between January 2023 and December 2023. 
             For detailed methodology and complete findings, please refer to the full analysis report.</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;