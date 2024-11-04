import React, { useState } from 'react';
import { Search } from 'lucide-react';
import SearchBar from './components/SearchBar';
import KeywordMetrics from './components/KeywordMetrics';
import TrendChart from './components/TrendChart';

// Mock data - In a real app, this would come from your API
const mockData = {
  volume: 145000,
  difficulty: 67,
  trend: 12,
  related: [
    'digital marketing',
    'seo tools',
    'keyword planner',
    'google keywords',
    'keyword research tool',
    'seo keyword research',
    'free keyword tool',
    'keyword analysis'
  ]
};

const mockTrendData = [
  { month: 'Jan', value: 120 },
  { month: 'Feb', value: 150 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 165 },
  { month: 'May', value: 190 },
  { month: 'Jun', value: 210 },
  { month: 'Jul', value: 230 },
  { month: 'Aug', value: 215 },
  { month: 'Sep', value: 245 },
  { month: 'Oct', value: 260 },
  { month: 'Nov', value: 280 },
  { month: 'Dec', value: 310 }
];

function App() {
  const [searchedKeyword, setSearchedKeyword] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (keyword: string) => {
    setSearchedKeyword(keyword);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <Search className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">
              Keyword Research Tool
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover High-Value Keywords
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get detailed insights about search volume, competition, and trends to optimize your content strategy
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>

        {showResults && (
          <div className="space-y-8 animate-fade-in">
            <KeywordMetrics keyword={searchedKeyword} metrics={mockData} />
            <TrendChart data={mockTrendData} />
          </div>
        )}
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Keyword Research Tool. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;