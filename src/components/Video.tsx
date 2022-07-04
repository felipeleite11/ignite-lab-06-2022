import { CaretRight, DiscordLogo, FileArrowDown, Lightning } from 'phosphor-react'
import { Link } from './Link'
import { gql, useQuery } from '@apollo/client'

import '@vime/core/themes/default.css'

interface VideoPros {
	lessonSlug: String
}

const GET_LESSON_QUERY = gql`
	query GetLessonBySlug($slug: String) {
		lesson(where: {slug: $slug}) {
			title
			videoId
			description
			teacher {
				name
				avatarURL
				bio
			}
		}
	}
`

interface GetLessonBySlugResponse {
	lesson: {
		title: string
		videoId: string
		description: string
		teacher: {
			name: string
			avatarURL: string
			bio: string
		}
	}
}

export function Video({ lessonSlug }: VideoPros) {
	const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_QUERY, {
		variables: { slug: lessonSlug }
	})

	if (!data) {
		return (
			<div className="flex-1">
				<h1>Carregando...</h1>
			</div>
		)
	}

	return (
		<div className="flex-1">
			<div className="bg-black flex justify-center">
				<div className="h-full w-full max-w-[62vw] aspect-video">
					<iframe
						src={`https://www.youtube.com/embed/${data.lesson.videoId}`}
						className="w-full min-h-full"
						title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				</div>
			</div>

			<div className="p-8 max-w-[1100px] mx-auto">
				<div className="flex items-start gap-16">
					<div className="flex-1">
						<h1 className="text-2xl font-bold">
							{data.lesson.title}
						</h1>

						<p className="mt-4 tezt-gray-200 leading-relaxed">
							{data.lesson.description}
						</p>

						<div className="flex items-center gap-4 mt-6">
							<img
								src={data.lesson.teacher.avatarURL}
								alt=""
								className="h-16 w-16 rounded-full border-2 border-blue-500"
							/>
							<div className="leading-relaxed">
								<strong className="font-bold text-2xl block">{data.lesson.teacher.name}</strong>

								<span className="text-gray-200 text-sm block">{data.lesson.teacher.bio}</span>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<Link to="#">
							<DiscordLogo size={24} />
							Comunidade do Discord
						</Link>

						<Link to="#" variant="accent">
							<Lightning size={24} />
							Acesse o desafio
						</Link>
					</div>
				</div>

				<div className="gap-8 mt-20 grid grid-cols-2">
					<a href="#" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-color">
						<div className="bg-green-700 h-full p-6 flex items-center">
							<FileArrowDown size={40} />
						</div>

						<div className="py-6 leading-relaxed">
							<strong className="text-2xl">Material complementar</strong>
							<p className="text-sm tezt-gray-200">
								Acesse o material complementar para acelerar o seu desenvolvimento
							</p>
						</div>

						<div className="h-full p-6 flex">
							<CaretRight size={24} />
						</div>
					</a>

					<a href="#" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-color">
						<div className="bg-green-700 h-full p-6 flex items-center">
							<FileArrowDown size={40} />
						</div>

						<div className="py-6 leading-relaxed">
							<strong className="text-2xl">Wallpapers exclusivos</strong>
							<p className="text-sm tezt-gray-200">
								Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
							</p>
						</div>

						<div className="h-full p-6 flex">
							<CaretRight size={24} />
						</div>
					</a>
				</div>
			</div>
		</div>
	)
}