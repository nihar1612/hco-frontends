type QuestionProps = {
  text: string;
  description?: string;
};

export function Question({ text, description }: QuestionProps) {
  return (
    <>
      <h1 className="pb-2 max-w-4xl text-2.5xl font-semibold leading-10 lg:leading-14 text-white md:text-5xl">
        {text}
      </h1>
      {description && <p className="md:text-xl text-dawnDark-300 font-inter">{description}</p>}
    </>
  );
}
