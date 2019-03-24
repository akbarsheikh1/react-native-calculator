import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Button } from 'react-native';


export default class App extends React.Component {

constructor() {
  super() 
  
  this.state ={
    resultText: "",
    calculationText: ""
  }
  this.operations = ['DEL','+','-','*','/']
}

 calculateResult() {
   const text = this.state.resultText
   this.setState({
     calculationText: eval(text)
   })
 }
 validate() {
   const text = this.state.resultText
   switch(text.slice(-1)){
     case '+':
     case '-':
     case '*':
     case '/':
     return false
       }
     return true  
 }

  buttonPressed(text) {
  console.log(text) 
  
  if(text == '=') {
  return this.validate() && this.calculateResult(this.state.resultText)
  }
  
  this.setState({
    resultText: this.state.resultText+text
  }) 
  }

  operate(operation){
    switch(operation) {
      case 'DEL':
      let text = this.state.resultText.split('')
      text.pop()
      this.setState({
        calculationText: 0
      })
      this.setState({
        resultText: text.join('')
      })
      break
      case '+':
      case '-':
      case '*':
      case '/':
      const lastChar = this.state.resultText.split('').pop()
      
      if(this.operations.indexOf(lastChar) > 0)  return
      if(this.state.resultText == "")  return
      this.setState({
        resultText: this.state.resultText + operation
      })
    

    }
  }
  render() {
  
    let rows =[]
    let nums= [[1,2,3],[4,5,6,],[7,8,9],['.',0,'=']]
    for (let i = 0; i < 4; i++) {
      let row =[]
      for (let j=0;j<3;j++) {
       row.push(
        <TouchableOpacity  onPress={ ()=> this.buttonPressed(nums[i][j])   }    style={styles.btn}>
        <Text style={styles.btnText} >{nums[i][j]}</Text></TouchableOpacity>
       )}
      rows.push(<View  style={styles.row}>{row}</View>)  
    }
    
    let ops =[]
    for(let i=0;i<5;i++)
    {
      ops.push(
        <TouchableOpacity  onPress={()=>this.operate(this.operations[i]) }  style={styles.btn}>
        <Text style={styles.btnText} >{this.operations[i]}</Text></TouchableOpacity>
       )
    }  
    
    return (
      <View style={styles.container}>
        <View style={styles.result} >
        <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation} >
        <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
        <View style={styles.numbers}>
        {rows}
        </View>
        <View style={styles.operations}>
       {ops}
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btn:{
  flex: 3,
  alignItems: 'center',
   justifyContent: 'center',
   alignSelf: 'stretch'
  },
  btnText: {
  fontSize: 30,
  color: 'white'
  },
  resultText:{
    color: 'black',
    fontSize: 30
  },
  calculationText:{
  fontSize: 24,
  color: 'black'
  },
  result: {
  flex: 2,
  backgroundColor: 'white',
  alignItems: 'flex-end'
  },
  calculation: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons:{
    flexGrow: 7,
    flexDirection: 'row',
  },
  numbers:{
    
    flex: 3,
    backgroundColor: '#434343'
  },
  row:{
    flexDirection: 'row',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  operations:{
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: '#636363'
  },

});
