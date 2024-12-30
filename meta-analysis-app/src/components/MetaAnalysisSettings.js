import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import Button from "./ui/Button";
import Label from "./ui/Label";
import Select from "./ui/Select";
import Switch from "./ui/Switch";
import Slider from "./ui/Slider";
import { 
  Info, 
  Save, 
  ArrowRight, 
  Calculator, 
  Award,
  Sliders,
  LineChart,
  Globe,
  GraduationCap,
  Heart,
  Users,
  Beaker
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const { SelectTrigger, SelectValue, SelectContent, SelectItem } = Select || {
    SelectTrigger: () => null,
    SelectValue: () => null,
    SelectContent: () => null,
    SelectItem: () => null,
  };
  

// Domain configurations
const domains = [
  { id: 'medical', icon: Heart, label: 'Medical Research' },
  { id: 'education', icon: GraduationCap, label: 'Education Research', active: true },
  { id: 'social', icon: Users, label: 'Social Sciences' },
  { id: 'environmental', icon: Globe, label: 'Environmental Science' },
  { id: 'psychology', icon: Beaker, label: 'Psychology' }
] || [];

// Header component
function SectionHeader({ icon: Icon, title, description }) {
  return (
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
}

function MetaAnalysisSettings() {
  // State management
  const [settings, setSettings] = useState({
    effectSize: 'cohens_d',
    model: 'random',
    studyType: 'rct',
    confidenceLevel: 95,
    heterogeneityMethod: 'i2',
    publicationBiasMethod: 'funnel',
    metaRegressionEnabled: false,
    sensitivityAnalysis: false,
    plotType: 'forest',
    outcomePlot: 'performance',
    interactivePlots: false,
    subgroupVisualization: false
  });

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border-t-4 border-t-blue-500 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <GraduationCap className="w-6 h-6 text-blue-500" />
            Educational Meta-Analysis Settings
          </CardTitle>
          
          {/* Domain Switcher */}
          <div className="mt-4 flex items-center gap-4 pb-2 border-b">
          {Array.isArray(domains) && domains.map(domain => (
              <button
                key={domain.id}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all
                  ${domain.active 
                    ? 'text-blue-600 bg-blue-50 border-blue-200' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              >
                {domain.icon && <domain.icon className="w-6 h-6" />}
                <span className="text-xs font-medium">{domain.label}</span>
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Statistical Analysis Section */}
          <section className="bg-white rounded-xl p-6 shadow-sm border">
            <SectionHeader 
              icon={Calculator}
              title="Statistical Analysis" 
              description="Configure statistical parameters for your meta-analysis"
            />
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Effect Size Measure</Label>
                  <Select
                    value={settings.effectSize}
                    onValueChange={(value) => handleSettingChange('effectSize', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select effect size measure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cohens_d">Cohen's d</SelectItem>
                      <SelectItem value="hedges_g">Hedges' g</SelectItem>
                      <SelectItem value="glass_delta">Glass's Δ</SelectItem>
                      <SelectItem value="correlation">Correlation Coefficient</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium">Model Type</Label>
                  <Select 
                    value={settings.model}
                    onValueChange={(value) => handleSettingChange('model', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select model type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="random">Random Effects</SelectItem>
                      <SelectItem value="fixed">Fixed Effects</SelectItem>
                      <SelectItem value="mixed">Mixed Effects</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium">Confidence Level ({settings.confidenceLevel}%)</Label>
                <Slider
                  value={[settings.confidenceLevel]}
                  onValueChange={([value]) => handleSettingChange('confidenceLevel', value)}
                  min={80}
                  max={99}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </section>

          {/* Advanced Statistical Analysis */}
          <section className="bg-white rounded-xl p-6 shadow-sm border">
            <SectionHeader 
              icon={Sliders}
              title="Advanced Statistical Analysis" 
              description="Configure advanced statistical methods and adjustments"
            />
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Heterogeneity Assessment</Label>
                  <Select 
                    value={settings.heterogeneityMethod}
                    onValueChange={(value) => handleSettingChange('heterogeneityMethod', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select heterogeneity method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="i2">I² Statistic</SelectItem>
                      <SelectItem value="q">Cochran's Q</SelectItem>
                      <SelectItem value="h">H Statistic</SelectItem>
                      <SelectItem value="tau2">τ² (Tau-squared)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium">Publication Bias Analysis</Label>
                  <Select 
                    value={settings.publicationBiasMethod}
                    onValueChange={(value) => handleSettingChange('publicationBiasMethod', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="funnel">Funnel Plot</SelectItem>
                      <SelectItem value="egger">Egger's Test</SelectItem>
                      <SelectItem value="begg">Begg's Test</SelectItem>
                      <SelectItem value="trim">Trim and Fill</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <span className="text-sm font-medium">Meta-Regression</span>
                    <p className="text-xs text-gray-500">Enable meta-regression analysis</p>
                  </div>
                  <Switch
                    checked={settings.metaRegressionEnabled}
                    onCheckedChange={(value) => handleSettingChange('metaRegressionEnabled', value)}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <span className="text-sm font-medium">Sensitivity Analysis</span>
                    <p className="text-xs text-gray-500">Enable sensitivity testing</p>
                  </div>
                  <Switch
                    checked={settings.sensitivityAnalysis}
                    onCheckedChange={(value) => handleSettingChange('sensitivityAnalysis', value)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Visualization Settings */}
          <section className="bg-white rounded-xl p-6 shadow-sm border">
            <SectionHeader 
              icon={LineChart}
              title="Visualization Settings" 
              description="Configure visualization options for your analysis"
            />
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Primary Plot Type</Label>
                  <Select 
                    value={settings.plotType}
                    onValueChange={(value) => handleSettingChange('plotType', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select plot type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="forest">Forest Plot</SelectItem>
                      <SelectItem value="funnel">Funnel Plot</SelectItem>
                      <SelectItem value="bubble">Bubble Plot</SelectItem>
                      <SelectItem value="l_abbe">L'Abbé Plot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium">Educational Outcome Display</Label>
                  <Select 
                    value={settings.outcomePlot}
                    onValueChange={(value) => handleSettingChange('outcomePlot', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select outcome visualization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="performance">Performance Distribution</SelectItem>
                      <SelectItem value="comparison">Group Comparison</SelectItem>
                      <SelectItem value="timeline">Learning Timeline</SelectItem>
                      <SelectItem value="domain">Domain Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <span className="text-sm font-medium">Interactive Plots</span>
                    <p className="text-xs text-gray-500">Enable interactive features</p>
                  </div>
                  <Switch
                    checked={settings.interactivePlots}
                    onCheckedChange={(value) => handleSettingChange('interactivePlots', value)}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <span className="text-sm font-medium">Subgroup Visualization</span>
                    <p className="text-xs text-gray-500">Enable subgroup analysis plots</p>
                  </div>
                  <Switch
                    checked={settings.subgroupVisualization}
                    onCheckedChange={(value) => handleSettingChange('subgroupVisualization', value)}
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              variant="ghost"
              onClick={() => console.log('Settings skipped')}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
            >
              Skip
            </Button>
            <Button
              variant="outline"
              onClick={() => console.log('Settings:', settings)}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </Button>
            <Button
              onClick={() => navigate('/project-overview')}
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
}

export default MetaAnalysisSettings;
