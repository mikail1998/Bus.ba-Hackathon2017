import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import {Grid, Row, Col,Glyphicon,Modal,Button} from 'react-bootstrap';
import './Landing.css';
import MdSearch from 'react-icons/lib/md/search';
import MdAttachMoney from 'react-icons/lib/md/attach-money';
import MdDirectionsBus from 'react-icons/lib/md/directions-bus';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';
import FaFilter from 'react-icons/lib/fa/filter';
import FaTicket from 'react-icons/lib/fa/ticket';
import MdDateRange from 'react-icons/lib/md/date-range';
import Input from '../Input';
import fetchHelper from '../../fetchHelper.js';
import moment from 'moment';
import MomentInput from 'react-moment-input';

class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            location: '',
            destination:'',
            show:false,
            isResultClicked:false,
            isTicketBought:false,
            results:[],
            isDateVisible:false
     }
     this.onChangeDestination=this.onChangeDestination.bind(this);
     fetchHelper.get("voznje/pretraga",{
         od: "Ba",
         do: "Mo"
     })
      }

    onChangeLocation = (location) => this.setState({ location });
      
    async onChangeDestination(destination){
       
    
        this.setState({destination})
    };

    handleFormSubmit = (event, address) => {
        event.preventDefault()
    
        geocodeByAddress(this.state.address)
          .then(results => getLatLng(results[0]))
          .then(latLng => console.log('Success', latLng))
          .catch(error => console.error('Error', error))
    }
    showModal() {
        this.setState({ show: true });
      };
      showDate(){
          this.setState({isDateVisible:!this.state.isDateVisible})
      }
    buyTicket(){
        console.log("asd");
        this.setState({isTicketBought:true})
    }
    hideModal() {
        this.setState({ show: false });
      };
    async showResults(){
        let location, destination, locArr, destArr;
        locArr = this.state.location.split('');
        destArr = this.state.destination.split('');
        location = locArr[0]+locArr[1];
        destination = destArr[0]+destArr[1];
        console.log(location); 
        const voznje = await  fetchHelper.get("voznje/pretraga",{
            od: location,
            do: destination
        })
          this.setState({isResultClicked:true,results: voznje},()=>{console.log(this.state.results)})
      }
      render() {
        const inputProps = {
          value: this.state.location,
          onChange: this.onChangeLocation,
          placeholder: 'Pocetna Destinacija'          
        }
        const inputPropsDestination ={
            value: this.state.destination,
            onChange:this.onChangeDestination,
            placeholder: 'Krajnja Destinacija'
        }
        var divStyle = {
            height: "40px"
          };
        return (
        <div className="container-fluid">
            <div className="row">
                <div className="search-container">
                <div className="col-md-3 col-md-offset-2 search-input ">
                        <PlacesAutocomplete inputProps={inputProps} />
                </div>
                <div className="col-md-3 search-input">
                        <PlacesAutocomplete inputProps={inputPropsDestination} />
                </div>
                <div className="col-md-2" >
                    <MdDateRange className="search-route-button" onClick={this.showDate.bind(this)}/>
                    <MdSearch className="search-route-button" onClick={this.showResults.bind(this)}/>
                    {this.state.isDateVisible &&
                    <MomentInput
                            max={moment().add(5,'days')}
                            min={moment()}
                            format="YYYY-MM-DD HH:mm"
                            options={true}
                            readOnly={false}
                            icon={false}
                            onChange={(date)=> {console.log(date)}} />}
                </div>
                </div>
            </div>
            {this.state.isResultClicked?
            <div>
            <div className="result-header col-md-8 col-md-offset-2">
                <div className="col-md-2 header-cell">
                    <MdDirectionsBus className="bus-icon"/>
                    LINIJE
                    <div class="vertical-line" style={divStyle}></div>
                </div>
                <div className="col-md-3 header-cell">
                    <p>
                        Studentska Karta
                    </p>
                </div>
                <div className="col-md-3 header-cell route" >
                    <p className="destination">Mostar</p>
                    <p><MdArrowForward/></p>
                    <p className="destination">Sarajevo</p>
                </div>
                <div className="col-md-1 col-md-offset-3 header-cell">
                    <FaFilter className="filter"/>
                </div>
            </div>    
            <div className="result-header col-md-8 col-md-offset-2">
                <div className="col-md-3 header-cell">
                    Kompanija
                </div>
                <div className="col-md-2 header-cell center">
                    Datum
                </div>
                <div className="col-md-2 header-cell center" >
                    Vrijeme Polaska
                </div>
                <div className="col-md-2 header-cell center" >
                    Vrijeme Dolaska
                </div>
                <div className="col-md-3 header-cell center">
                    Cijena
                </div>
            </div>

            {this.state.results.map(result => {
                return <div className="result-container col-md-8 col-md-offset-2 " onClick={this.showModal.bind(this)}>
                <div className="col-md-3">
                    <img src="http://darprirode.ba/userfiles/image/partneri/5-Centrotrans.jpg" className="company-logo"/>
                </div>
                <div className="col-md-2 result-date">
                    {moment(result.datum).format("DD/MM/YYYY")}
                </div>
                <div className="col-md-2 result-date" >
                    {result.vrijemePolaska}
                </div>
                <div className="col-md-2 result-date" >
                    {result.vrijemeDolaska}
                </div>
                <div className="col-md-3 result-date">
                    {result.cijena}  BAM
                </div>
            </div>})}
            {/* <div className="result-container col-md-8 col-md-offset-2 " onClick={this.showModal.bind(this)}>
                <div className="col-md-3">
                    <img src="http://darprirode.ba/userfiles/image/partneri/5-Centrotrans.jpg" className="company-logo"/>
                </div>
                <div className="col-md-2 result-date">
                    12.03.2017
                </div>
                <div className="col-md-2 result-date" >
                    16:15
                </div>
                <div className="col-md-2 result-date" >
                    18:15
                </div>
                <div className="col-md-3 result-date">
                    15 BAM
                </div>
            </div>
            <div className="result-container col-md-8 col-md-offset-2 " onClick={this.showModal.bind(this)}>
                <div className="col-md-3">
                    <img src="http://darprirode.ba/userfiles/image/partneri/5-Centrotrans.jpg" className="company-logo"/>
                </div>
                <div className="col-md-2 result-date">
                    12.03.2017
                </div>
                <div className="col-md-2 result-date" >
                    16:15
                </div>
                <div className="col-md-2 result-date" >
                    18:15
                </div>
                <div className="col-md-3 result-date">
                    15 BAM
                </div>
             </div>
             <div className="result-container col-md-8 col-md-offset-2 " onClick={this.showModal.bind(this)}>
                <div className="col-md-3">
                    <img src="http://darprirode.ba/userfiles/image/partneri/5-Centrotrans.jpg" className="company-logo"/>
                </div>
                <div className="col-md-2 result-date">
                    12.03.2017
                </div>
                <div className="col-md-2 result-date" >
                    16:15
                </div>
                <div className="col-md-2 result-date" >
                    18:15
                </div>
                <div className="col-md-3 result-date">
                    15 BAM
                </div>
             </div> */}
            </div>
            :null}
            <Modal
            bsSize="large" aria-labelledby="contained-modal-title-lg"
            {...this.props}
            show={this.state.show}
            onHide={this.hideModal.bind(this)}
            dialogClassName="custom-modal"
            >
          <Modal.Body>
            <img onClick={this.buyTicket.bind(this)} className="ticket" src="https://files.slack.com/files-pri/T85SDMH7Z-F89R8PBD5/popup_noborder.jpg"/>
            {this.state.isTicketBought?<div className="message">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Qr-2.png"/>
            </div>:null}
          </Modal.Body>
        </Modal>
          </div>
        )
      }
}

export default Landing;
