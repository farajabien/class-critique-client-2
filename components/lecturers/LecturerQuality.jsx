import { FaUsers } from 'react-icons/fa'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function LecturerQuality({ average }) {
	return (
		<div className='grid grid-cols-2 gap-6'>
			<div>
				<h3 className='text-lg font-medium mb-2'>
					Overall Lecturer Quality: {average.toFixed(1)}
				</h3>
				<div className='w-48 h-48 mx-auto relative'>
					<CircularProgressbar
						value={average * 10}
						text={`${average.toFixed(1)}`}
						strokeWidth={10}
						styles={{
							root: {
								width: '100%',
								height: '100%',
							},
							path: {
								stroke: '#26A69A',
								strokeLinecap: 'round',
							},
							text: {
								fill: '#26A69A',
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
							<FaUsers className='text-teal-500 text-3xl mr-2' />
							<div>
								<span className='font-bold text-2xl'>
									{Math.round(average * 10)}
								</span>
								<br />
								<span className='text-xs font-light'>Out of 100</span>
							</div>
						</div>
					</div>
				</div>
				<div className='mt-4'>
					<h4 className='text-gray-600 font-medium mb-2'>Attribute Ratings</h4>
					<div className='flex items-center mb-2'>
						<div className='w-6 h-6 rounded-full bg-gray-300 mr-2'></div>
						<div className='w-1/2'>
							<div className='bg-gray-100 rounded-full h-2'></div>
						</div>
						<div className='w-1/2 text-right text-gray-500 font-medium'>
							Communication
						</div>
					</div>
					<div className='flex items-center mb-2'>
						<div className='w-6 h-6 rounded-full bg-green-300 mr-2'></div>
						<div className='w-1/2'>
							<div className='bg-green-100 rounded-full h-2'></div>
						</div>
						<div className='w-1/2 text-right text-gray-500 font-medium'>
							Preparation
						</div>
					</div>
					<div className='flex items-center mb-2'>
						<div className='w-6 h-6 rounded-full bg-yellow-300 mr-2'></div>
						<div className='w-1/2'>
							<div className='bg-yellow-100 rounded-full h-2'></div>
						</div>
						<div className='w-1/2 text-right text-gray-500 font-medium'>
							Engagement
						</div>
					</div>
					<div className='flex items-center mb-2'>
						<div className='w-6 h-6 rounded-full bg-blue-300 mr-2'></div>
						<div className='w-1/2'>
							<div className='bg-blue-100 rounded-full h-2'></div>
						</div>
						<div className='w-1/2 text-right text-gray-500 font-medium'>
							Knowledge
						</div>
					</div>
					<div className='flex items-center mb-2'>
						<div className='w-6 h-6 rounded-full bg-purple-300 mr-2'></div>
						<div className='w-1/2'>
							<div className='bg-purple-100 rounded-full h-2'></div>
						</div>
						<div className='w-1/2 text-right text-gray-500 font-medium'>
							Organization
						</div>
					</div>
					<div className='flex items-center mb-2'>
						<div className='w-6 h-6 rounded-full bg-pink-300 mr-2'></div>
						<div className='w-1/2'>
							<div className='bg-pink-100 rounded-full h-2'></div>
						</div>
						<div className='w-1/2 text-right text-gray-500 font-medium'>
							Helpfulness
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
