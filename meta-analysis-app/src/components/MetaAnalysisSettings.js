
import React, { useState } from 'react';
import { 
    Card,
    CardHeader,
    CardContent,
    Typography,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    Slider,
    LinearProgress 
} from '@mui/material';

import { 
    Save as SaveIcon, 
    ArrowForward as ArrowForwardIcon, 
    Settings as SettingsIcon, 
    Tune as TuneIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const MetaAnalysisSettings = () => {
    const [settings, setSettings] = useState({
        effectSize: 'mean_difference',
        model: 'random',
        confidenceLevel: 95,
        removeOutliers: false,
        outlierThreshold: 2,
        imputeMissingData: false,
        sensitivityAnalysis: false,
        isRunning: false,
        progress: 0
    });

    const handleSettingChange = (setting, value) => {
        setSettings(prev => ({
            ...prev,
            [setting]: value
        }));
    };

    const handleSaveSettings = () => {
        console.log('Saving settings:', settings);
    };
    const navigate = useNavigate();
    const handleContinue = () => {
        setSettings(prev => ({ ...prev, isRunning: true, progress: 0 }));
        const interval = setInterval(() => {
            setSettings(prev => {
                if (prev.progress >= 100) {
                    clearInterval(interval);
                    return { ...prev, isRunning: false };
                }
                return { ...prev, progress: prev.progress + 10 };
            });
        }, 500);
        navigate('/paper-list-review'); 
    };

    const SectionHeader = ({ icon: Icon, title }) => (
        <div className="flex items-center gap-2 mb-6 pb-2 border-b">
            <Icon className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
    );

    return (
        <div className="container mx-auto p-6">
            <Card className="border-t-4 border-t-blue-500 shadow-lg">
                <CardHeader className="pb-4">
                    <Typography variant="h5" component="div" className="flex items-center gap-2 text-2xl">
                        <SettingsIcon className="w-6 h-6 text-blue-500" />
                        Analysis Settings
                        {settings.isRunning && 
                            <span className="text-sm text-blue-500 font-normal">(Analysis in Progress)</span>
                        }
                    </Typography>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Statistical Settings Section */}
                    <section className="bg-white rounded-xl p-6 shadow-sm border">
                        <Typography variant="h6" className="flex items-center gap-2">
                            <SectionHeader icon={TuneIcon} title="Statistical Settings" />
                        </Typography>
                        <div className="space-y-4">
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Effect Size Measure</InputLabel>
                                <Select
                                    value={settings.effectSize}
                                    onChange={(e) => handleSettingChange('effectSize', e.target.value)}
                                    label="Effect Size Measure"
                                >
                                    <MenuItem value="mean_difference">Mean Difference</MenuItem>
                                    <MenuItem value="std_mean_difference">Standardized Mean Difference</MenuItem>
                                    <MenuItem value="odds_ratio">Odds Ratio</MenuItem>
                                    <MenuItem value="risk_ratio">Risk Ratio</MenuItem>
                                    <MenuItem value="correlation">Correlation</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Model Type</InputLabel>
                                <Select
                                    value={settings.model}
                                    onChange={(e) => handleSettingChange('model', e.target.value)}
                                    label="Model Type"
                                >
                                    <MenuItem value="random">Random Effects</MenuItem>
                                    <MenuItem value="fixed">Fixed Effects</MenuItem>
                                    <MenuItem value="mixed">Mixed Effects</MenuItem>
                                </Select>
                            </FormControl>

                            <div>
                                <Typography className="text-sm font-medium mb-2">Confidence Level (%)</Typography>
                                <Slider
                                    value={settings.confidenceLevel}
                                    onChange={(e, value) => handleSettingChange('confidenceLevel', value)}
                                    min={80}
                                    max={99}
                                    step={1}
                                    valueLabelDisplay="auto"
                                />
                                <Typography className="w-12 text-right font-medium">{settings.confidenceLevel}%</Typography>
                            </div>
                        </div>
                    </section>

                    {/* Advanced Options Section */}
                    <section className="bg-white rounded-xl p-6 shadow-sm border">
                        <Typography variant="h6" className="flex items-center gap-2">
                            <SettingsIcon className="w-6 h-6 text-blue-500" />
                            Advanced Options
                        </Typography>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Typography>Remove Outliers</Typography>
                                <Switch
                                    checked={settings.removeOutliers}
                                    onChange={(e) => handleSettingChange('removeOutliers', e.target.checked)}
                                />
                            </div>

                            {settings.removeOutliers && (
                                <div>
                                    <Typography className="text-sm font-medium mb-2">Outlier Threshold (SD)</Typography>
                                    <Slider
                                        value={settings.outlierThreshold}
                                        onChange={(e, value) => handleSettingChange('outlierThreshold', value)}
                                        min={1}
                                        max={4}
                                        step={0.5}
                                        valueLabelDisplay="auto"
                                    />
                                    <Typography className="w-12 text-right font-medium">{settings.outlierThreshold}</Typography>
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <Typography>Impute Missing Data</Typography>
                                <Switch
                                    checked={settings.imputeMissingData}
                                    onChange={(e) => handleSettingChange('imputeMissingData', e.target.checked)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <Typography>Sensitivity Analysis</Typography>
                                <Switch
                                    checked={settings.sensitivityAnalysis}
                                    onChange={(e) => handleSettingChange('sensitivityAnalysis', e.target.checked)}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Progress and Buttons Section */}
                    {settings.isRunning && (
                        <div className="space-y-4">
                            <Typography className="text-sm font-medium">Analysis Progress</Typography>
                            <LinearProgress variant="determinate" value={settings.progress} />
                        </div>
                    )}

                    <div className="flex justify-end items-center space-x-4 pt-4">
                        <Button
                            variant="outlined"
                            onClick={() => handleSettingChange('isRunning', false)}
                            disabled={!settings.isRunning}
                        >
                            Cancel
                        </Button>
                        <Button variant="outlined" onClick={handleSaveSettings} disabled={settings.isRunning}>
                            <SaveIcon className="w-4 h-4" /> 
                            Save
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleContinue} disabled={settings.isRunning}>
                            Continue
                            <ArrowForwardIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MetaAnalysisSettings;