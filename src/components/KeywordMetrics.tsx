import React from 'react';
import { TrendingUp, Users, BarChart2, Link } from 'lucide-react';

interface KeywordMetricsProps {
  keyword: string;
  metrics: {
    volume: number;
    difficulty: number;
    trend: number;
    related: string[];
  };
}

export default function KeywordMetrics({ keyword, metrics }: KeywordMetricsProps) {
  const cards = [
    {
      title: 'Search Volume',
      value: metrics.volume.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Difficulty',
      value: `${metrics.difficulty}%`,
      icon: BarChart2,
      color: 'bg-purple-500',
    },
    {
      title: 'Trend',
      value: `${metrics.trend > 0 ? '+' : ''}${metrics.trend}%`,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Related Terms',
      value: metrics.related.length.toString(),
      icon: Link,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Results for "{keyword}"
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all"
          >
            <div className="flex items-center space-x-4">
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Related Keywords</h3>
        <div className="flex flex-wrap gap-3">
          {metrics.related.map((term) => (
            <span
              key={term}
              className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {term}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}