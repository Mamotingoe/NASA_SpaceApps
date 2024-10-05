import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Rocket, Mouse, ArrowDown, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const ExperimentDashboard = () => {
  const [activeExperiment, setActiveExperiment] = useState('OSD-379');
  const [is3DView, setIs3DView] = useState(false);

  const experimentData = {
    'OSD-379': {
      title: 'Rodent Research Reference Mission-1',
      subjects: 20,
      groups: [
        { name: 'Control', count: 10 },
        { name: 'Treatment', count: 10 }
      ],
      timeline: [
        { stage: 'Pre-flight', duration: 14 },
        { stage: 'Spaceflight', duration: 37 },
        { stage: 'Post-flight', duration: 7 }
      ],
      treatment: 'Microgravity exposure',
      relatedExperiments: ['OSD-665', 'OSD-123', 'OSD-456']
    },
    'OSD-665': {
      title: 'Rodent Research-23 Mission',
      subjects: 24,
      groups: [
        { name: 'Control', count: 12 },
        { name: 'Treatment', count: 12 }
      ],
      timeline: [
        { stage: 'Pre-flight', duration: 10 },
        { stage: 'Spaceflight', duration: 30 },
        { stage: 'Post-flight', duration: 5 }
      ],
      treatment: 'Arthritic gene therapy',
      relatedExperiments: ['OSD-379', 'OSD-789', 'OSD-101']
    }
  };

  const ExperimentOverview = ({ data }) => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-600">{data.title}</h2>
      <div className="flex space-x-4">
        <Card className="flex-1">
          <CardHeader className="font-semibold">Total Subjects</CardHeader>
          <CardContent className="text-3xl font-bold text-center">
            {data.subjects}
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="font-semibold">Treatment</CardHeader>
          <CardContent className="text-lg text-center">
            {data.treatment}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="font-semibold">Subject Groups</CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.groups}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const Timeline = ({ data }) => (
    <div className="flex items-center justify-between mt-8">
      {data.timeline.map((stage, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="text-lg font-semibold">{stage.stage}</div>
          <div className="text-3xl font-bold text-green-500">{stage.duration} days</div>
          {index < data.timeline.length - 1 && (
            <ArrowRight className="text-gray-400 mt-2" size={24} />
          )}
        </div>
      ))}
    </div>
  );

  const ExperimentStages = () => {
    const stages = [
      { name: 'Preparation', icon: 'P', color: 'bg-purple-500' },
      { name: 'Launch', icon: <Rocket size={24} />, color: 'bg-blue-500' },
      { name: 'Experiment', icon: <Mouse size={24} />, color: 'bg-red-500' },
      { name: 'Return', icon: <ArrowDown size={24} />, color: 'bg-green-500' },
      { name: 'Analysis', icon: 'A', color: 'bg-yellow-500' },
    ];

    return (
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Experiment Stages</h3>
          <div className="flex items-center space-x-2">
            <span>3D View</span>
            <Switch checked={is3DView} onCheckedChange={setIs3DView} />
          </div>
        </div>
        <div className={`flex justify-between items-center ${is3DView ? 'h-[400px] relative' : ''}`}>
          {stages.map((stage, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center ${is3DView ? 'absolute transition-all duration-1000' : ''}`}
              style={is3DView ? {
                transform: `translateZ(-200px) rotateY(${index * 72}deg) translateZ(200px)`,
                top: '50%',
                left: '50%',
              } : {}}
            >
              <div className={`w-12 h-12 ${stage.color} rounded-full flex items-center justify-center text-white font-bold ${is3DView ? 'transform-style: preserve-3d;' : ''}`}>
                {typeof stage.icon === 'string' ? stage.icon : stage.icon}
              </div>
              <span className="mt-2 font-semibold">{stage.name}</span>
            </div>
          ))}
        </div>
        {is3DView && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Tip: Imagine you're floating in space, observing the experiment stages around you!
          </div>
        )}
      </div>
    );
  };

  const RelatedExperiments = ({ experiments }) => (
    <Card className="mt-8">
      <CardHeader className="font-semibold">Related Experiments</CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          {experiments.map((exp, index) => (
            <Button key={index} variant="outline" onClick={() => setActiveExperiment(exp)}>
              {exp}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Space Biology Experiment Visualizer
      </h1>
      <Tabs value={activeExperiment} onValueChange={setActiveExperiment}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="OSD-379">OSD-379</TabsTrigger>
          <TabsTrigger value="OSD-665">OSD-665</TabsTrigger>
        </TabsList>
        {Object.entries(experimentData).map(([key, data]) => (
          <TabsContent key={key} value={key}>
            <ExperimentOverview data={data} />
            <Timeline data={data} />
            <ExperimentStages />
            <RelatedExperiments experiments={data.relatedExperiments} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ExperimentDashboard;
