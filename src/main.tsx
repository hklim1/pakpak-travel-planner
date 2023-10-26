// complete

// ,mostly the entrypoint. imports react, reactdom, etc. app.tsx is where we build out most of hte application. main.tsx contains our css

import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
// npm i bootstrap react-bootstrap (run this in order to do the import above)

import App from './App.tsx'
import './styles.css'
import UserProvider from './contexts/UserProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render( //this grabs an html node to plug everything into
  // <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  // </React.StrictMode>,
)
