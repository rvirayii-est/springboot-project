import React, { useState } from 'react';
import { Copy, Download, Share2, Eye, Sparkles } from 'lucide-react';

const Marketing: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState('123 Oak Street');
  const [generatedContent, setGeneratedContent] = useState('');
  const [contentType, setContentType] = useState('listing');

  const properties = [
    '123 Oak Street - Modern Downtown Condo',
    '456 Pine Avenue - Family Home with Garden',
    '789 Lake Drive - Luxury Waterfront Villa'
  ];

  const contentTemplates = {
    listing: {
      title: 'Property Listing Description',
      template: `🏡 STUNNING MODERN CONDO IN DOWNTOWN! 🏡

✨ 2 Bedrooms | 2 Bathrooms | 1,200 sq ft
📍 123 Oak Street, Downtown District
💰 $350,000

This beautifully appointed condo offers:
🔹 Open-concept living with high ceilings
🔹 Gourmet kitchen with stainless steel appliances
🔹 Master suite with walk-in closet
🔹 In-unit laundry and private balcony
🔹 Building amenities: Gym, rooftop terrace, concierge

Perfect for first-time buyers or investors! Walking distance to restaurants, shopping, and public transit.

Schedule your showing today! 📞 (555) 123-4567`
    },
    social: {
      title: 'Social Media Post',
      template: `🏠 NEW LISTING ALERT! 🏠

This gorgeous downtown condo won't last long! 
✨ 2BR/2BA | $350,000 | Modern finishes throughout

Perfect location, perfect price, perfect opportunity! 

DM us for a private showing 📩
#RealEstate #NewListing #DowntownLiving #ModernCondo #YourDreamHome`
    },
    email: {
      title: 'Email Campaign',
      template: `Subject: Exclusive Showing - Stunning Downtown Condo

Dear [Client Name],

I'm excited to share an incredible opportunity that just hit the market!

🏡 123 Oak Street - Modern Downtown Condo
💰 $350,000 | 2BR/2BA | 1,200 sq ft

This property features:
• Open-concept design with premium finishes
• Gourmet kitchen perfect for entertaining  
• Master suite with walk-in closet
• Building amenities including rooftop terrace

Located in the heart of downtown with easy access to everything you love about city living.

I'd love to schedule a private showing for you this week. Are you available [Day] at [Time]?

Looking forward to hearing from you!

Best regards,
[Your Name]
[Your Contact Information]`
    },
    flyer: {
      title: 'Property Flyer Content',
      template: `OPEN HOUSE
Saturday & Sunday | 1:00 - 4:00 PM

123 Oak Street
Modern Downtown Condo

$350,000

FEATURES:
• 2 Bedrooms, 2 Bathrooms
• 1,200 Square Feet
• High-End Finishes Throughout
• Gourmet Kitchen
• In-Unit Laundry
• Private Balcony
• Building Gym & Rooftop

LIFESTYLE:
• Walk to Restaurants & Shopping
• Public Transit Access
• Downtown Entertainment District
• Perfect for Urban Living

Contact Information:
[Your Name] - Licensed Real Estate Agent
📞 (555) 123-4567
✉️ [your.email@domain.com]
🌐 [YourWebsite.com]`
    }
  };

  const generateContent = () => {
    const template = contentTemplates[contentType as keyof typeof contentTemplates];
    setGeneratedContent(template.template);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    // Could add a toast notification here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketing Tools</h1>
          <p className="text-gray-600 mt-1">Generate compelling content for your properties</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Generator */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Content Generator</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Property
                </label>
                <select
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {properties.map((property, index) => (
                    <option key={index} value={property}>{property}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.entries(contentTemplates).map(([key, template]) => (
                    <button
                      key={key}
                      onClick={() => setContentType(key)}
                      className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                        contentType === key
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {template.title}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateContent}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
              >
                <Sparkles size={16} className="mr-2" />
                Generate Content
              </button>
            </div>

            {generatedContent && (
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-900">
                    {contentTemplates[contentType as keyof typeof contentTemplates].title}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={copyToClipboard}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy size={16} />
                    </button>
                    <button
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download size={16} />
                    </button>
                    <button
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Share"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                    {generatedContent}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Marketing Tips */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Marketing Tips</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Social Media Best Practices</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Post consistently 3-5 times per week</li>
                  <li>• Use high-quality photos and videos</li>
                  <li>• Include local hashtags</li>
                  <li>• Engage with comments promptly</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Email Marketing</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Personalize subject lines</li>
                  <li>• Keep emails mobile-friendly</li>
                  <li>• Include clear call-to-actions</li>
                  <li>• Track open and click rates</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-medium text-yellow-900 mb-2">Property Photography</h3>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Shoot during golden hour</li>
                  <li>• Stage rooms properly</li>
                  <li>• Include exterior shots</li>
                  <li>• Consider drone photography</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Campaign Performance */}
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Campaigns</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Oak Street Listing</h3>
                  <p className="text-sm text-gray-600">Email campaign</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">85%</p>
                  <p className="text-sm text-gray-600">Open rate</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Pine Avenue Post</h3>
                  <p className="text-sm text-gray-600">Social media</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">247</p>
                  <p className="text-sm text-gray-600">Engagements</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Lake Drive Flyer</h3>
                  <p className="text-sm text-gray-600">Print marketing</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">12</p>
                  <p className="text-sm text-gray-600">Inquiries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;