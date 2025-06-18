export default function SimpleTestPage() {
  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Tailwind CSS Test
        </h1>
        <p className="text-gray-700 mb-4">
          If you can see this styled properly, Tailwind is working!
        </p>
        <div className="flex gap-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Success
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
            Working
          </button>
        </div>
      </div>
    </div>
  );
}
