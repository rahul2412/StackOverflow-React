import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class Data extends React.Component {

  constructor(props){ 
  
  super(props);
  
  this.state={ question_new:"", user:"",
  data: [{id:"samir101", question: "what are advantages of react?",answers:[]},
  {id:"ravi12", question: "what is server?",answers:[]},
  {id:"rahull6", question: "when was Ruby on rails invernted?",answers:[]},
  {id:"raghav002", question: "Full form of IOT is-",answers:[]},
  {id:"vidhu325", question: "Who created Golang?",answers:[]}
  
]};
  
  this.removeIt = this.removeIt.bind(this);
  this.updateIt = this.updateIt.bind(this);
  this.createIt = this.createIt.bind(this);
  this.answerIt = this.answerIt.bind(this);
  
  this.handleChangequestion = this.handleChangequestion.bind(this);
  
  }


  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ user: res.user}))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/get_name');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
  // Deleting question
  async removeIt(id, ques) {
  
  //console.log("question deleted");
  if(id===this.state.user)
  {
  this.setState((prevState) => ({
  
  data: prevState.data.filter((_, i) => _.question!==ques)
  
  }));
  
  //console.log(this.state.data);
  alert(" Deleting question..");
}
else
alert("You don't have permission as you are not the owner of it")
  
  }

  
  // Editing Question
  async updateIt(id) {
  if(id===this.state.user)
  {
  let new_question = prompt("Enter the correct question ");
  let old_data=this.state.data;
  
  
  let new_data= old_data.map(item=>{
  
  if(item.id===id){
  
  return {...item,question:new_question}
  
  }
  
  else return item;
  
  })
  
  
  this.setState({data:new_data});
  
  //console.log(this.state.data);
  alert("Editing question... ");
}
else
alert ("You don't have permission as you did not create this question.")
  
  }
  

  // Creating a question
  async createIt(e){

  e.preventDefault();
  let flag=0;
  for(let i=0;i<this.state.data.length;i++)
  {
    if(this.state.data[i].question===this.state.question_new)
    {
      this.state.question_new="";
      flag=1;
      alert("Question has already been asked. Please check the forums. ")
    }
  }
  if(flag===0)
  {
 
  let new_item={id:this.state.user, question:this.state.question_new,answers:[]};
  
 this.setState((prevState) => {
  
  return {
  
  data: prevState.data.concat(new_item)
  
  };
  
  });
  

  alert(" Question posted at the bottom...");
    console.log(this.state.data);
    this.setState({id_new:"", name_new:"", question_new:""});



  }
}


// Posting answers
async answerIt(id){

//console.log(id+" clicked");
 const ans= prompt("Type your answer?");

let j=-1;
  for (let i=0;i<this.state.data.length;i++)
  {
    if(this.state.data[i].id===id)
    j=i;

  }
  let ans_new = this.state.data[j].answers;
  ans_new.push(ans);
  let old_data=this.state.data;
  old_data[j].answers=ans_new;
  
  this.setState({data: old_data});

  
 console.log(this.state.data);

}
  
 
  
  
  handleChangequestion(e){
  
  this.setState({question_new:e.target.value});
  
  }
  
  // React render
  render() {
  
let list=this.state.data;

let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


  
  return(
  
  <div>
   
  
  <form style={{textAlign:"center"}} onSubmit={this.createIt}>
  
  <h3>Hi {this.state.user},</h3>
  
  <input name="question" required type="text" size="50" value={this.state.question_new} onChange={this.handleChangequestion} placeholder="Enter question" />
  
  <Button style={{margin:"10px"}} variant="warning" type="submit">Create</Button>
  
  </form>
  <br/>
  
  <div><ul style= {{listStyleType: "none"}}>
  <Container>
  <Row>
    <Col style={{fontWeight: "bold"}} md={1}>Id</Col>
    <Col style={{fontWeight: "bold"}} md={5}>question</Col>
    <Col style={{fontWeight: "bold"}} md={2}>Action</Col>
    <Col style={{fontWeight: "bold"}} md={2}>Action</Col>
    <Col style={{fontWeight: "bold"}} md={2}>Action</Col>
  </Row>
  
  </Container>
  
 { list.map(item => (
  
  <li style={{
    border: "1px solid",
    padding: "50px",
    boxShadow:"5px 10px 20px red inset"
  }} key={item.question}>
  
  <Container>
  <Row>
    <Col md={1}>{item.id}</Col>
    <Col md={5}>{item.question}</Col>
    <Col md={2}><Button variant="primary" onClick={() => {this.updateIt(item.id)}}>Update</Button></Col>
    <Col md={2}><Button variant="secondary" onClick={() => this.answerIt(item.id) }>Answer</Button></Col>
    <Col md={2}><Button variant="danger" onClick={() => {this.removeIt(item.id,item.question) }}>Delete</Button></Col>
   
  </Row>
  
  <Row>
   <div>
 
 { 
  item.answers &&(
   <div>
     {item.answers.length} answer(s) yet
     <br/>
 { item.answers.map(ans=>(
 <span>{ans} - Answered by <b>{this.state.user}</b> on <b>{date}</b><br/></span>))
 }
 </div>)
}

</div>
  </Row>
  </Container>
  
  <br/>
  <br/>
  </li>
  
  ))}
  
  </ul>
  
</div>
</div>  
  )
 }
}

export default Data;

