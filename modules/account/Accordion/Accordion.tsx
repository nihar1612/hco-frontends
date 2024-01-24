import cs from 'classnames'

interface AccordionProps {
  isOpen: boolean,
}

export const Accordion: React.FC<AccordionProps> = ({ children, isOpen }) => {
  const { header, body } = getAccordionNodes(children as React.ReactNode[])

  return (
    <div className="">
      <div className="transition-all duration-1000" role="button">
        {header}
      </div>
      <div className={cs('transition-all duration-1000 overflow-hidden', {
        'max-h-0 hidden': !isOpen,
        'max-h-1000 pt-4': isOpen,
      })}>
        {body}
      </div>
    </div>
  )
}

// @ts-ignore
const getAccordionNodes = (children) => {
  // TODO: (Prasanna) Move this utility outside the component
  const [header, ...body] = children
  return { header, body }
}
