import React from 'react';
import { TrendingUp, DollarSign, Users, Calendar, ArrowUp, ArrowDown } from 'lucide-react';

const Analytics: React.FC = () => {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$2,456,780',
      change: '+18.2%',
      changeType: 'positive' as const,
      icon: DollarSign,
      period: 'vs last quarter'
    },
    {
      title: 'Properties Sold',
      value: '47',
      change: '+23.1%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      period: 'vs last quarter'
    },
    {
      title: 'New Leads',
      value: '189',
      change: '-5.3%',
      changeType: 'negative' as const,
      icon: Users,
      period: 'vs last month'
    },
    {
      title: 'Avg. Days on Market',
      value: '24',
      change: '-12.5%',
      changeType: 'positive' as const,
      icon: Calendar,
      period: 'vs last quarter'
    }
  ];

  const leadSources = [
    { source: 'Website', leads: 78, percentage: 41.3, color: 'bg-blue-500' },
    { source: 'Referrals', leads: 45, percentage: 23.8, color: 'bg-green-500' },
    { source: 'Social Media', leads: 34, percentage: 18.0, color: 'bg-yellow-500' },
    { source: 'Print Ads', leads: 20, percentage: 10.6, color: 'bg-purple-500' },
    { source: 'Other', leads: 12, percentage: 6.3, color: 'bg-gray-500' }
  ];

  const recentSales = [
    { property: '123 Oak Street', price: '$350,000', date: '2024-01-12', buyer: 'Johnson Family' },
    { property: '456 Pine Avenue', price: '$425,000', date: '2024-01-08', buyer: 'Martinez Corp' },
    { property: '789 Elm Street', price: '$298,000', date: '2024-01-05', buyer: 'Smith & Associates' },
    { property: '321 Maple Drive', price: '$675,000', date: '2024-01-03', buyer: 'Wilson Trust' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Track your performance and market insights</p>
        </div>
        <div className="flex space-x-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last 6 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <metric.icon className="text-blue-600" size={20} />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.changeType === 'positive' ? (
                  <ArrowUp size={16} className="mr-1" />
                ) : (
                  <ArrowDown size={16} className="mr-1" />
                )}
                {metric.change}
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <p className="text-sm text-gray-600">{metric.title}</p>
              <p className="text-xs text-gray-500 mt-1">{metric.period}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Sources */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Lead Sources</h2>
          <div className="space-y-4">
            {leadSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${source.color} mr-3`}></div>
                  <span className="text-sm font-medium text-gray-900">{source.source}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{source.leads}</span>
                  <span className="text-xs text-gray-600 ml-2">({source.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>

          {/* Visual representation */}
          <div className="mt-6">
            <div className="flex h-2 rounded-full overflow-hidden">
              {leadSources.map((source, index) => (
                <div
                  key={index}
                  className={source.color}
                  style={{ width: `${source.percentage}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Sales</h2>
          <div className="space-y-4">
            {recentSales.map((sale, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{sale.property}</h3>
                  <p className="text-sm text-gray-600">{sale.buyer}</p>
                  <p className="text-xs text-gray-500">{sale.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{sale.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Market Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Average Sale Price</h3>
            <p className="text-3xl font-bold text-blue-600">$387,500</p>
            <p className="text-sm text-blue-700 mt-1">+8.2% from last quarter</p>
          </div>

          <div className="text-center p-6 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">Inventory Turnover</h3>
            <p className="text-3xl font-bold text-green-600">2.3x</p>
            <p className="text-sm text-green-700 mt-1">Properties per month</p>
          </div>

          <div className="text-center p-6 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">Market Activity</h3>
            <p className="text-3xl font-bold text-yellow-600">High</p>
            <p className="text-sm text-yellow-700 mt-1">Buyer demand strong</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-3">Key Market Trends</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Downtown condos seeing increased demand (+15% from last quarter)</li>
            <li>• Average days on market decreased to 24 days (industry avg: 32 days)</li>
            <li>• First-time buyers represent 43% of total sales</li>
            <li>• Investment property purchases up 22% year-over-year</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Analytics;