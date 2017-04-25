import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ListView, ActivityIndicator } from 'react-native';
import { loadContact } from '../actions';
import ContactItem from './ContactItem';
import { Spinner } from './common';
import {
    LazyloadListView,
    LazyloadView
} from 'react-native-lazyload';

class ContactList extends Component {
  componentWillMount() {
    this.props.loadContact();

    this.createDataSource(this.props)
    /*
    this.props.loadContact().then(resp => {
      console.log(resp);
      console.log(this.props);

      this.createDataSource(resp);
    });*/

    // const { contacts: [] } = this.props;
    //
    // console.log("1+ "+this.props);

    // this.createDataSource(contacts);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({contacts}) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(contacts);
    //console.log(this.dataSource);
  }

  renderList() {
    if (this.props.loading) {
      return (
        <ActivityIndicator
          animating
          size="large"
        />
      );
    }

    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }


  renderRow = (contact) => {
        return (<View
        >
            <LazyloadView
                host="listExample"
            >
                <ContactItem contact={contact} />
            </LazyloadView>
        </View>);
    };

  render() {
    return (
      <LazyloadListView
            enableEmptySections
            name="listExample"
            dataSource={this.dataSource}
            renderRow={this.renderRow}
            scrollRenderAheadDistance={200}
            renderScrollComponent={()=>{}}
            renderDistance={100}
            pageSize={1}
            initialListSize={10}
            onEndReachedThreshold={10}
        />
      /*<View style={this.props.loading && styles.loading}>
        {this.renderList()}
      </View>*/
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.2)'
  }
});

const mapStateToProps = ({ contactReducer }) => {
  const { contacts, error, loading } = contactReducer;

  return { contacts, error, loading };
};

export default connect(mapStateToProps, { loadContact })(ContactList);


/*import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ContactItem';

class ContactList extends Component {
  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(this.props.contacts);
  }

  renderRow(library) {
    return <ListItem library={library} />;
  }

  render() {
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  return { contacts: state.contacts };
};

export default connect(mapStateToProps)(ContactList);
*/
