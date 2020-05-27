import React from 'react';
import footer from '../../styles/footer.module.scss';

function Footer() {

    return ( 
        <footer className={footer.container}>
            <div>
                <h3>bageriet</h3>
                <p>Der er mange versioner af lorem ipsum men denne version er min. Man må selv vælge.</p>
                <div className={footer.innerContainer}>
                    <p>Copyright 2017 bageriet aps.</p>
                </div>
                <div className={footer.bottom}></div>
            </div>
        </footer>
    )
}

export default Footer