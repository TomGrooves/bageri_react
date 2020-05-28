import React, {useState} from 'react';
import navstyle from '../../styles/nav.module.scss'
//Routing
import {
    Link
} from 'react-router-dom';


function Nav (props) {


    let searchRes = [];

    const [searchText, setSearchText] = useState("");
    const [searchVisible, setSearchVisible] = useState(false);

    const HandleOpenSearch = () => {
        setSearchVisible(true);
    }

    const HandleCloseSearch = ()=> {
            setTimeout(() => {
                searchRes = [];
                setSearchVisible(false);
                setSearchText("");
            }, 100);
    }

    if (searchText){
        console.log(searchRes)
    // For each category
    // For each product in category
    // return whatever

        props.data.categories.map((item) => {    
           searchRes = item.products.map((product, index) => {
                if(searchText.length > 0 && product.title.toLowerCase().includes(searchText.toLowerCase() )){
                    return(
                    <div key={index} className={navstyle.searchitem} onClick={() => {props.HandleSelectedItem(`${product.id}`)}}>
                        <Link to={`/displayproduct`}>{product.title}</Link>
                    </div>
                    )
                }
            })
        })
    }

    return (
        <nav>
            <div className={navstyle.navbar}>
                <Link to="/">
                    <p>FORSIDE</p>
                </Link>
                <Link to="/products">
                    <p>PRODUKTER</p>
                </Link>
                    <p onClick={() => {HandleOpenSearch()}}>bageriet</p>
                    <div onMouseLeave={()=>{HandleCloseSearch()}} className={searchVisible ? navstyle.searchContainer : navstyle.hidden}>
                            <input placeholder="Find bagværk.." value={searchText} className={navstyle.searchBar} onChange={(event)=>{setSearchText(event.target.value)}}></input>
                            <div className={navstyle.searchResults}>
                           {searchRes}
                        </div>
                    </div>
                
                <Link to="/contact">
                    <p>KONTAKT</p>
                </Link>
                <Link to="/login">
                    <p>LOGIN</p>
                </Link>
            </div>
        </nav>
    )
}

export default Nav