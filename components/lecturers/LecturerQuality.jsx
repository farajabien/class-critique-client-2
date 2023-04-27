import { FaUsers } from 'react-icons/fa'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function LecturerQuality({ average, reviews }) {
	const numReviews = reviews.length

	const progressBarColor = '#26A69A'

	return (
		<div className='grid grid-cols-2 gap-6'>
			<div>
				<h3 className='text-lg font-medium mb-2'>Overall Quality</h3>
				<div className='w-48 h-48 mx-auto relative'>
					<CircularProgressbar
						value={average * 20}
						text={`${average}`}
						strokeWidth={10}
						styles={{
							root: {
								width: '100%',
								height: '100%',
							},
							path: {
								stroke: `${progressBarColor}`,
								strokeLinecap: 'round',
							},
							text: {
								fill: `${progressBarColor}`,
								fontSize: '24px',
								fontWeight: 'bold',
								textAnchor: 'middle',
								dy: '0.35em',
							},
							trail: {
								stroke: '#D9D9D9',
								strokeLinecap: 'round',
							},
							background: {
								fill: '#F5F5F5',
							},
						}}
					/>
					<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
						<div className='flex items-center'>
							<div className='text-teal-500 text-3xl mr-2 mt-16'>
								<FaUsers className='text-teal-500 mt-8' />
								<span className='text-gray-500 ml-1 text-normal '>
									{numReviews}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LecturerQuality
