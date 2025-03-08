
import { useState } from "react";
import BusinessDashboardLayout from "@/components/business/BusinessDashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

type DateRange = "today" | "yesterday" | "week" | "month" | "sixMonths" | "year";

// Mock data for different time ranges
const dataByRange = {
  today: {
    conversations: 15,
    aiOnly: 11,
    humanOnly: 4,
    aiResponses: 27,
    chartData: [
      { name: '9 AM', AI: 3, Human: 1 },
      { name: '12 PM', AI: 4, Human: 1 },
      { name: '3 PM', AI: 2, Human: 1 },
      { name: '6 PM', AI: 2, Human: 1 },
    ],
  },
  yesterday: {
    conversations: 18,
    aiOnly: 13,
    humanOnly: 5,
    aiResponses: 32,
    chartData: [
      { name: '9 AM', AI: 4, Human: 1 },
      { name: '12 PM', AI: 3, Human: 2 },
      { name: '3 PM', AI: 3, Human: 1 },
      { name: '6 PM', AI: 3, Human: 1 },
    ],
  },
  week: {
    conversations: 97,
    aiOnly: 76,
    humanOnly: 21,
    aiResponses: 189,
    chartData: [
      { name: 'Mon', AI: 13, Human: 3 },
      { name: 'Tue', AI: 11, Human: 4 },
      { name: 'Wed', AI: 12, Human: 2 },
      { name: 'Thu', AI: 9, Human: 3 },
      { name: 'Fri', AI: 14, Human: 5 },
      { name: 'Sat', AI: 10, Human: 2 },
      { name: 'Sun', AI: 7, Human: 2 },
    ],
  },
  month: {
    conversations: 340,
    aiOnly: 272,
    humanOnly: 68,
    aiResponses: 643,
    chartData: [
      { name: 'Week 1', AI: 65, Human: 15 },
      { name: 'Week 2', AI: 73, Human: 17 },
      { name: 'Week 3', AI: 69, Human: 19 },
      { name: 'Week 4', AI: 65, Human: 17 },
    ],
  },
  sixMonths: {
    conversations: 1860,
    aiOnly: 1488,
    humanOnly: 372,
    aiResponses: 3720,
    chartData: [
      { name: 'Jan', AI: 245, Human: 55 },
      { name: 'Feb', AI: 232, Human: 58 },
      { name: 'Mar', AI: 251, Human: 63 },
      { name: 'Apr', AI: 258, Human: 65 },
      { name: 'May', AI: 264, Human: 68 },
      { name: 'Jun', AI: 238, Human: 63 },
    ],
  },
  year: {
    conversations: 3650,
    aiOnly: 2920,
    humanOnly: 730,
    aiResponses: 7300,
    chartData: [
      { name: 'Q1', AI: 721, Human: 183 },
      { name: 'Q2', AI: 734, Human: 185 },
      { name: 'Q3', AI: 748, Human: 186 },
      { name: 'Q4', AI: 717, Human: 176 },
    ],
  },
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const AnalyticsPage = () => {
  const [currentRange, setCurrentRange] = useState<DateRange>("week");
  
  const data = dataByRange[currentRange];
  
  const pieData = [
    { name: 'AI Only', value: data.aiOnly },
    { name: 'Human Only', value: data.humanOnly },
  ];

  return (
    <BusinessDashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        
        <Tabs 
          defaultValue="week" 
          value={currentRange}
          onValueChange={(value) => setCurrentRange(value as DateRange)}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-6">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">30 Days</TabsTrigger>
            <TabsTrigger value="sixMonths">6 Months</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
          
          <TabsContent value={currentRange} className="space-y-8 pt-4">
            {/* Summary stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-secondary/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Conversations</p>
                <p className="text-2xl font-bold">{data.conversations}</p>
              </div>
              
              <div className="bg-secondary/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">AI-Only Conversations</p>
                <p className="text-2xl font-bold">{data.aiOnly}</p>
              </div>
              
              <div className="bg-secondary/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Human-Only Conversations</p>
                <p className="text-2xl font-bold">{data.humanOnly}</p>
              </div>
              
              <div className="bg-secondary/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">AI Responses</p>
                <p className="text-2xl font-bold">{data.aiResponses}</p>
              </div>
            </div>
            
            {/* Bar chart */}
            <div className="bg-secondary/10 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Conversation Volume</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="AI" fill="#8884d8" />
                    <Bar dataKey="Human" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Pie chart */}
            <div className="bg-secondary/10 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Conversation Types</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Additional stats */}
            <div className="bg-secondary/10 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Efficiency Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Avg. Response Time</p>
                  <p className="text-xl font-bold">18 seconds</p>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Avg. Resolution Time</p>
                  <p className="text-xl font-bold">2.8 minutes</p>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
                  <p className="text-xl font-bold">92%</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </BusinessDashboardLayout>
  );
};

export default AnalyticsPage;
