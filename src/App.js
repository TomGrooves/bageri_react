import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route,} from 'react-router-dom';

// Imports
import Frontpage from './components/frontpage/frontpage';
import Nav from './components/navbar/nav';
import Footer from './components/footer/footer';
import ProductPage from './components/products/productPage';
import SingleProductPage from './components/products/singleProdcut';
import Login from './components/login/login';
import ContactPage from './components/contact/contactPage'

function App() {

  //ComponentDidMount
  useEffect(() => {
    let url = "https://api.mediehuset.net/bakeonline/"
    fetch(url)
          .then(response => response.json())
          .then(json => setAllData(json))
          .catch(error => console.log(error))
  
            if (sessionStorage.getItem('sessKey')){
              setSessionToken(JSON.parse(sessionStorage.getItem('sessKey')))
            }
        }, [])

  //Set States
  const [allData, setAllData] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const [catData, setCatData] = useState([]);
  const [sessionToken, setSessionToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState();

  //Set Category handler function
const HandleSelectedCategory = (target) => {
  setSingleData("")
  let url = `https://api.mediehuset.net/bakeonline/categories/${target}`
  fetch(url)
          .then(response => response.json())
          .then(json => setCatData(json))
          .catch(error => console.log(error))

  setActive(target)
}

//Set selected item handler function
const HandleSelectedItem = (target) => {
  let url = `https://api.mediehuset.net/bakeonline/products/${target}`
  fetch(url)
        .then(response => response.json())
        .then(json => setSingleData(json))
        .catch(error => console.log(error))
}

const validateEmail = (mail) =>  
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){

        return (true)
    }
    else
    return (false)
}


if (allData.categories && allData.news && loading){
  setLoading(false);
}
  
  return (

  <Router>
    <Nav
    HandleSelectedItem={HandleSelectedItem}
    data={allData}
    ></Nav>
      <Switch>
          <Route path="/products">
            <ProductPage
              active={active}
              data={allData}
              singleData={singleData}
              catData={catData}
              HandleSelectedCategory={HandleSelectedCategory}
              HandleSelectedItem={HandleSelectedItem}
            ></ProductPage>
          </Route>
          
          <Route path={`/displayproduct`}>
            <SingleProductPage
              singleData={singleData}
              catData={catData}
              sessionToken={sessionToken}
            ></SingleProductPage>
          </Route>

          <Route path={'/contact'}>
            <ContactPage
            validateEmail={validateEmail}
            ></ContactPage>
          </Route>

          <Route path="/login">
            <Login
              sessionToken={sessionToken}
              setSessionToken={setSessionToken}
            >
            </Login>
          </Route>

          <Route path="/">
              {!loading ? 
              <Frontpage 
                data={allData}
                HandleSelectedItem={HandleSelectedItem}
              ></Frontpage>
              : "loading"}
          </Route>
    </Switch>
  <Footer/>
</Router>

  )
}

export default App;
