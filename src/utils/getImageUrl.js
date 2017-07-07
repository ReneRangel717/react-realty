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

export default function getImageUrl(id, size = 'sm', format = 'jpg') {
  if (size === 'original') {
    return `${process.env.IMG_BASE_URL}${id}.${format}`;
  }

  if (Array.isArray(size)) {
    const [width, height] = size;
    return `${process.env.IMG_BASE_URL}${id}-${width}x${height}.${format}`;
  }

  const { width, height } = PIC_SIZE[size];
  return `${process.env.IMG_BASE_URL}${id}-${width}x${height}.${format}`;
}
