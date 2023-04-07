function StatsCard({ icon, label, value }) {
	return (
		<div className='bg-white rounded-lg shadow-md flex items-center justify-between p-8 mb-5 mx-2'>
			<div className='text-teal-500 text-5xl my-4 mx-3'>{icon}</div>
			<div className='text-right'>
				<div className='text-gray-600 text-base ml-5'>{label}</div>
				<div className='text-gray-900 font-extrabold text-4xl m-2'>{value}</div>
			</div>
		</div>
	)
}

export default StatsCard
