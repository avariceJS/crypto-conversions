// Interface
import { AmountInputProps } from './interface'

/**
 * AmountInput component for numeric input.
 *
 * @param value - The current value of the input.
 * @param setValue - Function to set the value of the input.
 * @returns An input element for numeric input with specified styling.
 */
const AmountInput: React.FC<AmountInputProps> = ({ value, setValue }) => {
	return (
		<input
			type='number'
			value={value}
			onChange={e => setValue(parseFloat(e.target.value))}
			className='bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400'
		/>
	)
}

export default AmountInput
