// Interface
import { ConvertedAmountInputProps } from './interface'


/**
 * ConvertedAmountInput component for displaying converted numeric input.
 *
 * @param value - The converted value to display.
 * @returns An input element displaying the converted numeric value with specified styling, read-only.
 */
const ConvertedAmountInput: React.FC<ConvertedAmountInputProps> = ({
	value,
}) => {
	return (
		<input
			type='number'
			value={value}
			readOnly
			className='bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400'
		/>
	)
}

export default ConvertedAmountInput
