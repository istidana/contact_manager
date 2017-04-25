import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContactForm from './ContactForm';
import { contactUpdate, contactDelete, contactEdit } from '../actions';
import { Card, CardSection, Button, ConfirmDelete } from './common';

class ContactEdit extends Component {
  state = {
    showModal: false
  };

  componentWillMount() {
    _.each(this.props.contact, (value, prop) => {
      this.props.contactUpdate({ prop, value });
    });
  }

  onButtonSave() {
    const { id, firstName, lastName, age } = this.props;
    this.props.contactEdit({id, firstName, lastName, age});
  }

  onButtonDelete(){
    this.setState({
      showModal: !this.state.showModal
    });
  }

  onButtonCancel(){
    this.setState({
      showModal: false
    });
  }

  onButtonYes(){
    const { id } = this.props;
    this.props.contactDelete({id});
  }

  render() {
    return (
      <Card>
        <ContactForm />
        <CardSection>

          <Button onPress={this.onButtonSave.bind(this)}>
            Save Changes
          </Button>

          <Button onPress={this.onButtonDelete.bind(this)}>
            Delete
          </Button>
        </CardSection>

        <ConfirmDelete visible={this.state.showModal} 
              onAccept={this.onButtonYes.bind(this)} 
              onCancel={this.onButtonCancel.bind(this)
        }>
          Are you sure want to delete this contact?
        </ConfirmDelete>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  const { id, firstName, lastName, age } = state.contactForm;

  return { id, firstName, lastName, age };
};

export default connect(mapStateToProps, { contactUpdate, contactDelete, contactEdit })(ContactEdit);
