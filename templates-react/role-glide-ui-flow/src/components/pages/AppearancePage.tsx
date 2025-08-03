
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Palette, Monitor, Sun, Moon, Smartphone, Layout, Type, Eye } from 'lucide-react';

export const AppearancePage = () => {
  const [selectedTheme, setSelectedTheme] = useState('system');

  const themeOptions = [
    { id: 'light', label: 'Light', icon: Sun, preview: 'bg-white border-2' },
    { id: 'dark', label: 'Dark', icon: Moon, preview: 'bg-gray-900 border-2 border-gray-700' },
    { id: 'system', label: 'System', icon: Monitor, preview: 'bg-gradient-to-r from-white to-gray-900 border-2' }
  ];

  const colorSchemes = [
    { id: 'blue', label: 'Blue', color: 'bg-blue-500' },
    { id: 'purple', label: 'Purple', color: 'bg-purple-500' },
    { id: 'green', label: 'Green', color: 'bg-green-500' },
    { id: 'orange', label: 'Orange', color: 'bg-orange-500' },
    { id: 'red', label: 'Red', color: 'bg-red-500' },
    { id: 'pink', label: 'Pink', color: 'bg-pink-500' }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-4xl">
      <div className="flex items-center space-x-2 mb-6">
        <Palette size={24} />
        <h1 className="text-3xl font-bold">Appearance</h1>
      </div>

      <Tabs defaultValue="theme" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
        </TabsList>

        <TabsContent value="theme" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Color Theme</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-4 block">Choose your theme</Label>
                <RadioGroup value={selectedTheme} onValueChange={setSelectedTheme} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {themeOptions.map((theme) => {
                    const Icon = theme.icon;
                    return (
                      <div key={theme.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={theme.id} id={theme.id} />
                        <Label htmlFor={theme.id} className="flex items-center space-x-3 cursor-pointer p-4 border rounded-lg hover:bg-gray-50 flex-1">
                          <Icon size={20} />
                          <div className="flex-1">
                            <div className="font-medium">{theme.label}</div>
                            <div className={`h-8 w-full mt-2 rounded ${theme.preview}`}></div>
                          </div>
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accent Color</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {colorSchemes.map((scheme) => (
                  <button
                    key={scheme.id}
                    className="flex flex-col items-center space-y-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-full ${scheme.color}`}></div>
                    <span className="text-sm">{scheme.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Layout size={20} />
                <span>Layout Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sidebar-position">Sidebar Position</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sidebar position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                    <SelectItem value="hidden">Hidden</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="density">Display Density</Label>
                <RadioGroup defaultValue="comfortable">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="compact" />
                    <Label htmlFor="compact">Compact</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comfortable" id="comfortable" />
                    <Label htmlFor="comfortable">Comfortable</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="spacious" id="spacious" />
                    <Label htmlFor="spacious">Spacious</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rounded-corners" />
                <Label htmlFor="rounded-corners">Rounded corners</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="animations" />
                <Label htmlFor="animations">Enable animations</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone size={20} />
                <span>Mobile Layout</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="mobile-gestures" />
                <Label htmlFor="mobile-gestures">Enable swipe gestures</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="mobile-haptics" />
                <Label htmlFor="mobile-haptics">Haptic feedback</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Type size={20} />
                <span>Typography Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="font-family">Font Family</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select font family" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="arial">Arial</SelectItem>
                    <SelectItem value="helvetica">Helvetica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="font-size">Font Size</Label>
                <RadioGroup defaultValue="medium">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="small" id="font-small" />
                    <Label htmlFor="font-small">Small</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="font-medium" />
                    <Label htmlFor="font-medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="large" id="font-large" />
                    <Label htmlFor="font-large">Large</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <h3 className="text-lg font-semibold mb-2">The quick brown fox</h3>
                <p className="text-sm">This is how your text will appear with the current settings.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye size={20} />
                <span>Accessibility Options</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="high-contrast" />
                <Label htmlFor="high-contrast">High contrast mode</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="reduce-motion" />
                <Label htmlFor="reduce-motion">Reduce motion</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="focus-indicators" />
                <Label htmlFor="focus-indicators">Enhanced focus indicators</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="screen-reader" />
                <Label htmlFor="screen-reader">Screen reader optimizations</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button>Save Appearance Settings</Button>
      </div>
    </div>
  );
};
