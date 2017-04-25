import 'isomorphic-fetch';
import * as actions from '../src/actions/ContactAction'
import * as types from '../src/actions/types'
import * as components from '../src/components/common';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect'; // You can use any testing library

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Contact Actions syncronous', () => {
  it('should create an action to reset form', () => {
    const expectedAction = {
      type: types.CONTACT_CREATE
    }
    expect(actions.resetForm()).toEqual(expectedAction)
  })

  it('should create an action to update contact form', () => {
    const expectedAction = {
      type: types.CONTACT_UPDATE,
      payload: { prop: 'firstName', value: 'Isti' }
    }
    expect(actions.contactUpdate({ prop: 'firstName', value: 'Isti' })).toEqual(expectedAction)
  })
})

describe('Contact Actions asyncronous', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates LOAD_CONTACTS_SUCCESS when load contacts has been done', () => {
    nock('http://192.168.110.207:3000')
      .get('/contacts')
      .reply(200, { body: [] })

    const expectedActions = [
      { type: types.LOAD_CONTACTS_SUCCESS, payload: { body: [] } }
    ]
    const store = mockStore({ contacts: [] })

    return store.dispatch(actions.loadContact())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })


})
