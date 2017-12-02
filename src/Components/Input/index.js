import React from 'react';
import './style.css'
import Fa from 'react-fontawesome';

export default class Input extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      focus: false
    };
    this._focus = false;
  }

  componentWillReceiveProps(newProps){
    if(!this.state.focus && newProps.value.length > 0){
      this.setState({focus: true});
    }
    if(this.state.focus && newProps.value.length === 0 && !this._focus){
      this.setState({focus: false});
    }
  }

  render(){
    const prefix = this.props.icon ? 'prefix ' : '';
    const inputClasses = prefix + (this.props.className ? this.props.className : '');
    const id = 'input-' + this.props.label.replace(" ", "_") + Math.floor(Math.random()*100);
    const localProps = {...this.props};
    delete localProps.className;
    delete localProps.icon;
    delete localProps.label;
    delete localProps.id;
    delete localProps.validate;
    return(
      <div className="md-input">
        {this.props.icon? <Fa name={this.props.icon} className="prefix"/> : null}
        <input id={id} type="text" {...localProps}
               onFocus={(e) => {
                 this.setState({focus: true});
                 this._focus = true;
               }}
               onBlur={(e) => {
                 if(e.target.value.length === 0){
                   this.setState({focus: false});
                 }
                 this._focus = false;
               }} className={inputClasses}/>
        {this.props.validate ?
          <span className={this.props.validate.isValid ? "validation-text valid" : "validation-text invalid"}>
          {!this.props.validate.isValid ? this.props.validate.error : this.props.validate.valid}
          </span> : ''}
        <label htmlFor={id}
               className={this.state.focus ? prefix + 'active' : prefix}>{this.props.label}</label>
      </div>
    )
  }
}