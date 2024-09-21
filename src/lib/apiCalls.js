export const getPuzzle = async id => {
  try {
    const res = await fetch(
      `https://degs-o-kev-bacon-api.vercel.app/api/puzzles/${id}`
    );
    if (!res.ok) throw new Error('error fetching puzzle ' + id);
    const puzzle = await res.json();
    return puzzle;
  } catch (err) {
    console.error('<><> ERROR FETCHING PUZZLE <><>', err);
    err.status = err.status || 500;
    return err;
  }
};

export const getPuzzles = async () => {
  try {
    const res = await fetch(
      'https://degs-o-kev-bacon-api.vercel.app/api/puzzles'
    );
    if (!res.ok) throw new Error('error fetching initial puzzles');
    const puzzles = await res.json();
    return puzzles;
  } catch (err) {
    console.error('<><> ERROR FETCHING PUZZLES <><>', err);
    err.status = err.status || 500;
    return err;
  }
};
