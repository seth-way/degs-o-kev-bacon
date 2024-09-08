export const TriangleDown = ({ id, image }) => {
  return (
    <svg className='triangle' viewBox='0 0 150 130' fill="black">
      <polygon strokeWidth='10' stroke='red' points='8 128, 142 128, 75 8' />
      <defs>
        <clipPath id={id}>
          <polygon points='10 126, 142 126, 75 8' />
        </clipPath>
      </defs>
      <image
        xlinkHref={image}
        x='0'
        y='-30'
        width='100'
        clipPath={`url(#${id})`}
      />
    </svg>
  );
};
