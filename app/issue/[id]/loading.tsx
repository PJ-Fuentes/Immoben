import Header from '@/components/Header';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-8 w-96 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="border-t pt-6 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
          
          <div className="space-y-4 mb-6">
            {[1, 2].map((i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
