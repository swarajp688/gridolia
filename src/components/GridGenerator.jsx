import { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridGenerator = () => {
  const [layout, setLayout] = useState([]);
  const [gridItems, setGridItems] = useState([]);

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const handleAddBox = () => {
    const newItem = {
      i: gridItems.length.toString(),
      x: 0,
      y: Infinity,
      w: 2,
      h: 2,
    };

    setGridItems([...gridItems, newItem]);
  };

  const handleRemoveBox = (boxId) => {
    const updatedItems = gridItems.filter((item) => item.i !== boxId);
    setGridItems(updatedItems);
  };

  const handleEditLabel = (boxId, newLabel) => {
    const updatedItems = gridItems.map((item) =>
      item.i === boxId ? { ...item, label: newLabel } : item
    );
    setGridItems(updatedItems);
  };

  const handleGenerateLayout = () => {
    const code = `grid-template-columns: repeat(${layout[0].w}, 1fr);
grid-template-rows: repeat(${layout[0].h}, 1fr);`;

    alert(code);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CSS Grid Layout Generator</h1>

      <div className="grid grid-cols-2 gap-4">
        <div style={{ minWidth: '300px' }}>
          <div className="mb-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleGenerateLayout}
            >
              Generate Layout
            </button>
          </div>

          <div>
            {gridItems.map((item) => (
              <div
                key={item.i}
                className="bg-white rounded shadow p-2 mb-4 relative"
              >
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 absolute top-0 right-0"
                  onClick={() => handleRemoveBox(item.i)}
                >
                  Remove
                </button>
                <input
                  type="text"
                  value={item.label || ''}
                  onChange={(e) => handleEditLabel(item.i, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                  placeholder="Label"
                />
              </div>
            ))}

            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleAddBox}
            >
              Add Box
            </button>
          </div>
        </div>

        <div>
          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={30}
            onLayoutChange={handleLayoutChange}
          >
            {gridItems.map((item) => (
              <div
                key={item.i}
                className="bg-white rounded shadow p-2 flex items-center justify-center"
                data-grid={item}
              >
                {item.label || item.i}
              </div>
            ))}
          </ResponsiveGridLayout>
        </div>
      </div>
    </div>
  );
};

export default GridGenerator;