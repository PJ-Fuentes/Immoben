import Header from '@/components/Header';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-9 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-5 w-96 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="mb-6 flex items-center space-x-4">
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div>
                    <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
