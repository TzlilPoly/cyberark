import './App.css';
import {useEffect, useState} from "react";

function App() {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const route = "https://mystoreapi.com/catalog/categories";
                const response = await fetch(route);
                const data = await response.json();
                setCategories(data.categories);
            } catch (err) {
                console.log(err);
            }
        }
        getCategories();
    }, []);

    async function getProducts(categoryName) {
        try {
            const route = `https://mystoreapi.com/catalog/category/${categoryName}/products`;
            const response = await fetch(route);
            const data = await response.json();
          console.log(data.products,'products')

          setProducts(data.products.map(p=>p.name))
        } catch (err) {
            console.log(err);
        }
    }

  console.log(products);
    return (
        <div className="App">
            <ul>
                {categories?.map((item) => {
                    const {category} = item;
                    return (
                        <div key={category}>
                        <li>
                            <button onClick={() => getProducts(category)}>
                                {category}
                            </button>
                        </li>

                  </div>
                )
                })
                }
            </ul>
          <div style={{position:"fixed"}}>
          {products?.map((item) => {
            return (<div style={{color:'red',backgroundColor:'yellow', width:100,display:"flex",flexDirection:"column" }}>{item}</div>)
          })}
          </div>
        </div>
    );
}

export default App;
