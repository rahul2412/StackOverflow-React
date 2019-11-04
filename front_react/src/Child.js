import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

// Child component with parent- 'Data.js'
class Child extends React.Component {
  
    constructor(props){ 
     
     super(props);
     
     this.state={ answer:""}
     
     this.handleChange = this.handleChange.bind(this);
     this.submitIt=this.submitIt.bind(this);
   };

   submitIt(e)
   {
     e.preventDefault();
   }

   handleChange(e)
   {
     this.setState({answer:e.target.value});
   }
   
     render() {
         return (<form onSubmit={this.submitIt}><br/><input name="answer" required type="text" size="50" value={this.state.answer} onChange={this.handleChange} placeholder="type the answer "/><br/><br/>
         <Button variant="success" style={{marginBottom:"10px"}} type="submit" onClick={()=>{this.props.action(this.state.answer,this.props.id)}}>Answer</Button></form>
         )
     }
   }

   export default Child;