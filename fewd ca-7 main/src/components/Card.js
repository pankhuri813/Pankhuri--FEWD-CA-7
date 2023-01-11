import axios from 'axios';
import { useState, useEffect } from 'react';
import "./card.css"

function Card() {
// using useState hook
    const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoadig] = useState(false)

  // getting name from sesssionStorage if anyone registers
  const name = sessionStorage.getItem('name')
  
  // data fetching from api and storing it in data array
  useEffect(()=>{

    const apiCall = async ()=>{
      setLoadig(true);

       const res = await axios.get('https://reactnd-books-api.udacity.com/books',
    { headers: { 'Authorization': 'whatever-you-want' },
  })

setData(res.data.books)

      setLoadig(false);
      
    
    

    }
    apiCall();
   
    
  },[])

  // function for handling onChange event in input bar 
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  // setting variable which stores filters data according to search
 const bookData = data.filter((e) => {
  const searchedTerm = value.toLocaleLowerCase().trim();
  const fullName = e.title.toLocaleLowerCase();
        return (
          
          fullName.includes(searchedTerm) || fullName.startsWith(searchedTerm) &&
          fullName !== searchedTerm
         
        );
        
      })
      console.log(bookData)

  return (
    <div className='book-comtainer'>
          <h1 id='search'>Hello {name}! <br></br>Get the books you want from here!</h1>
       <div className = "search-box">
      
        
          <input type = "text" className = "search-control" placeholder="Enter Book Name..." id = "search-input" onChange={handleChange}/>
          
          
         
        </div>
        {loading ?(<h1>Loading...</h1>)
        :<div></div>
        }
        
      {/* if length of the bookdata array is 0 then h1 will be dislayed  */}
      {bookData.length === 0 && !loading?

      <div className='notFound'>
      <h1 >Sorry! We are unable to find any book related to your search.</h1>
      </div>
      :(
        <div id='book'>
          {/* if bookData is not empty then map function wll work */}
           { bookData.map((item)=>{
             return(

          <div key={item.id} className="book-item">
             <div className='book-img'>
            <img src={item.imageLinks.smallThumbnail}alt=""/>
            </div>
            
            <div className='book-name'>
            <h4>{item.title}</h4>
            </div>
            <div className='rating-price'>
            <h3>{item.averageRating}⭐</h3>
            <h4>Free</h4>
            </div> 
          </div>
          )
        }
        )
        }
        </div>
        )          
        }
        </div>
        )
      }


export default Card