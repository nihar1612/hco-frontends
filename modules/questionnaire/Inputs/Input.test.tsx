import { act, fireEvent, render } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  it('should render', () => {
    const handleChange = jest.fn()
    const { getByPlaceholderText } = render(<Input value="oldvalue" onChange={handleChange} />)
    const input = getByPlaceholderText('Enter your answer') as HTMLInputElement
    expect(input).toBeInTheDocument()
    expect(input.value).toEqual('oldvalue')
  })
  it('should trigger onChange event', async () => {
    const handleChange = jest.fn()
    const { getByPlaceholderText } = render(<Input value="" onChange={handleChange} placeholder="Name" />)
    const input = getByPlaceholderText('Name') as HTMLInputElement

    expect(input.value).toEqual('')

    act(() => {
      fireEvent.change(input, { target: { value: 'name' } })
    })

    expect(handleChange).toBeCalledWith('name')
  })
})
