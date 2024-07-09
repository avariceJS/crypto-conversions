// Base
import React from 'react'
import ReactDOM from 'react-dom/client'

// App
import App from '@/App.tsx'

// Styles
import '@/shared/styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
