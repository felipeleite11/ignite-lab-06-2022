import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { Logo } from '../components/Logo'

import { useCreateSubscriberMutation } from '../graphql/generated'

export function Subscribe() {
	const navigate = useNavigate()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')

	const [createSubscriber, { loading }] = useCreateSubscriberMutation()

	async function handleSubmit(e: FormEvent) {
		e.preventDefault()

		try {
			await createSubscriber({
				variables: {
					name,
					email
				}
			})

			navigate('/event')
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div className="min-h-fit bg-blur bg-cover bg-no-repeat flex flex-col items-center">
			<div className="w-full max-w-[1100px] flex items-center justify-between mt-20">
				<div className="max-w-[640px]">
					<Logo />

					<h1 className="mt-8 text-[2.5rem] leading-tight">
						Construa uma <strong className="text-blue-500">aplicação completa,</strong> do zero, com <strong className="text-blue-500">React</strong>
					</h1>

					<p className="mt-4 text-gray-200 leading-relax">
						Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
					</p>
				</div>

				<div className="p-8 bg-gray-700 border border-gray-500 rounded">
					<strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>

					<form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
						<input
							type="text"
							placeholder="Seu nome completo"
							className="px-5 bg-gray-900 rounded h-14"
							onChange={e => { setName(e.target.value) }}
						/>
						<input
							type="email"
							placeholder="Digite seu e-mail"
							className="px-5 bg-gray-900 rounded h-14"
							onChange={e => { setEmail(e.target.value) }}
						/>

						<button
							type="submit"
							disabled={loading}
							className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
						>
							Garantir minha vaga
						</button>
					</form>
				</div>
			</div>

			<img src="/code-mockup.png" alt="" className="mt-[-2rem]" />
		</div>
	)
}