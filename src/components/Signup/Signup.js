import React, { Component } from 'react';
 import axios from '../../Axios';
import Textbox from '../Textbox';
import Button from '../Button/Button';
import classes from './Signup.module.css';
import Errormsg from '../Errormsg/Errormsg';
import { Link} from "react-router-dom";
class Signup extends Component{
    state={
        nameErrormsg:" ",
        emailErrormsg:" ",
        passwordErrormsg:' ',
        confirmPasswordErrormsg:' ',
        buttonErrormsg:' ',
        nameValue:'',
        emailValue:'',
        passwordValue:'',
        confirmPasswordValue:''

    }
    createAccount=()=>{
       
        if(this.state.nameErrormsg===''&&this.state.emailErrormsg===''&&this.state.passwordErrormsg===''&&this.state.confirmPasswordErrormsg===''){
            
           console.log(this.state.emailValue)
           console.log("new user")
            this.setState({
                buttonErrormsg:""
            });
            axios.post('user.json', {
                userName:this.state.nameValue,
                email:this.state.emailValue,
                password:this.state.passwordValue
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
              this.props.history.push({
                pathname: '/Login',
               
            })
        }
        else{
            
            this.setState({
                buttonErrormsg:"Fill the Fields"
            });
        }
    }
    onKeyPress = (e) => {
        if(e.which === 13) {
            if(this.state.nameErrormsg===''&&this.state.emailErrormsg===''&&this.state.passwordErrormsg===''&&this.state.confirmPasswordErrormsg===''){
          this.createAccount();
        }
      }}
    // loginAccount=()=>{
    //     console.log("Login ")
    //     this.props.gotoLogin();
    // }
    validateName=(event)=>{
     const Name=event.target.value.trim();
     if(Name===''){
        this.setState({
            nameErrormsg: "Enter Name"
          });
     }
     else{
        this.setState({
            nameValue:Name,
            nameErrormsg: ""
          });
     }
    
    }
    validateEmail=(event)=>{
     const email=event.target.value.trim();
     this.setState({
        emailValue:email,
     });
    if(email===""){
         this.setState({
            // emailValue:email,
             emailErrormsg:"Enter the email"
         });
    }
    else{
    var allowed = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/;
        var validMail = allowed.test(email);
        if (validMail === false) {
            this.setState({
                // emailValue:email,
                emailErrormsg:"Invalid email"
            }); 
        }
        else{
            this.setState({
                // emailValue:email,
                emailErrormsg:""
            });
    
        }
    }
    }
    blurFunction=()=>{

        // const val=this.state.emailValue.split('.')[0];
        // //         const val2=".com"
        //         console.log(this.state.emailValue.split('.')[0])  
        //         // axios.get(`user.json?orderBy="email"&equalTo="mathu@gmail.com"`)
                 axios.get(`user.json?orderBy="email"&equalTo="${this.state.emailValue}"`)
                .then((response)=> {
               // handle success
               const obj=response.data;
              console.log(obj);
              console.log(Object.keys(obj).length);
            //   for(var task in obj){
            //     // if(Object.keys(obj).length === 0 && obj.constructor === Object)
            //       var email1=obj[task].email;
                  
            //   } 
               console.log(this.state.emailValue) 
               if(Object.keys(obj).length !== 0) {
                console.log("exsisting user") 
                this.props.history.push({
                  pathname: '/Login',
                 
              })  
            }
    
              })
             .catch( (error) =>{
              // handle error
             console.log(error);
            })
            .then( ()=> {
            // always executed
          });  



    }
    validatePassword=(event)=>{


        const password=event.target.value.trim();
        if(password===""){
             this.setState({
                 passwordErrormsg:"Enter the Password"
             });
        }
        else{
            var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
            if(password.match(decimal)) 
            this.setState({
                passwordValue:password,
                passwordErrormsg:""
            });   
            else{
                this.setState({
                    passwordErrormsg:"Invalid Password"
                    
                });   
            }
        }
    }
    confirmPassword=(event)=>{
        const confirmPassword=event.target.value.trim();
      this.setState({
        confirmPasswordValue: confirmPassword
      });
            
        
       
        // console.log({confirmPassword})
        if(confirmPassword===""){
             this.setState({
                confirmPasswordErrormsg:"Enter the Password"
             });
        }
        else{
            // console.log('testing pass',this.state.passwordValue)
            // console.log('testing cnfpasss',this.state.confirmPassword)
            if(this.state.passwordValue!==confirmPassword){
                this.setState({
                    confirmPasswordErrormsg:"invalid",
                    // confirmPasswordValue:{confirmPassword}
                 });
            }
            else{
                this.setState({
                    confirmPasswordErrormsg:"",
                    buttonErrormsg:"" 
                 });
            }
        } 
    }
    render(){
        //console.log(this.state.passwordValue)

        return(
            <div className={classes.Signup}>
            <p id="signUp">SignUp</p>
            <Textbox type="text" className={classes.inputName} onkeyup={this.validateName} placeholder="Enter the name"/>
            <Errormsg msg={this.state.nameErrormsg} nameValue={this.state.nameValue}/>
            <Textbox type="mail" className={classes.inputName}  onblur={this.blurFunction} onkeyup={this.validateEmail} placeholder="Enter the Email id"/>
            <Errormsg msg={this.state.emailErrormsg} emailValue={this.state.emailValue}/>
            <Textbox type="password" className={classes.inputName}  onkeyup={this.validatePassword} placeholder="Enter the password"/>
            <Errormsg msg={this.state.passwordErrormsg} passwordValue={this.state.passwordValue}/>
            <Textbox type="password" className={classes.inputName} onkeyup={this.confirmPassword} onKeyPress={this.onKeyPress} placeholder="Confirm password"/>
            <Errormsg msg={this.state.confirmPasswordErrormsg}/>
            <Button type="submit" className={classes.createAccount}  onSubmit={this.createAccount} onClick={this.createAccount} value="Create My Account"/>
            <Errormsg msg={this.state.buttonErrormsg}/>
            <Link className={classes.createLinkAccount}  to="/Login">Login to exsisting account</Link>
            <Errormsg/>
            </div>
        );
    }

}
export default Signup