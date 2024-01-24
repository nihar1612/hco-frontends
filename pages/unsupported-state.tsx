import WithEmailCollectionLayout from 'modules/layout/WithEmailCollectionLayout';

export default function UnsupportedState() {
  return (
    <WithEmailCollectionLayout
      title={
        <>
          Oh no! Dawn is not yet
          <br /> covered in your state.
        </>
      }
      subtitle="Please enter your email and we’ll notify you when Dawn is covered in your state."
      forwardingUrl="email-submitted"
      unsupportedState={true}
      lowIntent={false}
    />
  );
}
