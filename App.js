import React from 'react';
import Home from './src/screens/home';
import Toast from 'react-native-toast-message';
import {ToastConfig} from './components/toast-message'

export default function App() {
    return (
        <>
            <Home/>
            <Toast config={ToastConfig} ref={(ref) => Toast.setRef(ref)}/>
        </>
    );
}
