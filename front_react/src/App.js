import React from 'react';
import Data from './data';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

class App extends React.Component

 { 
   constructor(props){ 
  
  super(props);
  this.state={
    loggedIn: "yes"}
    
  this.submitIt = this.submitIt.bind(this);
 }

        
       async submitIt(e){
            //e.preventDefault();  // Uncomment it  and change fetch url to check exceptional handling

             this.setState({loggedIn:"no"}); // would not matter when the state is set as "no" is passed in fetch below

            const response=await fetch('/api/post_status', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ loggedIn: "no" }), // "no" must be passed whenever we logout
            
            });

            //Error handling
            try{
            if (response.status !== 200)
            throw Error("There is an Error with Error code "+response.status);}

            catch(e){
            console.log(e); // Any other custom behavior can be set
            }
          
        } 


   render(){
  return (
    <div style={{backgroundColor:"lightBlue"}}>
     
   <h1 style={{fontFamily:"Serif",fontStyle:"italic",fontSize:"48px",textAlign:"center"}}> My Stack</h1>
   
   <form style={{textAlign:"center",padding:"2%"}} onSubmit={this.submitIt}>
   <Button style={{marginRight:"40px", float:"right"}} variant="success" type="submit">Logout</Button><br/>
   </form>

   <hr style={{border:"1px solid black"}}/>
   
   <Data/>
  </div>);
   }
}

export default App;

