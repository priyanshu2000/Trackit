import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, SectionList, BackHandler, Alert, StyleSheet } from 'react-native'
import Header from '../../components/Header'
import Container from '../../components/Container'
import Dialogue from '../../components/Dialogue'
import AppInput from '../../components/AppInput'
import FAB from '../../components/buttons/FloatingActionButton'
import SelectorButton from '../../components/buttons/SelectorButton'
import DatePicker, { Today } from '../../components/DatePicker'
import Colors from '../../constants/colors'
import OverviewBox from '../../components/OverviewBox';
import Card from '../../components/Card'
import ActionButton from '../../components/buttons/ActionButton'
import { addExpense, deleteExpense, editExpense, getExpenses } from '../../api'

const Home = () => {

    const [isShowDialogue, setShowDialogue] = useState(false)
    const [type, setType] = useState('Income')
    const [dialogueType, setDialogueType] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState()
    const [selectedCard, setSelectedCard] = useState('')
    const [ExpensesList, setExpensesList] = useState([])
    const [showConfirm, setShowConfirm] = useState(false)

    useEffect(() => {
        onGetExpenses();
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

    const onGetExpenses = async ()=> {
        const response = await getExpenses();
            setExpensesList(response)
    }

    const uniqueID =()=> {
        return 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, (x)=> {
          var randomNumber = Math.random() * 16 | 0, generatedKeyValues = x == 'x' ? randomNumber : (randomNumber & 0x3 | 0x8);
          return generatedKeyValues.toString(16);
        });
    }

    const onAddExpense = async ()=>{
        if(amount && description && date){ const response = await addExpense(data)
                                                setExpensesList(response);
                                                setShowDialogue(false);
                                                setAmount('');setDescription('');setDate('')
        }
    }

    const onDeleteExpense = async ()=>{
        const response = await deleteExpense(selectedCard.id)
                setExpensesList(response);setShowDialogue(false);setShowConfirm(false)
    }

    const onEditExpense = async ()=>{
            const response = await editExpense(selectedCard.id,data)
                    setExpensesList(response);setShowDialogue(false);setSelectedCard('');
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
                {return <Dialogue heading={'Add Income/Expense'} onClose={()=>setShowDialogue(false)}  >
                            <SelectorButton title1='Income' title2='Expense' onValueChange={setType} value={type}  />
                            <AppInput autoFocus placeHolder='Amount' type={'numeric'} onChange={setAmount} isNumericInput />
                            <AppInput placeHolder='Description' onChange={setDescription} r />
                            <DatePicker onValueChange={setDate} />
                            <ActionButton title='Save' color={Colors.yellow} onPress={()=>{onAddExpense()}} />
                         </Dialogue>}
        if(dialogueType === 'view')
                {return <Dialogue heading={selectedCard.type} onClose={()=>{setShowDialogue(false);setShowConfirm(false)}} >
                            <Text style={[{color:selectedCard.type === 'Income' ? Colors.green : Colors.darkRed},styles.viewAmountText]}>${selectedCard.amount}</Text>
                            <Text style={styles.viewDescriptionText} >{selectedCard.description}</Text>
                            <Text style={styles.viewDateText} >{selectedCard.date}</Text>
                           { showConfirm ?
                            <>
                              <Text style={{margin:3.5}}>Are you sure you want to delete ?</Text>
                              <ActionButton title='Cancel' onPress={()=>setShowConfirm(false)} />
                              <ActionButton title='Confirm' color={Colors.darkRed} onPress={()=>onDeleteExpense()} />
                            </> :
                            <>
                              <ActionButton title='Edit' color={Colors.yellow} onPress={()=>setDialogueType('edit')} />
                              <ActionButton title='Delete' color={Colors.darkRed} onPress={()=>setShowConfirm(true)} />
                            </>
                            }
                        </Dialogue>}
        if(dialogueType === 'edit')
                {return <Dialogue heading={selectedCard.type} onClose={()=>setShowDialogue(false)} >
                            <SelectorButton title1='Income' title2='Expense' onValueChange={setType} value={selectedCard.type || null}  />
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
                    SectionSeparatorComponent={()=><View style={styles.SectionSeparatorComponent} ></View>}
                    keyExtractor={( index, item ) => index + item}
                    renderSectionHeader={({ section: { date } }) => (
                        <View style={styles.dateHeader} ><Text >{ Today === date ? "Today" : date }</Text></View>
                    )}
                    renderItem={({item})=>(<Card key={item.key} item={item} onPress={()=>{setDialogueType('view');setSelectedCard(item);setShowDialogue(true)}}  />)}
                />
                </View>
                <FAB onPress={()=>{setDialogueType('add');setShowDialogue(true)}} />
            </Container>
            {isShowDialogue && showDialogue()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{alignItems:"center",height:'100%'},
    cardListContainer:{paddingHorizontal:20,height:'60%'},
    dateHeader:{width:'100%',alignItems:'center'},
    viewAmountText:{fontSize:32,fontWeight:'bold',marginVertical:35},
    viewDateText:{fontSize:14,marginVertical:8},
    viewDescriptionText:{fontSize:18},
    SectionSeparatorComponent:{marginBottom:3.5}
})

export default Home;