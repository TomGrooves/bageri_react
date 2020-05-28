import React, {useState, useEffect} from 'react';
import singleproduct from '../../styles/singleproduct.module.scss'
import backupImg from '../../Billeder/brod/article.jpg'

function SingleProductPage(props) {

    const [comment, updateComment] = useState("");
    const [commentTitle, updateCommentTitle] = useState("")
    const [commentData, setCommentData] = useState([])

    console.log(props.singleData)
    let id = props.singleData.id
    
    useEffect(() => {
        if (props.sessionToken && props.singleData){
            
            console.log("sessiontoken is " + props.sessionToken.access_token)
            let url=`https://api.mediehuset.net/bakeonline/comments/${id}`
            fetch(url,{
                headers: {
                'Authorization': `Bearer ${props.sessionToken.access_token}`, 
              }, 
            })
            .then(response => response.json())
            .then(json => setCommentData(json))
            .catch(error => console.log(error))
        }
    }, [id])
    
    console.log(commentData)

    const sendComment = (e) =>{
        e.preventDefault()
        let url= `https://api.mediehuset.net/bakeonline/comments`
      
        if (comment && props.sessionToken && props.singleData && commentTitle){
    
          let commentData = new FormData()
          let active = true;
        
          commentData.append('user_id', props.sessionToken.user_id)
          commentData.append('product_id', props.singleData.id)
          commentData.append('active', active)
          commentData.append('comment', comment)
          commentData.append('title', commentTitle)
        
          console.log("user_id is : " + props.sessionToken.user_id)
          console.log("product_id is : " + props.singleData.id)
          console.log("comment is : " + comment)
          console.log("commentTitle is : " + commentTitle)

          fetch(url,{
            method: "post",
            headers: {
                'Authorization': `Bearer ${props.sessionToken.access_token}`
            }, 
            body: commentData,
        })
            .then(response => console.log(response))
            .catch(error => console.log(error))
            }
            else{
              console.log("There was an error")
            }
            let commenturl=`https://api.mediehuset.net/bakeonline/comments/${id}`
            fetch(commenturl,{
                headers: {
                'Authorization': `Bearer ${props.sessionToken.access_token}`, 
              }, 
            })
            .then(response => response.json())
            .then(json => setCommentData(json))
            .catch(error => console.log(error))
        
      }

    let image;
    if (props.singleData.image){
        image = props.singleData.image.fullpath
    }
    else{
        image = backupImg
    }
    return (
        <>
        <section className={singleproduct.innerNav}>
    <h4>PRODUKTER ></h4> <h3>{props.catData.title}</h3>
        </section>
        <section className={singleproduct.headline}>
                <h2>{props.catData.title}</h2>
                <h4>{props.singleData.title}</h4>
        </section>
        <div className={singleproduct.mainContainer}>
            <section className={singleproduct.contentGrid}>
                <img alt={props.singleData.title} src={image}></img>
                {props.singleData.title ? 
                <p>{props.singleData.description}</p>
                    : <p>Gå tilbage til start for at vælge et produkt</p>
                }
            </section>

            <section className={singleproduct.ingredients}>
                <h4>Ingredienser</h4>
                { props.singleData.ingredients && props.singleData.ingredients.map((item) => {
                    return <div><p>{item.amount} {item.unit_name}, {item.ingredient_title}</p></div>
                })}
            </section>

        <section className={singleproduct.commentSection}>
        {props.sessionToken ?
            <div >
              <form>
                <input placeholder={"Titel.."} value={commentTitle} onChange={(event) => {updateCommentTitle(event.target.value)}}></input>
                <input placeholder={"Fortæl os hvad du syntes.."} value={comment} onChange={(event) => {updateComment(event.target.value)}}></input>
                <button onClick={(event) => sendComment(event)}>INDSÆT</button>
              </form>
              </div>
               :<div><p>Log ind for at kommentere</p></div>}
        </section>

        <section className={singleproduct.commentSection}>
            {commentData.posts ? commentData.posts.map((item) =>{
                return (
                    <div className={singleproduct.comment}>
                        <h3>{item.title}</h3>
                        <p>{item.comment}</p>
                        <p>Skrevet af: {item.user_id}</p>
                    </div>
                )
            }): <div>Ingen kommentarer endnu</div>}
        </section>
        
        </div>
        </>
    )
}

export default SingleProductPage