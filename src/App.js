import { useState } from 'react'
import { SketchPicker } from 'react-color'
import './App.css'
import LightBulb from './lightbulb'
import API from 'aws-amplify'

function App() {
	const [bulbColor, setBulbColor] = useState('#FFD517')
	const [color, setColor] = useState('#FFD517')

	const handleColorChange = (color) => {
		setColor(color.hex)
	}

	const handleButtonClick = async () => {
		setBulbColor(color)
		await API.post('lightshow', '/update-light', {
			body: { color },
		})
	}

	return (
		<div className="App">
			<header className="App-header">
				<MainContainer>
					<LightBulb bulbColor={bulbColor} />
					<SketchPicker color={color} onChange={handleColorChange} />
				</MainContainer>
				<button className="button" onClick={handleButtonClick}>
					Change Light
				</button>
			</header>
		</div>
	)
}
const MainContainer = ({ children }) => (
	<div
		style={{
			width: '100vw',
			display: 'flex',
			justifyContent: 'center',
		}}
	>
		{children}
	</div>
)

export default App
