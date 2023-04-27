import React from 'react'
import { FaSpinner } from 'react-icons/fa'
import { css } from '@emotion/react'

const loadingStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
`

function LoadingScreen() {
	return (
		<div css={loadingStyles}>
			<FaSpinner className='animate-spin text-teal-500 text-6xl' />
		</div>
	)
}

export default LoadingScreen
