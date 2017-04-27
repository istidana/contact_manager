import React, {Component} from 'react';
import _ from 'lodash';
import {Text, View, ListView} from 'react-native';
import { connect } from 'react-redux';
import { loadContact } from '../actions/';
import ContactList from '../components/ContactList';


class ContactListContainer extends Component {
    
    refreshData(){
        this.props.loadContact();
    }

    componentWillMount(){
      this.refreshData();
    }

    componentWillReceiveProps(newProps){
      if(_.isEqual(this.props.contacts, newProps.contacts)){
        this.refreshData();
      }
    }

    render() {
      console.log("render()");
        const { contacts } = this.props;
        return (
            <View>
                <ContactList contacts={contacts} />
            </View>
        );
    }   

}

const mapStateToProps = ({contactReducer}) => {
    console.log("contactListContainer mapStateToProps "+ JSON.stringify(contactReducer));
    const {contacts, error, loading} = contactReducer;
    return {contacts,error,loading};
};

export default connect(mapStateToProps, {loadContact} )(ContactListContainer);