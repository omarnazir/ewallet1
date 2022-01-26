import React, {Component} from 'react';

class Footer extends Component {

    render() {
        const year = new Date().getFullYear()
        return (
            <footer className="footer-container">
                <span text="align-center">&copy; {year} - M-KULIMA PLATFORM</span>
            </footer>
        );
    }

}

export default Footer;
