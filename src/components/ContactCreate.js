import React, { Component } from 'react';
import { connect } from 'react-redux';
import { contactUpdate, contactCreate, resetForm } from '../actions';
import { Card, CardSection, Button } from './common';
import ContactForm from './ContactForm';

class ContactCreate extends Component {
  onButtonPress() {
    const { firstName, lastName, age } = this.props;

    this.props.contactCreate({ firstName, lastName, age });
  }

  componentWillMount(){
    this.props.resetForm();
  }

  render() {
    return (
      <Card>
        <ContactForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { firstName, lastName, age } = state.contactForm;

  return { firstName, lastName, age };
};

export default connect(mapStateToProps, {
  contactUpdate, contactCreate, resetForm
})(ContactCreate);
