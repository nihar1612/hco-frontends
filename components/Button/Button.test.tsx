import { Button } from './Button'
import { render } from '@testing-library/react'

describe('Button', () => {
  it('should render a button', () => {
    const screen = render(<Button>test</Button>)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
