interface SectionHeadingProps {
  title: string,
  text: string
}

const SectionHeading = ({title, text}: SectionHeadingProps) => {
  return (
    <div className="text-center space-y-2">
      <h2 className="text-4xl font-bold text-cyan-700">{title}</h2>
      <p className="text-lg text-gray-600 mt-2 max-w-xl mx-auto">
        {text}
      </p>
    </div>
  );
};

export default SectionHeading;
