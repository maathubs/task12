import React, { Component } from 'react';
import Textbox from '../Textbox';
import Button from '../Button/Button';
import classes from './Login.module.css';
import Errormsg from '../Errormsg/Errormsg';
import axios from '../../Axios';
import { Link} from "react-router-dom";
class Login extends Component{
    state={
        emailErrormsg:" ",
        passwordErrormsg:' ',
        buttonErrormsg:' '   
    }
    loginButton=()=>{
        if(this.state.emailErrormsg===''&&this.state.passwordErrormsg===''){
            axios.get(`user.json?orderBy="email"&equalTo="${this.state.emailValue}"`)
            .then((response)=> {
                const obj=response.data;
                console.log(Object.keys(obj).length);
                for(var task in obj){
                    var password1=obj[task].password;
                } 
                localStorage.setItem("user", this.state.emailValue);
                console.log(this.state.emailValue) 
                if(password1===this.state.passwordValue) {
                    console.log("Valid user") 
                    this.props.history.push({
                        pathname: '/Home',
                    })  
                }
                else{
                this.setState({
                    passwordErrormsg:"Invalid password"  
                });
                console.log("invalid")
            }
        })
        .catch( (error) =>{
            console.log(error);
        })
        .then( ()=> {
        });       
        // this.props.gotoHome();    
    }
    else{
        this.setState({
                buttonErrormsg:"Fill the Fields"
            });
        }
    }

    // signUpInSeconds=()=>{
    //     this.props.gotoSignup();
    // }
    validateEmail=(event)=>{
        const email=event.target.value.trim();
       if(email===""){
            this.setState({
                emailValue:email,
                emailErrormsg:"Enter the email"
            });
       }
       else{
       var allowed = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/;
           var validMail = allowed.test(email);
           if (validMail === false) {
               this.setState({
                emailValue:email,
                   emailErrormsg:"Invalid email"
               }); 
           }
           else{
               this.setState({
                   emailValue:email,
                   emailErrormsg:""
               });   
           }
       }
       }
       onKeyPress = (e) => {
        if(e.which === 13) {
            if(this.state.emailErrormsg===''&&this.state.passwordErrormsg===''){
          this.loginButton();
        }
      }}
       validatePassword=(event)=>{
           const password=event.target.value.trim();
           if(password===""){
                this.setState({
                    passwordErrormsg:"Enter the Password"
                });
           }
           else{
               var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
               if(password.match(decimal)) {
               this.setState({
                   passwordValue:password,
                   passwordErrormsg:"",
                   buttonErrormsg:""
               });
               axios.get(`user.json?orderBy="email"&equalTo="${this.state.emailValue}"`)
                       .then((response)=> {
                      // handle success
                      const obj=response.data;
                     console.log(obj);
                     console.log(Object.keys(obj).length);
                     for(var task in obj){
                  
                       //   var email1=obj[task].email;
                         var password1=obj[task].password;
                         
                     } 
                      console.log(this.state.emailValue) 
                     if(password1===this.state.passwordValue) {
                         console.log("Valid user") 
                        
                     }
                     else{
                     this.setState({
                        passwordErrormsg:"Incorrect password or Invalid  user"
                     });
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
               else{
                   this.setState({
                       passwordErrormsg:"Invalid Password"
                       
                   });   
               }
           }
       }

       
    render(){
        return(
            
            // <Contextstore.Provider value={{email: this.state.emailValue, password: this.state.passwordValue}}>
            <div className={classes.Login}>
            <p id="Login">Login</p>
            <Textbox type="mail" className={classes.inputName} onkeyup={this.validateEmail} placeholder="Enter the Email id"/>
            <Errormsg msg={this.state.emailErrormsg}/>
            <Textbox type="password" className={classes.inputName} onblur={this.blurFunction} onkeyup={this.validatePassword} onKeyPress={this.onKeyPress} placeholder="Enter the password"/>
            <Errormsg msg={this.state.passwordErrormsg}/>
            <Button type="submit" className={classes.createAccount} onClick={this.loginButton} onSubmit={this.loginButton}  value="Login"/>
            <Errormsg msg={this.state.buttonErrormsg}/>
            <Link className={classes.createLinkAccount}  to="/Signup">Signup in seconds</Link>
            </div>
            //  </Contextstore.Provider>
        );
    }

}
export default Login