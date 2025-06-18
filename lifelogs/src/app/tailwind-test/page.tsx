export default function TailwindTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🎨 Tailwind CSS Test Page
          </h1>
          <p className="text-xl text-white/90">
            If you can see colors, spacing, and styling - Tailwind is working!
          </p>
        </div>

        {/* Color Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 rounded-xl p-6 shadow-2xl transform hover:scale-105">
            <h3 className="text-2xl font-bold text-white mb-2">Blue Card</h3>
            <p className="text-blue-100">
              This should be bright blue with hover effects
            </p>
          </div>

          <div className="bg-green-500 hover:bg-green-600 transition-colors duration-300 rounded-xl p-6 shadow-2xl transform hover:scale-105">
            <h3 className="text-2xl font-bold text-white mb-2">Green Card</h3>
            <p className="text-green-100">
              This should be bright green with hover effects
            </p>
          </div>

          <div className="bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 rounded-xl p-6 shadow-2xl transform hover:scale-105">
            <h3 className="text-2xl font-bold text-white mb-2">Yellow Card</h3>
            <p className="text-yellow-100">
              This should be bright yellow with hover effects
            </p>
          </div>
        </div>

        {/* Flexbox Test */}
        <div className="bg-white rounded-2xl p-8 mb-12 shadow-2xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Layout Test
          </h2>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="bg-indigo-100 border-2 border-indigo-300 rounded-lg p-4 flex-1 min-w-[200px]">
              <p className="text-indigo-800 font-semibold">Flex Item 1</p>
            </div>
            <div className="bg-purple-100 border-2 border-purple-300 rounded-lg p-4 flex-1 min-w-[200px]">
              <p className="text-purple-800 font-semibold">Flex Item 2</p>
            </div>
            <div className="bg-pink-100 border-2 border-pink-300 rounded-lg p-4 flex-1 min-w-[200px]">
              <p className="text-pink-800 font-semibold">Flex Item 3</p>
            </div>
          </div>
        </div>

        {/* Spacing and Typography Test */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-12 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Typography & Spacing Test
          </h2>
          <div className="space-y-4">
            <p className="text-3xl text-yellow-400 font-bold">
              Large Yellow Text (text-3xl text-yellow-400)
            </p>
            <p className="text-xl text-green-400 font-medium">
              Medium Green Text (text-xl text-green-400)
            </p>
            <p className="text-base text-blue-400">
              Regular Blue Text (text-base text-blue-400)
            </p>
            <p className="text-sm text-purple-400">
              Small Purple Text (text-sm text-purple-400)
            </p>
          </div>
        </div>

        {/* Button Test */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Interactive Elements Test
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              Red Button
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              Orange Button
            </button>
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              Teal Button
            </button>
          </div>
        </div>

        {/* Status Message */}
        <div className="mt-12 text-center">
          <div className="bg-green-100 border-2 border-green-500 rounded-xl p-6 inline-block">
            <p className="text-2xl font-bold text-green-800">
              ✅ If you can see all these colors and styling, Tailwind CSS is
              working perfectly!
            </p>
            <p className="text-green-700 mt-2">
              The page should have a colorful gradient background, colored
              cards, proper spacing, and hover effects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
