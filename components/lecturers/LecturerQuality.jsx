import { FaUsers } from 'react-icons/fa'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function LecturerQuality({}) {
	const average = 4.5
	return (
		<div className='grid grid-cols-2 gap-6'>
			<div>
				<h3 className='text-lg font-medium mb-2'>
					Overall: {average.toFixed(1)}
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
							<FaUsers className='text-teal-500 text-3xl mr-2 mt-16' />
							<div></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LecturerQuality
