import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, SectionList, BackHandler, Alert, StyleSheet } from 'react-native'
import Header from '../../components/header'
import Container from '../../components/container'
import Dialogue from '../../components/dialogue'
import AppInput from '../../components/app-input'
import FAB from '../../components/buttons/floating-action-button'
import SelectorButton from '../../components/buttons/selector-button'
import DatePicker, { Today } from '../../components/date-picker'
import Colors from '../../constants/colors'
import OverviewBox from '../../components/overview-box';
import Card from '../../components/card'
import ActionButton from '../../components/buttons/action-button'
import { addExpense, deleteExpense, editExpense, getExpenses } from '../../api'

const Home = () => {

    const [showDilouge, setshowDilouge] = useState(false)
    const [type, settype] = useState('Income')
    const [dialogueType, setdialogueType] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState()
    const [selectedCard, setselectedCard] = useState('')
    const [ExpensesList, setExpensesList] = useState([])
    const [showConfirm, setshowConfirm] = useState(false)

    useEffect(() => {
        getExpenses().then(response=>setExpensesList(response));
        const backAction = () => {
            Alert.alert("Wait!", "Are you sure you want to close the Trackit?", [
              {text: "NO",onPress: () => null,},
              { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
          };
          const backHandler = BackHandler.addEventListener("hardwareBackPress",backAction)
          return () => backHandler.remove();
    },[]);

    const uniqueID =()=> {
        return 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, (x)=> {
          var randomNumber = Math.random() * 16 | 0, generatedKeyValues = x == 'x' ? randomNumber : (randomNumber & 0x3 | 0x8);
          return generatedKeyValues.toString(16);
        });
    }

    const onAddExpense =()=>{
        amount && description && date && addExpense(data)
                                            .then((response)=>{
                                                setExpensesList(response);
                                                setshowDilouge(false);
                                                setAmount('');setDescription('');setDate('')
        });
    }

    const onDeleteExpense = ()=>{
        deleteExpense(selectedCard.id)
                .then((response)=>{setExpensesList(response);setshowDilouge(false);setshowConfirm(false)});
    }

    const onEditExpense = ()=>{
            editExpense(selectedCard.id,data)
                    .then((response)=>{setExpensesList(response);setshowDilouge(false);setselectedCard('')});
        }

    const data = {
        id:uniqueID() || selectedCard.id ,
        type:type || selectedCard.type,
        amount:amount || selectedCard.amount ,
        description:description || selectedCard.description ,
        date:date || selectedCard.date,
    }

    const showDialogue = () => {
        if(dialogueType === 'add')
                {return <Dialogue heading={'Add Income/Expense'} onClose={()=>setshowDilouge(false)}  >
                            <SelectorButton title1='Income' title2='Expense' onValueChange={settype} value={type}  />
                            <AppInput autoFocus placeHolder='Amount' type={'numeric'} onChange={setAmount} isNumericInput />
                            <AppInput placeHolder='Description' onChange={setDescription} r />
                            <DatePicker onValueChange={setDate} />
                            <ActionButton title='Save' color={Colors.yellow} onPress={()=>{onAddExpense()}} />
                         </Dialogue>}
        if(dialogueType === 'view')
                {return <Dialogue heading={selectedCard.type} onClose={()=>{setshowDilouge(false);setshowConfirm(false)}} >
                            <Text style={[{color:selectedCard.type === 'Income' ? Colors.green : Colors.darkred},styles.viewAmountText]}>${selectedCard.amount}</Text>
                            <Text style={styles.viewDescriptionText} >{selectedCard.description}</Text>
                            <Text style={styles.viewDateText} >{selectedCard.date}</Text>
                           { showConfirm ?
                            <>
                              <Text style={{margin:3.5}}>Are you sure you want to delete ?</Text>
                              <ActionButton title='Cancel' onPress={()=>setshowConfirm(false)} />
                              <ActionButton title='Confirm' color={Colors.darkred} onPress={()=>onDeleteExpense()} />
                            </> :
                            <>
                              <ActionButton title='Edit' color={Colors.yellow} onPress={()=>setdialogueType('edit')} />
                              <ActionButton title='Delete' color={Colors.darkred} onPress={()=>setshowConfirm(true)} />
                            </>
                            }
                        </Dialogue>}
        if(dialogueType === 'edit')
                {return <Dialogue heading={selectedCard.type} onClose={()=>setshowDilouge(false)} >
                            <SelectorButton title1='Income' title2='Expense' onValueChange={settype} value={selectedCard.type || null}  />
                            <AppInput autoFocus placeHolder='Amount' value={selectedCard.amount} onChange={setAmount}  type={'numeric'} isNumericInput />
                            <AppInput placeHolder='Description' value={selectedCard.description} onChange={setDescription} />
                            <DatePicker onValueChange={setDate} value={selectedCard.date} />
                            <ActionButton title='Save' color={Colors.yellow} onPress={()=>onEditExpense()} />
                        </Dialogue>
                        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header/>
             <Container>
                <OverviewBox />
                <View style={styles.cardListContainer} >
                <SectionList
                    showsVerticalScrollIndicator={false}
                    sections={ExpensesList}
                    SectionSeparatorComponent={()=><View style={{marginBottom:3.5}} ></View>}
                    keyExtractor={( index, item ) => index + item}
                    renderSectionHeader={({ section: { date } }) => (
                        <View style={styles.dateHeader} ><Text >{ Today === date ? "Today" : date }</Text></View>
                    )}
                    renderItem={({item})=>(<Card key={item.key} item={item} onPress={()=>{setdialogueType('view');setselectedCard(item);setshowDilouge(true)}}  />)}
                />
                </View>
                <FAB onPress={()=>{setdialogueType('add');setshowDilouge(true)}} />
            </Container>
            {showDilouge ? showDialogue() : null}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{alignItems:"center",height:'100%'},
    cardListContainer:{paddingHorizontal:20,height:'60%'},
    dateHeader:{width:'100%',alignItems:'center'},
    viewAmountText:{fontSize:32,fontWeight:'bold',marginVertical:35},
    viewDateText:{fontSize:14,marginVertical:8},
    viewDescriptionText:{fontSize:18}
})

export default Home;