'use strict'
import React from 'react'
import { View, Text, StyleSheet, ListView, TouchableHighlight, Navigator, Button } from 'react-native';
import moment from 'moment';
import MatchPage from './MatchPage.js'
export default class Main extends React.Component {
  constructor(props) {
  super(props);

 const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    matches: ds.cloneWithRows([]),
    matchFacts: ds.cloneWithRows([]),
    leagueName: ds.cloneWithRows([])
  }
  this.handleShowMatchFacts = this.handleShowMatchFacts.bind(this);

}

componentWillMount(){
  let leagueId;

let newDate = moment().format('DD.MM.YYYY')

console.log(newDate)

  fetch(`http://api.football-api.com/2.0/matches?match_date=30.04.2017&to_date=30.04.2017&Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76`)
    .then(res => res.json())
    .then(matches => {
      
    matches.map(function(match, index){
        matches[index]['league_name'] = null;
        return matches[index];
      });
    matches.map(function(match, index){
     
      let leagueId = matches[index].comp_id;
      fetch(`http://api.football-api.com/2.0/competitions/${leagueId}?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76`)
       .then(res => res.json())
      .then((leagueInfo) => {
       // console.log('test', leagueInfo.name)
       const leagueName = leagueInfo.name;
       matches[index].league_name = leagueName;
        // console.log('name', matches[index].league_name)
        return matches[index];
        }); return matches[index];
        
      })
      this.setState({
        matches : this.state.matches.cloneWithRows(matches)
      })
    })
  }


/*res.json()   */
handleShowMatchFacts = id => {
  //  console.log('match', id)
    return fetch(`http://api.football-api.com/2.0/matches/${id}?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76`)
    .then(res => { 
   //   console.log('match facts', matchFacts)
        this.props.navigator.push({
        title: 'Match',
        component: MatchPage,
        passProps: {matchInfo: res}

     })
       // console.log(res)
  }) 
}
  
  
 
render() {
    return (

   <View style={styles.mainContainer}>
      <Text
      style={styles.header}>
      Todays Matches</Text>
      <ListView
          style={styles.matches}
          dataSource={this.state.matches}
          renderRow={(matches) =>
          <View>
            <Text>{matches.league_name}</Text>
            <TouchableHighlight
            onPress={() => this.handleShowMatchFacts(matches.id)}
            underlayColor="green"
            ><Text style={styles.item}> {matches.localteam_name} {matches.localteam_score} - {matches.visitorteam_score} {matches.visitorteam_name} </Text>
           </TouchableHighlight>
         </View>
          }
        />

  </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
  },
  navbar: {
    marginTop: 20,
  },
  header: {
    textAlign: 'center',
  },
  matches: {
    marginTop: 20,
  },
  item: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'green',
    marginBottom: 5,
    padding: 20,
    textAlign: 'center',
  },
});