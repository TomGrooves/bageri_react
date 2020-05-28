import React, {useEffect} from 'react'
import product from '../../styles/products.module.scss';
import {
    Link
} from 'react-router-dom';



function ProductPage (props) {

    useEffect(() => {
            props.HandleSelectedCategory("1")
    }, [])

    return (
        <>
        <section className={product.topText}>
            <h3>Vores elskede bagværk</h3>
            <p>Lorem ipsum har mange variationer. Nogle er sjove og andre er mindre sjove. Det vigtige er at der er noget fyldtext.. Lorem ipsum har mange variationer.</p>
        </section>

        <section className={product.contentContainer}>
        <div className={product.navigation}>
        {props.data.categories && props.data.categories.map((item)=>{
            return <p className={props.active === item.id ? product.active : ""} onClick={()=>{props.HandleSelectedCategory(item.id)}}>{item.title.toUpperCase()}</p>})}
        </div>
        
        <div className={product.productContent}>
        {props.catData.products && !props.singleData && props.catData.products.products.map((item, index) => {
            return (
        <div className={product.gridItem}>
            <div className={product.productImage} style={{backgroundImage: `url(${item.image.fullpath})`}}/>
            <h4>{item.title.substring(0, 30)}</h4>
            <p>{item.teaser.substring(0, 60)+ "..."}</p>
            <Link to="/displayproduct">
                <button onClick={()=>{props.HandleSelectedItem(item.product_id)}}>Se mere</button>
            </Link>
        </div>)
        })}
        </div>
        </section>
      </>)

}

export default ProductPage