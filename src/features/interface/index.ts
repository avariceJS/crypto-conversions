export interface AmountInputProps {
	value: number
	setValue: (value: number) => void
}

export interface ConvertedAmountInputProps {
	value: number
}

export interface CurrencySelectorProps {
	label: string
	currency: Currency
	setCurrency: (currency: Currency) => void
}

export type Currency = 'USDT' | 'BTC' | 'ETH'
