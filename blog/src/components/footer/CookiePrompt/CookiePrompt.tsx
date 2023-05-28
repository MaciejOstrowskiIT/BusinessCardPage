import {useState} from "react";
import './CookiePrompt.css'

const CookiePrompt: React.FC = () => {

    const [showPrompt, setShowPrompt] = useState(true)

    const acceptCookies = () => {

    localStorage.setItem('cookiesAccepted', 'true');
    setShowPrompt(false)
    }

    const rejectCookies = () => {
        localStorage.setItem('cookiesAccepted', 'false')
        setShowPrompt(false)
    }

    const cookiesAccepted  = localStorage.getItem('cookiesAccepted')

    if (!showPrompt || cookiesAccepted){
        return null
    }

    return (
        <div className={"cookie-prompt"}>Ta strona używa plików cookie. Zaakceptuj, aby kontynuować
        <button onClick={acceptCookies}>Zaakceptuj</button>
        <button onClick={rejectCookies}>Odrzuć</button>
        </div>
    )
}
export default CookiePrompt
