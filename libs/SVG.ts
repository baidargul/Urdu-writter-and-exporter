import * as fabric from "fabric";

const createCanvas = (
  value: string,
  fontSize: number,
  letterSpacing: number,
  contentDimensions: { width: number; height: number }
) => {
  const canvas = new fabric.Canvas(null as any);

  // Create a text object to calculate the dimensions
  const text = new fabric.Text(value, {
    fontFamily: "Jameel Noori Nastaleeq",
    fontSize: fontSize,
    textAlign: "right", // Right alignment for RTL text
    direction: "rtl", // RTL text direction
    letterSpacing: letterSpacing,
    fill: "black", // Ensure the text color is black
  });

  // Add the text to the canvas
  canvas.add(text);

  // Get the bounding rectangle for the text
  const boundingRect = text.getBoundingRect();

  // Set the canvas size to fit the text's bounding box
  canvas.setWidth(boundingRect.width * 2);
  canvas.setHeight(boundingRect.height * 2);

  // Set background color to white
  canvas.backgroundColor = "white";
  canvas.renderAll(); // Re-render the canvas to apply the background color

  // Center the text inside the canvas
  const left = boundingRect.width / 2; //- text.width) / 2;
  const top = boundingRect.height / 2; //- text.height) / 2;

  text.set({
    left: left, // Center horizontally
    top: top, // Center vertically
  });

  // Re-render the canvas with the updated text position
  canvas.renderAll();
  return canvas;
};

export const exportAsImageToClipboard = (
  value: string,
  fontSize: number,
  letterSpacing: number,
  contentDimensions: { width: number; height: number }
) => {
  const canvas = createCanvas(
    value,
    fontSize,
    letterSpacing,
    contentDimensions
  );

  // Capture the canvas content as a Data URL (image format)
  const imageUrl = canvas.toDataURL({
    format: "png",
    multiplier: 10, // Optional multiplier to improve image resolution
  });

  // Create an image element to load the data URL
  const img = new Image();
  img.src = imageUrl;

  img.onload = () => {
    // Log to confirm the image is loaded

    // Create an OffscreenCanvas to process the image for the clipboard
    const offscreenCanvas = new OffscreenCanvas(img.width, img.height);
    const ctx = offscreenCanvas.getContext("2d");

    // Draw the image on the OffscreenCanvas
    if (ctx) {
      ctx.drawImage(img, 0, 0);

      // Convert the OffscreenCanvas to Blob and copy it to the clipboard
      offscreenCanvas.convertToBlob().then((blob) => {
        navigator.clipboard
          .write([new ClipboardItem({ "image/png": blob })])
          .then(() => {
            alert("Image copied to clipboard!");
          })
          .catch((err) => {
            console.error("Error copying image to clipboard:", err);
          });
      });
    }
  };

  img.onerror = (error) => {
    console.error("Error loading image:", error);
  };
};
