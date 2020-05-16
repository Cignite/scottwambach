export default function newAspect(src, original) {
  const topPercent = src.crop.top;
  const bottomPercent = src.crop.bottom;
  const newHeightPercent = topPercent + bottomPercent;
  const cropHeight = original.height - original.height * newHeightPercent;

  const leftPercent = src.crop.left;
  const rightPercent = src.crop.right;
  const newWidthPercent = leftPercent + rightPercent;
  const cropWidth = original.width - original.width * newWidthPercent;

  const newHeight = parseFloat(cropHeight.toFixed(3));
  const newWidth = parseFloat(cropWidth.toFixed(3));
  const newRatio = parseFloat(((newHeight / newWidth) * 100).toFixed(3));

  const cropAsset = {
    height: newHeight,
    width: newWidth,
    aspectRatio: newRatio,
  };
  return cropAsset;
}
