import { useState } from 'react';

export default function ImageCompressor() {
  const [image, setImage] = useState(null);
  const [compressed, setCompressed] = useState(null);
  const [quality, setQuality] = useState(80);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const compress = () => {
    if (!image) return;
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      setCompressed(canvas.toDataURL('image/jpeg', quality / 100));
    };
    img.src = image;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-200 p-4">
      <h2 className="text-4xl font-extrabold mb-6 text-purple-700 drop-shadow">Image Compressor</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full mb-4 px-4 py-2 border-2 border-purple-300 rounded-lg"
        />
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Quality: {quality}%</label>
          <input
            type="range"
            min="10"
            max="100"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full"
          />
        </div>
        <button
          onClick={compress}
          disabled={!image}
          className="w-full px-6 py-2 rounded-lg bg-purple-500 text-white font-semibold shadow hover:bg-purple-600 transition mb-4 disabled:opacity-50"
        >
          Compress Image
        </button>
        {compressed && (
          <div className="space-y-4">
            <img src={compressed} alt="Compressed" className="w-full rounded-lg border-2 border-purple-200" />
            <a
              href={compressed}
              download="compressed.jpg"
              className="block text-center px-6 py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600"
            >
              Download
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
