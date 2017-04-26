import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Navigator, Button } from 'react-native';
import Main from './Main';
import FavTeams from './FavTeams';
import Registration from './Registration';

export default class Home extends React.Component {
  constructor(props){
      super(props); //call the React Component that we're extending

      //initialize username so we can hold onto the username that the user types into the input
      //isLoading boolean to toggle the spinner
      //error boolean to allow us to show an error message if something happens
      this.state = {
          username: '',
          password: '',
      }
      this.handleChange = this.handleChange.bind(this);

      this.handleLogin = this.handleLogin.bind(this);

      this.registration = this.registration.bind(this);

      this.handleGuest = this.handleGuest.bind(this);
  }

  handleChange(event){
      this.setState({
        //we grab the text from the input (TextInput below) because we binded scope to this from the input.
          username: event.nativeEvent.text.toLowerCase()
      })
  }

  handleLogin(){
    this.props.navigator.push({
      title: 'Your Teams',
      component: FavTeams
    })
  }

  handleGuest(){
      this.props.navigator.push({
      title: 'Guest Login',
      component: Main
    })
  }

  registration(){
      this.props.navigator.push({
      title: 'Profile Registration',
      component: Registration
    })
  }


  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Fucci</Text>
        <Text style={styles.title}> Login </Text>
        <TextInput
            style={styles.searchInput}/>
        <TextInput
            style={styles.searchInput}/>  
        <TouchableHighlight
            style={styles.button}
            onPress={this.handleLogin}
            underlayColor="lightpink">
            <Text style={styles.buttonText}> Submit </Text>
        </TouchableHighlight>
        <Button title="Register Profile" onPress={this.registration} />
        <Button title="Continue As Guest" onPress={this.handleGuest} />
        

      </View>
    );
  }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#48BBEC'
    },
    header : {
        marginBottom: 40,
        fontSize: 60,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
    },
    searchInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
});

