// Interface
import { Currency, CurrencySelectorProps } from './interface'

// Icons
import { FaBitcoin, FaEthereum } from 'react-icons/fa'
import { SiTether } from 'react-icons/si'

/**
 * CurrencySelector component for selecting a currency with an icon.
 *
 * @param label - The label for the currency selector.
 * @param currency - The currently selected currency.
 * @param setCurrency - Function to set the selected currency.
 * @returns A selector component with icons and dropdown for currency selection.
 */
const CurrencySelector: React.FC<CurrencySelectorProps> = ({
	label,
	currency,
	setCurrency,
}) => {
	const iconForCurrency = (currency: Currency) => {
		switch (currency) {
			case 'USDT':
				return <SiTether className='text-green-500' />
			case 'BTC':
				return <FaBitcoin className='text-yellow-500' />
			case 'ETH':
				return <FaEthereum className='text-blue-500' />
			default:
				return null
		}
	}

	return (
		<div className='flex flex-col items-center space-y-4'>
			<label className='text-lg font-semibold'>{label}</label>
			<div className='flex items-center space-x-2'>
				{iconForCurrency(currency)}
				<select
					value={currency}
					onChange={e => setCurrency(e.target.value as Currency)}
					className='bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400'
				>
					<option value='USDT'>USDT</option>
					<option value='BTC'>BTC</option>
					<option value='ETH'>ETH</option>
				</select>
			</div>
		</div>
	)
}

export default CurrencySelector
