export const getPuzzle = async (id) => {
  try {
    const res = await fetch(`http://localhost:3001/api/puzzles/${id}`);
    if (!res.ok) throw new Error('fetch puzzle error');
    const puzzle = await res.json();
    return puzzle;
  } catch (err) {
    console.error('<><> ERROR FETCHING PUZZLE <><>', err);
    return err;
  }
}
