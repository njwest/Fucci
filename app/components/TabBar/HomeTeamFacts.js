'use strict'
import React from 'react'
import { View, Text, StyleSheet, ListView } from 'react-native';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import AwayFacts from './AwayTeamFacts.js';


export default class HomeFacts extends React.Component {
  constructor(props) {
  super(props);

 const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    teamFacts: {},
    teamInfo: ds.cloneWithRows([]),
    teamName: ''
  }
  this.handleAwayTeamFacts = this.handleAwayTeamFacts.bind(this);

}

componentWillMount(){
  
  this.setState({
      teamFacts : this.props.teamFacts
    })
  }

componentDidMount(){

  let localTeamId = this.state.teamFacts.localteam_id;
  fetch(`http://api.football-api.com/2.0/team/${localTeamId}?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76`)
    .then(res => res.json())
      .then(teamInfo => {
      let lineUp = teamInfo.squad
      lineUp.map(function(match, index){
        // if(lineUp[index].appearances > '10'){
          // return lineUp[index] 
          if(lineUp[index].position == 'G'){
            lineUp[index].position = 'GoalKeeper'
            return lineUp[index].position
          }else if(lineUp[index].position == 'D'){
            lineUp[index].position = 'Defender'
            return lineUp[index].position
          }else if(lineUp[index].position == 'M'){
            lineUp[index].position = 'MidFielder'
            return lineUp[index].position
          }else if(lineUp[index].position == 'A'){
            lineUp[index].position = 'Forward'
            return lineUp[index].position
          }
          return lineUp[index]
        // } 
      })
        
        this.setState({
          teamInfo: this.state.teamInfo.cloneWithRows(lineUp)
        })
      })

    fetch(`http://api.football-api.com/2.0/team/${localTeamId}?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76`)
    .then(res => res.json())
      .then(name => {

        let teamName = name.name;
        
        this.setState({
          teamName: teamName
        })   
   })
  }

  handleAwayTeamFacts(id) {
    console.log('match', id)
    fetch(`http://api.football-api.com/2.0/matches/${id}?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76`)
    .then(res => res.json())
      .then(awayFacts => {
      this.props.navigator.push({
      title: 'Away',
      component: AwayFacts,
      passProps: {facts: awayFacts}
   })
  })
}

render() {

    return (
      <View style={styles.body}>
       <NavBar style={styles.navBar}>
          <NavButton>
            <NavButtonText>
              {"Home"}
            </NavButtonText>
          </NavButton>
          <NavButton
              onPress={() =>
              this.handleAwayTeamFacts(this.state.teamFacts.id)}>
            <NavButtonText>
              {"Away"}
            </NavButtonText>
          </NavButton>
        </NavBar>
     <View style={styles.mainContainer}>
        <Text style={styles.teamName}>{this.state.teamName}</Text>
        <ListView
          style={styles.matches}
          dataSource={this.state.teamInfo}
          renderRow={(team) =>
          <View>
            <Text>{team.name} - {team.position} </Text>
          </View>
          }
        />
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginTop: 50,
  },
  mainContainer: {
    alignItems: 'center',
  },
  matches: {
    // padding: 20,
  },
  teamName: {
    fontSize: 20,
  },
});