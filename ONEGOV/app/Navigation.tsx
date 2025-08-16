// this is the navigationfile
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import CitizenIDScreen from './citizenID';
import NICScreen from './NIC';
import NIC_formScreen from './NIC_form';
import BirthCertificateScreen from './birth_certi';
import AddBirthCertificateScreen from './Add_birth_certi';
import PhotoStepScreen from './photo';
import RequestScreen from './request';
import SelectScreen from './Select_GN_DS';
import PayScreen from './pay';
import FeesScreen from './DS_Fees';
import ProgressScreen from './Progress';
import QRScreen from './End_QR';
import WelcomeScreen from './Login/WelcomeScreen';
import LoginScreen from './Login/LoginScreen';
import RegisterScreen from './Login/RegisterScreen';
import OTPScreen from './Login/OtpScreen';
import SuccessScreen from './Login/SuccessScreen';
import Dashboard from './Dashboard/main';
import Settings from './Dashboard/settings';
import AI from './Dashboard/AIHome';




//Defining route names
export type RootStackParamList = {
    Welcome: undefined;
    CitizenID: undefined;
    NIC: undefined;
    NIC_form: undefined;
    BirthCert: undefined;
    AddBirthCert: undefined;
    Photo: undefined;
    Request: undefined;
    Select: undefined;
    Fees: undefined;
    Pay: undefined;
    Progress: { citizenId: string } | undefined;
    QR: undefined;
    Login : undefined;
    Create: undefined;
    OTP: undefined;
    Success: undefined;
    Dashboard: undefined;
    Settings: undefined;
    AI: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

//use the navigator

export default function AppNavigator(){
    return(
        <NavigationContainer>
            <Stack.Navigator id={undefined} initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Create" component={RegisterScreen} />
                <Stack.Screen name="OTP" component={OTPScreen} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="AI" component={AI} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="CitizenID" component={CitizenIDScreen} />
                <Stack.Screen name='Success' component={SuccessScreen}/>
                <Stack.Screen name='NIC' component={NICScreen}/>
                <Stack.Screen name='NIC_form' component={NIC_formScreen}/>
                <Stack.Screen name='BirthCert' component={BirthCertificateScreen}/>
                <Stack.Screen name='AddBirthCert' component={AddBirthCertificateScreen}/>
                <Stack.Screen name='Photo' component={PhotoStepScreen}/>
                <Stack.Screen name='Request' component={RequestScreen}/>
                <Stack.Screen name='Select' component={SelectScreen}/>
                <Stack.Screen name='Pay' component={PayScreen}/>
                <Stack.Screen name='Fees' component={FeesScreen}/>
                <Stack.Screen name='Progress' component={ProgressScreen}/>
                <Stack.Screen name='QR' component={QRScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}