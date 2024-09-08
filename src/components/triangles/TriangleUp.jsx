export const TriangleUp = ({ id, image }) => {
  return (
    <svg className='triangle' viewBox='0 0 150 130'>
      <defs>
        <clipPath id={id}>
          <polygon points='0 0, 150.9 0, 75 120.9' />
        </clipPath>
      </defs>
      <image
        xlinkHref={image}
        x='0'
        y='-20'
        width='150px'
        clipPath={`url(#${id})`}
      />
    </svg>
  );
};
