import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Button, Switch, Slider, Typography, Box } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Calculator, Award, Sliders, Save, ArrowRight, Info } from 'lucide-react';
import { FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const tooltips = {
  riskOfBiasMethod: "Choose the most appropriate risk of bias assessment tool based on your study designs.",
  qualityWeighting: "Apply weights to studies based on their quality assessment scores.",
  gradeAssessment: "Implement GRADE methodology to assess the certainty of evidence.",
  effectSize: "Select the effect size measure that best matches your outcome data type.",
  model: "Random effects models account for between-study heterogeneity.",
  confidenceLevel: "The confidence level determines the width of the confidence interval.",
  heterogeneityMethod: "I² statistic quantifies the proportion of variation due to heterogeneity.",
  publicationBiasMethod: "Methods to assess potential publication bias.",
  metaRegressionEnabled: "Explore relationships between study characteristics and effect sizes.",
  networkMetaAnalysis: "Compare multiple interventions using direct and indirect evidence.",
  sensitivityAnalysis: "Assess the robustness of findings.",
  bayesianAnalysis: "Incorporate prior knowledge and obtain probability distributions."
};

const MetaAnalysisSettings = () => {
  const [settings, setSettings] = useState({
    riskOfBiasMethod: 'rob2',
    qualityWeighting: false,
    gradeAssessment: false,
    effectSize: 'mean_difference',
    model: 'random',
    confidenceLevel: 95,
    heterogeneityMethod: 'i2',
    publicationBiasMethod: 'funnel',
    metaRegressionEnabled: false,
    networkMetaAnalysis: false,
    sensitivityAnalysis: false,
    bayesianAnalysis: false
  });

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const SectionHeader = ({ icon: Icon, title, description }) => (
    <div className="flex flex-col gap-2 mb-6 pb-2 border-b">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      {description && (
        <p className="text-sm text-gray-600 ml-7">{description}</p>
      )}
    </div>
  );

  const SettingRow = ({ name, label, description, children, className = "" }) => (
    <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <FormControlLabel
        label={label}
        className="text-sm font-medium"
        control={children} 
      />
          <Tooltip title={tooltips[name]} arrow>
              <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </Tooltip>
      </div>
      {description && <p className="text-xs text-gray-500 mb-2">{description}</p>}
      {children}
    </div>
  );

  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border-t-4 border-t-blue-500 shadow-lg">
      <CardHeader>
        <Box display="flex" alignItems="center" gap={2}>
            <Calculator size={24} color="#3f51b5" />
            <Typography variant="h5" component="div">
            Meta-Analysis Settings
            </Typography>
        </Box>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Study Selection & Quality Section */}
          <section className="bg-white rounded-xl p-6 shadow-sm border">
            <SectionHeader 
              icon={Award} 
              title="Study Selection & Quality Assessment" 
              description="Configure study quality assessment and inclusion criteria"
            />
            <div className="space-y-4">
            <FormControl fullWidth>
                <InputLabel id="risk-of-bias-select-label">Risk of Bias Assessment Method</InputLabel>
                <Select
                    labelId="risk-of-bias-select-label"
                    value={settings.riskOfBiasMethod}
                    onChange={(event) => handleSettingChange('riskOfBiasMethod', event.target.value)}
                    label="Risk of Bias Assessment Method"
                >
                    <MenuItem value="rob2">Cochrane RoB 2.0</MenuItem>
                    <MenuItem value="robins">ROBINS-I</MenuItem>
                    <MenuItem value="newcastle">Newcastle-Ottawa</MenuItem>
                    <MenuItem value="jadad">Jadad Scale</MenuItem>
                </Select>
            </FormControl>

              <SettingRow
                name="qualityWeighting"
                label="Study Quality Weighting"
                description="Weight studies based on quality assessment scores"
                className="flex items-center justify-between"
              >
                <Switch
                  checked={settings.qualityWeighting}
                  onCheckedChange={(value) => handleSettingChange('qualityWeighting', value)}
                />
              </SettingRow>

              <SettingRow
                name="gradeAssessment"
                label="GRADE Assessment"
                description="Apply GRADE methodology for evidence certainty"
                className="flex items-center justify-between"
              >
                <Switch
                  checked={settings.gradeAssessment}
                  onCheckedChange={(value) => handleSettingChange('gradeAssessment', value)}
                />
              </SettingRow>
            </div>
          </section>

          {/* Basic Statistical Settings Section */}
          <section className="bg-white rounded-xl p-6 shadow-sm border">
            <SectionHeader 
              icon={Calculator} 
              title="Basic Statistical Settings" 
              description="Configure primary statistical analysis parameters"
            />
            <div className="space-y-4">
              <FormControl fullWidth>
                <InputLabel id="effect-size-measure">Effect Size Measure</InputLabel>
                <Select 
                  labelId="effect-size-measure"
                  value={settings.effectSize}
                  onChange={(event) => handleSettingChange('effectSize', event.target.value)}
                  label="Effect Size Measure"
                >
                    <MenuItem value="mean_difference">Mean Difference</MenuItem>
                    <MenuItem value="std_mean_difference">Standardized Mean Difference</MenuItem>
                    <MenuItem value="odds_ratio">Odds Ratio</MenuItem>
                    <MenuItem value="risk_ratio">Risk Ratio</MenuItem>
                    <MenuItem value="correlation">Correlation</MenuItem>
                    <MenuItem value="hedges_g">Hedges' g</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
              <InputLabel id="select-model-type">Select model type</InputLabel>
                <Select 
                  labelId='select-model-type'
                  value={settings.model}
                  onValueChange={(event) => handleSettingChange('model', event.target.value)}
                  label="Select model type"
                >
                    <MenuItem value="random">Random Effects</MenuItem>
                    <MenuItem value="fixed">Fixed Effects</MenuItem>
                    <MenuItem value="mixed">Mixed Effects</MenuItem>
                </Select>
              </FormControl>

              <SettingRow
                name="confidenceLevel"
                label="Confidence Level (%)"
                description="Set the confidence level for interval estimation"
              >
                <div className="flex items-center space-x-4">
                  <Slider
                    value={[settings.confidenceLevel]}
                    onValueChange={([value]) => handleSettingChange('confidenceLevel', value)}
                    min={80}
                    max={99}
                    step={1}
                    className="w-full"
                  />
                  <span className="w-12 text-right font-medium">{settings.confidenceLevel}%</span>
                </div>
              </SettingRow>
            </div>
          </section>

          {/* Advanced Statistical Section */}
          <section className="bg-white rounded-xl p-6 shadow-sm border">
            <SectionHeader 
              icon={Sliders} 
              title="Advanced Statistical Analysis" 
              description="Configure advanced statistical methods and adjustments"
            />
            <div className="space-y-4">
              <FormControl fullWidth>
              <InputLabel id="heterogeneity-assessment">Heterogeneity Assessment</InputLabel>
                <Select 
                  labelId='heterogeneity-assessment'
                  value={settings.heterogeneityMethod}
                  onValueChange={(event) => handleSettingChange('heterogeneityMethod', event.target.value)}
                  label="Select heterogeneity method"
                >
                    <MenuItem value="i2">I² Statistic</MenuItem>
                    <MenuItem value="q">Cochran's Q</MenuItem>
                    <MenuItem value="h">H Statistic</MenuItem>
                    <MenuItem value="tau2">τ² (Tau-squared)</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
              <InputLabel id="publication-bias-analysis">Publication Bias Analysis</InputLabel>
                <Select 
                  labelId='publication-bias-analysis'
                  value={settings.publicationBiasMethod}
                  onValueChange={(event) => handleSettingChange('publicationBiasMethod', event.target.value)}
                  label="Publication Bias Analysis"
                >
                    <MenuItem value="funnel">Funnel Plot</MenuItem>
                    <MenuItem value="egger">Egger's Test</MenuItem>
                    <MenuItem value="begg">Begg's Test</MenuItem>
                    <MenuItem value="trim">Trim and Fill</MenuItem>
                    <MenuItem value="comprehensive">Comprehensive Analysis</MenuItem>
                </Select>
              </FormControl>

              <SettingRow
                name="metaRegressionEnabled"
                label="Meta-Regression"
                description="Enable meta-regression analysis"
                className="flex items-center justify-between"
              >
                <Switch
                  checked={settings.metaRegressionEnabled}
                  onCheckedChange={(value) => handleSettingChange('metaRegressionEnabled', value)}
                />
              </SettingRow>

              <SettingRow
                name="networkMetaAnalysis"
                label="Network Meta-Analysis"
                description="Enable network meta-analysis"
                className="flex items-center justify-between"
              >
                <Switch
                  checked={settings.networkMetaAnalysis}
                  onCheckedChange={(value) => handleSettingChange('networkMetaAnalysis', value)}
                />
              </SettingRow>

              <SettingRow
                name="sensitivityAnalysis"
                label="Sensitivity Analysis"
                description="Enable sensitivity analysis"
                className="flex items-center justify-between"
              >
                <Switch
                  checked={settings.sensitivityAnalysis}
                  onCheckedChange={(value) => handleSettingChange('sensitivityAnalysis', value)}
                />
              </SettingRow>

              <SettingRow
                name="bayesianAnalysis"
                label="Bayesian Analysis"
                description="Enable Bayesian meta-analysis"
                className="flex items-center justify-between"
              >
                <Switch
                  checked={settings.bayesianAnalysis}
                  onCheckedChange={(value) => handleSettingChange('bayesianAnalysis', value)}
                />
              </SettingRow>
            </div>
          </section>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              variant="outline"
              onClick={() => console.log('Settings:', settings)}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </Button>
            <Button
              onClick={() => navigate('/paper-list-review')}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetaAnalysisSettings;
