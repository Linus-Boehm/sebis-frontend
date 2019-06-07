import '../../assets/css/bulma.scss';

import Link from 'next/link'

export default ({children}) => {
    const toggleStyles = (event) => {
        document.querySelector('#burger').classList.toggle('is-active')
        document.querySelector('#navbarmenu').classList.toggle('is-active')
    }

    return (
        <div>
            <header>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item">
                            <img src="/static/logo.png"/>
                        </a>
                        <a id="burger" onClick={toggleStyles}
                           role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarmenu">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div id="navbarmenu" className="navbar-menu">
                        <div className="navbar-start">
                            <Link prefetch href="/">
                                <a className="navbar-item">Home</a>
                            </Link>
                            <Link prefetch href="/elsewhere">
                                <a className="navbar-item">Elsewhere</a>
                            </Link>
                        </div>
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <a onClick={() => alert('You clicked the button!')} className="button is-primary">Click</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="section">
                {children}
            </div>
            <footer className="footer">
                <div className="content has-text-centered">
                    <span> I'm the footer</span>
                </div>
            </footer>
        </div>
    );

}
