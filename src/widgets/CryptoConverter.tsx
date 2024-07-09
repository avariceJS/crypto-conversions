// Shared-> UI
import { LampContainer } from '@/shared/ui/lamp'
import { SparklesCore } from '@/shared/ui/sparkles'

// Base
import React, { useEffect, useMemo, useState } from 'react'

// Axios
import axios from 'axios'

// FramerMotion
import { motion } from 'framer-motion'

// Interface
import { Currency, Rates } from './interface'

// Features
import AmountInput from '@/features/AmountInput'
import ConvertedAmountInput from '@/features/ConvertedAmountInput'
import CurrencySelector from '@/features/CurrencySelector'

/**
 * CryptoConverter component for converting between cryptocurrencies.
 *
 * Uses Binance API to fetch real-time conversion rates.
 *
 * @returns A component with currency selectors, amount inputs, and conversion results.
 */
const CryptoConverter: React.FC = () => {
	const [fromCurrency, setFromCurrency] = useState<Currency>('USDT')
	const [toCurrency, setToCurrency] = useState<Currency>('BTC')
	const [amount, setAmount] = useState<number>(1)
	const [convertedAmount, setConvertedAmount] = useState<number>(0)
	const [rates, setRates] = useState<Rates>({})

	useEffect(() => {
		const fetchRates = async () => {
			try {
				const response = await axios.get(
					'https://api.binance.com/api/v3/ticker/price'
				)
				const prices: Rates = {}
				response.data.forEach((pair: { symbol: string; price: string }) => {
					if (pair.symbol === 'BTCUSDT') prices['BTC'] = parseFloat(pair.price)
					if (pair.symbol === 'ETHUSDT') prices['ETH'] = parseFloat(pair.price)
					if (pair.symbol === 'BTCETH')
						prices['BTC/ETH'] = parseFloat(pair.price)
				})
				setRates(prices)
			} catch (error) {
				console.error('Error fetching rates: ', error)
			}
		}

		fetchRates()
	}, [])

	useEffect(() => {
		let result: number | undefined

		if (fromCurrency === toCurrency) {
			result = amount
		} else if (fromCurrency === 'USDT') {
			const rate = rates[toCurrency]
			result = rate !== undefined && rate !== 0 ? amount / rate : undefined
		} else if (toCurrency === 'USDT') {
			const rate = rates[fromCurrency]
			result = rate !== undefined && rate !== 0 ? amount * rate : undefined
		} else {
			const rateFrom = rates[fromCurrency]
			const rateTo = rates[toCurrency]
			result =
				rateFrom !== undefined && rateTo !== undefined && rateTo !== 0
					? (amount * rateFrom) / rateTo
					: undefined
		}

		if (result !== undefined && !isNaN(result)) {
			setConvertedAmount(result)
		} else {
			setConvertedAmount(0)
		}
	}, [fromCurrency, toCurrency, amount, rates])

	const sparkles = useMemo(
		() => (
			<SparklesCore
				id='tsparticlesfullpage'
				background='transparent'
				minSize={0.6}
				maxSize={1.4}
				particleDensity={100}
				className='w-full h-full'
				particleColor='#FFFFFF'
			/>
		),
		[]
	)

	return (
		<div className='relative w-full h-full flex items-center justify-center'>
			<div className='absolute inset-0 z-10 pointer-events-none'>
				{sparkles}
			</div>

			<LampContainer>
				<motion.div
					className='relative z-20 w-full  bg-black text-white p-8 rounded-md shadow-lg max-w-lg space-y-8'
					initial={{ opacity: 0.5, y: 100 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: 'easeInOut',
					}}
				>
					<div className='flex flex-col items-center space-y-4 w-96'>
						<CurrencySelector
							label='From:'
							currency={fromCurrency}
							setCurrency={setFromCurrency}
						/>
						<AmountInput value={amount} setValue={setAmount} />

						<CurrencySelector
							label='To:'
							currency={toCurrency}
							setCurrency={setToCurrency}
						/>
						<ConvertedAmountInput value={convertedAmount} />
					</div>
				</motion.div>
			</LampContainer>
		</div>
	)
}

export default CryptoConverter
