import React from 'react';
import { LineChart, TrendingUp, TrendingDown } from 'lucide-react';

interface TrendChartProps {
  data: { month: string; value: number }[];
}

export default function TrendChart({ data }: TrendChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const trend = data[data.length - 1].value > data[0].value;

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <LineChart className="w-6 h-6 text-gray-600" />
            <h3 className="text-xl font-semibold">Search Trend</h3>
          </div>
          <div className={`flex items-center space-x-2 ${trend ? 'text-green-500' : 'text-red-500'}`}>
            {trend ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            <span className="font-medium">
              {trend ? 'Upward Trend' : 'Downward Trend'}
            </span>
          </div>
        </div>
        
        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end space-x-2">
            {data.map((item, index) => {
              const height = ((item.value - minValue) / (maxValue - minValue)) * 100;
              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center justify-end"
                >
                  <div
                    style={{ height: `${height}%` }}
                    className="w-full bg-blue-500 rounded-t-lg opacity-75 hover:opacity-100 transition-opacity"
                  />
                  <span className="text-xs text-gray-500 mt-2 transform -rotate-45">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}