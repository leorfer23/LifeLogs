export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">LifeLogs App</h1>
      <p className="text-muted-foreground mb-4">
        This is the main content area. The resizable layout should work across
        the entire app now.
      </p>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">✅ Features Working:</h2>
          <ul className="space-y-1 text-sm">
            <li>• App-wide resizable layout</li>
            <li>• Mouse drag handles between panes</li>
            <li>• Automatic snapping to common sizes</li>
            <li>• Persistent layout across page navigation</li>
          </ul>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">🎯 How to Test:</h2>
          <ol className="space-y-1 text-sm">
            <li>1. Look for thin vertical lines between the panes</li>
            <li>2. Hover over them to see the resize cursor</li>
            <li>3. Drag to resize the Atlas (left) and Index (middle) panes</li>
            <li>4. Notice the smooth snapping to common sizes</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
