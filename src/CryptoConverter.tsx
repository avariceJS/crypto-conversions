import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useEffect, useMemo, useState } from 'react'
import { FaBitcoin, FaEthereum } from 'react-icons/fa'
import { SiTether } from 'react-icons/si'
import { LampContainer } from './components/ui/lamp'
import { SparklesCore } from './components/ui/sparkles'

type Currency = 'USDT' | 'BTC' | 'ETH'

interface Rates {
	[key: string]: number
}

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
		if (fromCurrency === toCurrency) {
			setConvertedAmount(amount)
		} else if (fromCurrency === 'USDT') {
			setConvertedAmount(amount / rates[toCurrency])
		} else if (toCurrency === 'USDT') {
			setConvertedAmount(amount * rates[fromCurrency])
		} else {
			const intermediate = amount * rates[fromCurrency]
			setConvertedAmount(intermediate / rates[toCurrency])
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
					className='relative z-20 w-full bg-black text-white p-8 rounded-md shadow-lg max-w-lg space-y-8'
					initial={{ opacity: 0.5, y: 100 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: 'easeInOut',
					}}
				>
					<div className='flex flex-col items-center space-y-4 w-96'>
						<label className='text-lg font-semibold'>From:</label>
						<div className='flex items-center space-x-2'>
							{fromCurrency === 'USDT' && (
								<SiTether className='text-green-500' />
							)}
							{fromCurrency === 'BTC' && (
								<FaBitcoin className='text-yellow-500' />
							)}
							{fromCurrency === 'ETH' && (
								<FaEthereum className='text-blue-500' />
							)}
							<select
								value={fromCurrency}
								onChange={e => setFromCurrency(e.target.value as Currency)}
								className='bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400'
							>
								<option value='USDT'>USDT</option>
								<option value='BTC'>BTC</option>
								<option value='ETH'>ETH</option>
							</select>
						</div>
						<input
							type='number'
							value={amount}
							onChange={e => setAmount(parseFloat(e.target.value))}
							className='bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400'
						/>
					</div>
					<div className='flex flex-col items-center space-y-4'>
						<label className='text-lg font-semibold'>To:</label>
						<div className='flex items-center space-x-2'>
							{toCurrency === 'USDT' && <SiTether className='text-green-500' />}
							{toCurrency === 'BTC' && (
								<FaBitcoin className='text-yellow-500' />
							)}
							{toCurrency === 'ETH' && <FaEthereum className='text-blue-500' />}
							<select
								value={toCurrency}
								onChange={e => setToCurrency(e.target.value as Currency)}
								className='bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400'
							>
								<option value='USDT'>USDT</option>
								<option value='BTC'>BTC</option>
								<option value='ETH'>ETH</option>
							</select>
						</div>
						<input
							type='number'
							value={convertedAmount}
							readOnly
							className='bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400'
						/>
					</div>
				</motion.div>
			</LampContainer>
		</div>
	)
}

export default CryptoConverter
