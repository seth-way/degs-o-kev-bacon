import './PlayArea.css';
import TriangleUp from '../Triangles/TriangleUp';
import TriangleDown from '../Triangles/TriangleDown';
import Bubble from '../Bubble/Bubble';
import jaws from '../../assets/images/jaws.jpg';
import kBacon from '../../assets/images/k-bacon.jpeg';

const PlayArea = ({ puzzle }) => {
  if (!puzzle || !puzzle.hub || !puzzle.hub.id)
    return <section id='puzzle'></section>;
  const { hub, wheel, movies, stars } = puzzle;
  return (
    <section id='puzzle'>
      <TriangleUp id='t1' type='movie' />
      <TriangleDown id='t2' type='movie' />
      <TriangleUp id='t3' type='movie' />
      <TriangleDown id='t4' type='movie' />
      <TriangleUp id='t5' type='movie' />
      <TriangleDown id='t6' type='movie' />
      <Bubble id='hub' image={hub.img} type='hub' />
      <Bubble id='b1' type='star' />
      <Bubble id='b2' type='star' />
      <Bubble id='b3' type='star' />
      <Bubble id='b4' type='star' />
      <Bubble id='b5' type='star' />
      <Bubble id='b6' type='star' />
    </section>
  );
};

export default PlayArea;
