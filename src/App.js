import React from 'react';
import Products from './features/products/Products';
import './App.scss';

function App() {

    return (
        <div className="App">
            <header id="header">
                <div className="centralContainer">
                    <h1 className="sr-only">Modern Milkman</h1>
                    <img className="modernMilkmanLogo" src="https://themodernmilkman.co.uk/img/images/MM Logo.svg" alt="Modern Milkman Logo" width="200" height="76"></img>
                </div>
            </header>
            <Products />
            <button
                className="backToTopBtn"
                onClick={() => {
                    document.documentElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }}
            >
                ☝
            </button>
            <footer className="footer">
                <p>
                <span>© 2021 The Modern Milkman</span>
                <span><a href="https://themodernmilkman.co.uk/termsAndConditions">Terms &amp; Conditions</a></span>
                <span><a href="https://themodernmilkman.co.uk/privacyPolicy">Privacy</a></span>
                </p>
            </footer>
        </div>
    );
}

export default App;