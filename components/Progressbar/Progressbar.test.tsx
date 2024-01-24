import { render } from "@testing-library/react"
import { Progressbar } from "./Progressbar"

describe('Progressbar', () => {
  it('should render progress', () => {
    const { getByTestId } = render(<Progressbar progress={50} />)

    const progressbar = getByTestId('progressbar')
    expect(progressbar).toBeInTheDocument()
    expect(progressbar.getAttribute('style')).toEqual('width: 50%;')
  })
  it('should render default progress value', () => {
    const { getByTestId } = render(<Progressbar />)

    const progressbar = getByTestId('progressbar')
    expect(progressbar).toBeInTheDocument()
    expect(progressbar.getAttribute('style')).toEqual('width: 1%;')
  })
})
