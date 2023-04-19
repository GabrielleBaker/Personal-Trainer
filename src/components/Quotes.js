import { useEffect,useState } from "react";

export default function Quotes(){

  const [quote,setQuote]= useState("");
  const[author,setAuthor]=useState("");


  //http://api.quotable.io/random
 
  useEffect(()=>{
    fetch("http://api.quotable.io/random")
    .then(response=>response.json())
    .then(
      (quote=>{
        setQuote(quote.content);
        setAuthor(quote.author);
       // console.log(quote)
      })
    )
  },[]);
  

  return(
    <div>
      <strong>{quote}</strong><p>{author}</p>
    </div>
  )
}