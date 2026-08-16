const Skeleton = ({
  className = ""
}) => {
  return (
    <div
      className={`
        animate-pulse
        rounded-[10px]
        bg-gray-200
        ${className}
      `}
    />
  );
};

export default Skeleton;