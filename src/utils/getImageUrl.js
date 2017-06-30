export const PIC_SIZE = {
  xs: {
    width: 20,
    height: 20
  },
  sm: {
    width: 150,
    height: 100
  },
  md: {
    width: 300,
    height: 200
  }
};

export default function getImageUrl(mlsId, picIndex = 1, size = 'sm') {
  if (size === 'original') {
    return `${process.env.IMG_BASE_URL}${mlsId}-${picIndex}.jpg`;
  }

  const { width, height } = PIC_SIZE[size];
  return `${process.env.IMG_BASE_URL}${mlsId}-${picIndex}-${width}x${height}.jpg`;
}
