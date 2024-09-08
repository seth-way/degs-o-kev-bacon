import './App.css';
import jaws from './assets/images/jaws.jpg';
import { TriangleUp } from './components/triangles/TriangleUp';
import { TriangleDown } from './components/triangles/TriangleDown';

function App() {
  return (
    <>
      <TriangleDown id='2' image={jaws} />
      <TriangleUp id='1' image={jaws} />
      {/* <div className='triangle'></div> */}
    </>
  );
}

export default App;
