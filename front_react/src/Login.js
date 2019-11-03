import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import logo from './logo192.png'
import App from './App';

class Login extends React.Component 
 { 
    constructor(props){ 
  
        super(props);
        
        this.state={ username:"", flag:1}
      
        
        this.submitIt = this.submitIt.bind(this);
        this.handleUname = this.handleUname.bind(this)
       
        
        }

        componentDidMount() {
          this.callApi()
            .then(res => this.setState({ flag: res.flag}))
            .catch(err => console.log(err));
        }
        
        callApi = async () => {
          const response = await fetch('/api/get_status');
          const body = await response.json();
          if (response.status !== 200) throw Error(body.message);
          
          return body;
        };

       async submitIt(e){
            e.preventDefault();
           
            fetch('/api/post_name', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username: this.state.username }),
            
            });
           this.setState({flag:0});

            
        } 

        handleUname(e){
  
            this.setState({username:e.target.value});
            
            }
    render(){
   const myStyle={

    textAlign:"center",
    border: "1px solid #BFBFBF", 
    height: "78vh",
    marginLeft:"37%",
    width:"25%",
    backgroundColor: "white",
    boxShadow:"5px 10px 20px red inset"
   }

      
    return (
      <div>
    {this.state.flag ===1 ?(
      
        <form style={myStyle} onSubmit={this.submitIt}>
            
      <h2 style={{paddingTop:"13px"}}>My Stack</h2>
      <hr style={{color:"black", border:"1px solid"}}/>
            <img src={logo} alt="React logo"/>
            <div style={{paddingTop:"3%"}}>
        <input  name="id" type="text" required value={this.state.username} onChange={this.handleUname} placeholder="Enter username..."></input><br/>
       <Button style={{margin:"25px"}} variant="success" type="submit">Login</Button>
        </div>
    </form>
    ):(<App/>)}
    </div>
    
   
    )
}}

export default Login;

