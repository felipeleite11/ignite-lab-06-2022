import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames'

interface LessonProps {
	title: string
	slug: string
	availableAt: Date
	type: 'live' | 'class'
}

export function Lesson({ title, slug, availableAt, type }: LessonProps) {
	const { slug: slugParam } = useParams<{ slug: string }>()

	const isAvailable = isPast(availableAt)
	const availableAtFormattedDate = format(availableAt, "EEEE' • 'dd' de 'MMMM' • 'HH'h'mm", {
		locale: ptBR
	})
	const isCurrentLesson = slugParam === slug

	return (
		<Link to={isAvailable ? `/event/lesson/${slug}` : ''} className={classNames('group', {
			'cursor-not-allowed': !isAvailable,
			'cursor-pointer': isAvailable
		})}>
			<span className="text-gray-300">
				{availableAtFormattedDate}
			</span>

			<div className={classNames('rounded border border-gray-500 p-4 mt-2', {
				'group-hover:border-green-500 transition-colors': isAvailable,
				'bg-green-500': isCurrentLesson
			})}>
				<header className="flex items-center justify-between">
					{isAvailable ? (
						<span className={classNames('text-sm font-medium flex items-center gap-2', {
							'text-white': isCurrentLesson,
							'text-blue-500': !isCurrentLesson
						})}>
							<CheckCircle size={20} />
							Conteúdo liberado
						</span>
					) : (
						<span className="text-sm text-orange-500 font-medium flex items-center gap-2">
							<Lock size={20} />
							Em breve
						</span>
					)}

					<span className={classNames('text-xs rounded px-2 py-[0.125rem] text-white border font-bold', {
						'border-white': isCurrentLesson,
						'border-green-300': !isCurrentLesson
					})}>
						{type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
					</span>
				</header>

				<strong className={classNames('mt-5 block', {
					'text-white': isCurrentLesson,
					'text-gray-200': !isCurrentLesson
				})}>
					{title}
				</strong>
			</div>
		</Link>
	)
}