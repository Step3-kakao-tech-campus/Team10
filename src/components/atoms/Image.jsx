const Image = ({ className, src, alt }) => {
  return (
    <picture className={className}>
      <source srcSet={src} />
      <img src={src} alt={alt} />
    </picture>
  );
};

export default Image;
