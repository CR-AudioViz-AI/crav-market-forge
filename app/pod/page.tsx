// POD (Print-on-Demand) Page
// /app/pod/page.tsx
// Updated: December 22, 2025 - 11:05 PM EST

import PrintfulBrowser from '@/components/PrintfulBrowser';

export const metadata = {
  title: 'Print on Demand | Market Forge',
  description: 'Create custom merchandise with Printful integration',
};

export default function PODPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Print on Demand
          </h1>
          <p className="text-gray-600 mt-2">
            Browse products, select variants, and calculate costs for your custom merchandise.
          </p>
        </header>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <PrintfulBrowser />
        </div>
        
        <footer className="mt-8 text-center text-sm text-gray-500">
          Powered by Printful • CR AudioViz AI
        </footer>
      </div>
    </main>
  );
}
