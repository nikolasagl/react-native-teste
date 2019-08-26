import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CalendarList, Agenda as AgendaComponent } from 'react-native-calendars'

class Agenda extends Component {

   render() {
      return (
         <View style={styles.container}>
            <AgendaComponent
               onCalendarToggled={(calendarOpened) => { console.log(calendarOpened) }}
               selected={'2019-05-16'}
               pastScrollRange={50}
               futureScrollRange={50}
               renderItem={(item, firstItemInDay) => { return (<View><Text>Oi</Text></View>); }}
               style={{}}
            />
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   }
})

export default Agenda
