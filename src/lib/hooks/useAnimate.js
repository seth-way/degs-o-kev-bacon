export default function useAnimate() {
  const color = colors[type];
  const [shape, setShape] = useState(rectangle);
  const [newShape, setNewShape] = useState(circle);
  const paths = [rectangle, circle];
  const [pathIndex, setPathIndex] = useState(0);
  const progress = useMotionValue(pathIndex);
  const fill = useTransform(progress, paths.map(getIndex), [
    colors[type],
    '#343434',
  ]);
}
