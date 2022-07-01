import { ReactNode } from "react"

interface LinkProps {
	variant?: 'primary' | 'accent'
	to: string
	children: ReactNode
}

export function Link({ variant = 'primary', to = "#", children }: LinkProps) {
	const twClasses = variant === 'primary'
		? 'p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors'
		: 'p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors'

	return (
		<a href={to} className={twClasses}>
			{children}
		</a>
	)
}