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
    console.log(puzzles);
    return puzzles;
  } catch (err) {
    console.error('<><> ERROR FETCHING PUZZLES <><>', err);
    return err;
  }
};
