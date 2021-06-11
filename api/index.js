import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastMessage from '../components/ToastMessage'

export const addExpense = async ( data ) => {
    try {
        const results = await AsyncStorage.getItem('@trackIt')
        const Expenses = results != null ? JSON.parse(results) : [];
        const updatedExpenses = JSON.stringify([
            data,
            ... Expenses
        ])
        await AsyncStorage.setItem('@trackIt', updatedExpenses)
        ToastMessage('success', 'Added', 'Expense added successfully.')
        return getExpenses()
    } catch (e) {
        ToastMessage('error', 'Error', 'Expense not added.')
    }
}

export const getExpenses = async () => {
    try {
        const results = await AsyncStorage.getItem('@trackIt')
        const unsortedExpenses = results != null ? JSON.parse(results) : [];
        const sortedExpenseObjects = {}
        unsortedExpenses.forEach((Expense) => {
            const date = Expense.date
            if (sortedExpenseObjects[date]) {
                sortedExpenseObjects[date].push(Expense);
            } else {
                sortedExpenseObjects[date] = [Expense];
            }
        })
        return Object.keys(sortedExpenseObjects).map((date) => {
            return {date: date, data: sortedExpenseObjects[date]}
        })
    } catch (e) {
        console.log('Expenses not Found')
    }
}

export const getStatics = async () => {
    try {
        const results = await AsyncStorage.getItem('@trackIt')
        const Expenses = results != null ? JSON.parse(results) : [];
        const totalIncome = Expenses.filter(Expense => Expense.type === 'Income').map(Expense => Number(Expense.amount)).reduce((prevIncome, nextIncome) => prevIncome + nextIncome, 0)
        const totalExpense = Expenses.filter(Expense => Expense.type === 'Expense').map(Expense => Number(Expense.amount)).reduce((prevExpense, nextExpense) => prevExpense + nextExpense, 0)
        return  {
            Balance: totalIncome - totalExpense,
            TotalIncome: totalIncome,
            TotalExpense: totalExpense
        }
    } catch (e) {
        ToastMessage('error', 'Some thing went wrong', 'Please restart the app.')
    }
}

export const editExpense = async ( id, data ) => {
    try {
        const results = await AsyncStorage.getItem('@trackIt')
        const Expenses = results != null ? JSON.parse(results) : [];
        const updatedExpenseValues = Expenses.map(Expense => Expense.id === id ? {
            ...Expense,
            type: data.type,
            amount: data.amount,
            description: data.description,
            date: data.date
        } : Expense);
        const updatedExpenses = JSON.stringify(updatedExpenseValues)
        await AsyncStorage.setItem('@trackIt', updatedExpenses)
        ToastMessage('success', 'Edited', 'Expense edited successfully.')
        return getExpenses()
    } catch (e) {
        ToastMessage('error', 'Error', 'Expense not Edited.')
    }
}

export const deleteExpense = async ( id ) => {
    try {
        const results = await AsyncStorage.getItem('@trackIt')
        const Expenses = results != null ? JSON.parse(results) : [];
        var updatedExpenseValues = Expenses.filter((Expense) => {
            if (Expense.id != id)
                return Expense
        });
        const updatedExpenses = JSON.stringify(updatedExpenseValues)
        await AsyncStorage.setItem('@trackIt', updatedExpenses)
        ToastMessage('success', 'Deleted', 'Expense deleted successfully.')
        return getExpenses()
    } catch (e) {
        ToastMessage('error', 'Error', 'Please try again.')
    }
}