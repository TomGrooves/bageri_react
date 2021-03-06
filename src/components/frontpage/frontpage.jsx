import React from 'react';
import Carousel from 'react-material-ui-carousel';
import front from '../../styles/front.module.scss';

import roundimg1 from '../../Billeder/brod/article.jpg'
import roundimg2 from '../../Billeder/brod/article2.jpg'
import roundimg3 from '../../Billeder/brod/article3.jpg'

import bannerimg1 from '../../Billeder/slide1.jpg'
import bannerimg2 from '../../Billeder/slide2.jpg'
import bannerimg3 from '../../Billeder/slide3.jpg'


import {
    Link
} from 'react-router-dom';



function Frontpage (props) {

    var newItems = [
        {url1: bannerimg1},
        {url1:bannerimg2},
        {url1: bannerimg3}
    ] 

    function FrontPageHeader(){
        return(
            <>
                <Carousel animation="fade" interval="5000">
                    {
                        newItems.map((item, index) => {
                        return( 
                            <div key={index}>
                                <h3 className={front.headertext}>Vi elsker at lave brød</h3>
                                <Item item={item}/>
                            </div>
                        )
                    })
                    }
                </Carousel>
            </>
        )
    }

    function MiddleSection() {
        return (
            <div className={front.midsection}>
                <h4>Vi skaber lækkert brød</h4>
                <p>Lorem ipsum har mange variationer. Nogle er sjove og andre er mindre sjove. Det vigtige er at der er noget fyldtext.. Lorem ipsum har mange variationer. Nogle er sjove og andre er mindre sjove. Det vigtige er at der er noget fyldtext.</p>
                    <div className={front.gridContainer}>
                        <div className={front.container}>
                        <img alt={`kreativitet`} src={roundimg1}></img>
                        <h5>KREATIVITET DYRKES</h5>
                        <p>Lorem ipsum har mange variationer. Nogle er sjove og andre er mindre sjove...</p>
                        </div>
                        <div className={front.container}>
                        <img alt={`elskerbrød`} src={roundimg2}></img>
                        <h5>VI ELSKER BRØD</h5>
                        <p>Lorem ipsum har mange variationer. Nogle er sjove og andre er mindre sjove...</p>
                        </div>
                        <div className={front.container}>
                        <img alt={`sansfordetalje`} src={roundimg3}></img>
                        <h5>SANS FOR DETALJER</h5>
                        <p>Lorem ipsum har mange variationer. Nogle er sjove og andre er mindre sjove...</p>
                        </div>
                    </div>
            
            </div>
        )
    }


    function NewsLetter() {
        return (
        <div className={front.signup}>
            <section>
                <h3>Tilmeld dig vores nyhedsbrev</h3>
                <p> Lorem ipsum har mange variationer..</p>
            <form>
                <input placeholder="Email"></input>
                <button>TILMELD</button>
            </form>
            </section>
        </div>
        )
    }


    function LatestProducts() {
        return (
            <div className={front.products}>
                
            <h3>Nyeste bagværk</h3>
            
            <div className={front.gridContainer}>
                {props.data.categories[0].products.map((item, index) => {
                    if (index < 8) {
                    return (
                    <div key={index+"latest"} className={front.gridItem}>
                        <img alt={item.title} src={item.image.fullpath}></img>
                        <h5 key={index}>{item.title.substring(0, 28).toUpperCase()}</h5>
                            <p>{item.teaser.substring(0, 50)}..</p>
                            <Link to="/displayproduct">
                                <button onClick={()=>{props.HandleSelectedItem(item.id)}}>SE MERE</button>
                            </Link>
                    </div>)
                    }
                })}
            </div>
            </div>
        )
    }

    return (
        <div className={front.mainContainer}>
            <FrontPageHeader/>
            <MiddleSection/>
            <NewsLetter/>
            <LatestProducts/>
        </div>
    )
}

function Item(props){
    return (
        <div className={front.carousel} style={{Height:"65vh"}}>
                <img alt={`featured${props.key}`} width="100%" src={props.item.url1} />
        </div>
    )
}

export default Frontpage