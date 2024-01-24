import { render } from '@testing-library/react'
import { Accordion } from './Accordion'
import { AccordionHeading } from './AccordionHeading'

describe('Accordion', () => {
  it('should render the accordion OPEN state', () => {
    const screen = render(
      <Accordion isOpen>
        <AccordionHeading number={1} headerText="Create Account" />
        <p>Body</p>
      </Accordion>
    )

    expect(screen.getByText('Create Account')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
    expect(screen.getByText('Body').parentElement).toHaveClass('max-h-1000')
  })
  it('should render the accordion CLOSE state', () => {
    const screen = render(
      <Accordion isOpen={false}>
        <AccordionHeading number={1} headerText="Create Account" />
        <p>Body</p>
      </Accordion>
    )

    expect(screen.getByText('Create Account')).toBeInTheDocument()
    expect(screen.getByText('Body').parentElement).toHaveClass('max-h-0')
  })
})
