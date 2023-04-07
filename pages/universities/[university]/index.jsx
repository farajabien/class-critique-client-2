import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import {
	FaSearch,
	FaUniversity,
	FaUserGraduate,
	FaChalkboardTeacher,
} from 'react-icons/fa'
import CourseCard from '../../components/universities/CourseCard'
import SearchBar from '../../components/molecules/SearchBar'

export default function UniversityDetails() {
	const router = useRouter()
	const { id } = router.query

	const universities = useSelector((state) => state.uniReducer.unis)
	const selectedUniversity = universities.find((uni) => uni.id === Number(id))

	const [searchQuery, setSearchQuery] = useState('')

	useEffect(() => {
		if (!id || !selectedUniversity) {
			router.push('/')
		}
	}, [id, selectedUniversity, router])

	const handleSearch = (query) => {
		setSearchQuery(query)
	}

	// Filter courses by search query
	const filteredCourses = selectedUniversity?.courses.filter(
		(course) =>
			course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			course.code.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<div className='min-h-screen bg-gray-100'>
			<main className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='py-12 text-center'>
					<h1 className='text-5xl font-bold mb-4 text-teal-500'>
						{selectedUniversity?.name}
					</h1>
					<p className='text-xl text-center mb-8'>
						{selectedUniversity?.description}
					</p>
					<div className='my-8 flex justify-center'>
						<div className='w-full sm:w-1/2 md:w-1/3'>
							<SearchBar
								placeholder='Search for courses'
								searchIcon={<FaSearch className='h-6 w-6 m-auto' />}
								onChange={handleSearch}
								className='w-full'
							/>
							{searchQuery.length > 0 && (
								<p className='my-2 text-normal text-center'>
									{filteredCourses?.length} courses found.
								</p>
							)}
						</div>
					</div>
				</div>

				<div className='flex justify-evenly items-center flex-wrap'>
					<div className='p-8'>
						<div className='text-4xl text-teal-500 mb-2'>
							<FaUniversity />
						</div>
						<div className='text-lg text-gray-700 font-medium mb-2'>
							Location
						</div>
						<div className='text-gray-700 mb-2'>
							{selectedUniversity?.location}
						</div>
					</div>

					<div className='p-8'>
						<div className='text-4xl text-teal-500 mb-2'>
							<FaUserGraduate />
						</div>
						<div className='text-lg text-gray-700 font-medium mb-2'>
							Number of students
						</div>
						<div className='text-gray-700 mb-2'>
							{selectedUniversity?.numberOfStudents}
						</div>
					</div>

					<div className='p-8'>
						<div className='text-4xl text-teal-500 mb-2'>
							<FaChalkboardTeacher />
						</div>
						<div className='text-lg text-gray-700 font-medium mb-2'>
							Faculty
						</div>
						<div className='text-gray-700 mb-2'>
							{selectedUniversity?.faculty}
						</div>
					</div>
				</div>
				<h2 className='text-2xl font-bold mt-16 mb-4 text-teal-500'>Courses</h2>

				{filteredCourses?.length > 0 ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
						{filteredCourses.map((course) => (
							<CourseCard key={course.id} course={course} />
						))}
					</div>
				) : (
					<p className='text-lg text-center text-gray-700'>
						No courses found for your search query.
					</p>
				)}
			</main>
		</div>
	)
}
