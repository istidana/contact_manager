import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  LOAD_CONTACTS_SUCCESS,
  LOAD_CONTACTS_FAIL,
  CONTACT_CREATE,
  CONTACT_UPDATE
} from './types';

export const loadContact = () => {
  return (dispatch) => {

    const host = 'http://192.168.100.18:3000/contacts'
    const url = `${host}`
    let options = Object.assign({ method: 'get' }, null)
    options.headers = {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'dataType': 'json'
    }

    return fetch(url, options).then(resp => {
      let json = resp.json()
      if (resp.ok) {
       return json;
      }
      return json.then(err => {
        console.log(err);
        loadContactFail(dispatch);
      })
    }).then(json => {
      console.log(json);
      loadContactSuccess(dispatch, json);
    })

  };
};


const loadContactFail = (dispatch) => {
  dispatch({ type: LOAD_CONTACTS_FAIL });
};

const loadContactSuccess = (dispatch, contacts) => {
  //it should be return(dispatch...)
  dispatch({
    type: LOAD_CONTACTS_SUCCESS,
    payload: contacts
  });
};

export const contactUpdate = ({ prop, value }) => {
  return {
    type: CONTACT_UPDATE,
    payload: { prop, value }
  };
};

export const resetForm = () => {
  return {
    type: CONTACT_CREATE
  };
};

export const contactCreate = ({ firstName, lastName, age }) => {

  return (dispatch) => {

    const host = 'http://192.168.100.18:3000/contacts'
    const url = `${host}`
    let options = Object.assign({ method: 'post' }, null)
    options.headers = {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'dataType': 'json'
    }
    options.body = JSON.stringify({
      'firstName':firstName,
      'lastName':lastName,
      'age':age
    })
    return fetch(url, options).then(resp => {
      let json = resp.json()
      if (resp.ok) {
       return json;
      }
      return json.then(err => {
        console.log(err);
      })
    }).then(json => {
      console.log(json);
      Actions.contactList({ type: 'reset' });
    })

  };
};


export const contactDelete = ({id}) =>{
   return (dispatch) => {
    const host = 'http://192.168.100.18:3000/contacts/'+id
    const url = `${host}`
    console.log('id: '+id);
    console.log('host: '+host);
    let options = Object.assign({ method: 'delete' }, null)
    options.headers = {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'dataType': 'json'
    }
    return fetch(url, options).then(resp => {
      //let json = resp.json()
      if (resp.ok) {
        Actions.contactList({ type: 'reset' });
       return;
      }
    }).then(err => {
      //console.log(json);
    })
  };
}

export const contactEdit = ({id, firstName, lastName, age}) =>{
  return (dispatch) => {
    const host = 'http://192.168.100.18:3000/contacts/'+id
    const url = `${host}`
    let options = Object.assign({ method: 'put' }, null)
    options.headers = {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'dataType': 'json'
    }
    options.body = JSON.stringify({
      'firstName':firstName,
      'lastName':lastName,
      'age':age
    })
    return fetch(url, options).then(resp => {
      //let json = resp.json()
      if (resp.ok) {
      Actions.contactList({ type: 'reset' });
       return;
      }
    }).then(err => {
      
    })
  }
}
