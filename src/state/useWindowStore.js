import { create } from 'zustand';

const useWindowStore = create(set => ({
  size: { height: 900, width: 1200 },
  layout: 'landscape',
  setSize: ({ height, width }) => {
    const layout = height > width ? 'portrait' : 'landscape';
    set({ layout });
    set({ size: { height, width } });
  },
}));

export default useWindowStore;
