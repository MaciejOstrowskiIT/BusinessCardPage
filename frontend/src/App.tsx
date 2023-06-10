import reactLogo from "./assets/react.svg";
import Nav from "./components/nav/Nav.tsx";
import "./App.css";
import CookiePrompt from "./components/footer/CookiePrompt/CookiePrompt.tsx";
import Background from "./components/Background/Background.tsx";


function App() {


    const loremQuote = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid delectus iste maxime" +
        "obcaecati officia sed ullam voluptas? Accusantium esse itaque odio totam vitae! Aperiam beatae" +
        "mollitia quo repudiandae sapiente ";

    const quoteElements: JSX.Element[] = Array(50).fill(loremQuote).map((quote, index) => (
        <p key={index}>{quote}</p>
    ));


    return (
        <>
            <div>
                <Background>
                    <Nav/>
                    <img src={reactLogo} width="120" alt=""/>
                    {quoteElements}
                    <CookiePrompt/>
                </Background>
            </div>
        </>
    );
}

export default App;
