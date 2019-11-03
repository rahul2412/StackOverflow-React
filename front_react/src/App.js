import React from 'react';
import Data from './data';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

class App extends React.Component
 { constructor(props){ 
  
  super(props);
  this.state={
    loggedIn: "yes"
  }
  this.submitIt = this.submitIt.bind(this);
 }

        
       async submitIt(e){
            //e.preventDefault();
             this.setState({loggedIn:"no"});
            fetch('/api/post_status', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ loggedIn: this.state.loggedIn }),
            
            });
          

            
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

