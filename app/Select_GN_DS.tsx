import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Client, Databases, ID } from "appwrite";
import { useNavigation } from '@react-navigation/native';

const Select_GN_DS = () => {
  const navigation = useNavigation();
  const [gnDivision, setGnDivision] = useState({division: ''});
  const [gnDivisionNumber, setGnDivisionNumber] = useState({divisionNumber: ''});
  const [email, setEmail] = useState({email: ''});
  const [dsOffice, setDsOffice] = useState({dsOffice: ''});
  const [normal, normalChecked] = useState(false);
  const [oneday, onedayChecked] = useState(false);
  const [confirm1, confirm1checked] = useState(false);
  const [confirm2, confirm2Checked] = useState(false);

  const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('689da5b30029c853a500');
  const databases = new Databases(client);
  
  const data = {
    GNdivision: gnDivision.division,
    GNnumber: gnDivisionNumber.divisionNumber,
    email: email.email,
    DSoffice: dsOffice.dsOffice,
    NormalService: normal,
    One_dayService: oneday,
  }

  /* send info to database */
  async function sendDataFunc() {
    try {
      // Log the data object to verify its contents
      console.log('Sending data:', data);
  
      const sendData = await databases.createDocument(
        '689dcd030009014fa515', // Replace with your actual database ID
        '68a01cfb000d656768b3', // Replace with your actual collection ID
        ID.unique(),
        data,
      );
  
      console.log('Document created successfully:', sendData);
      Alert.alert('Information submitted successfully!');
    } catch (error) {
      console.error('Error creating document:', error);
      Alert.alert('Failed to submit information. Please try again.');
    }
  };  

  return (
    <SafeAreaView style={styles.scrollView}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.text}>
            Select your GN and{"\n"}DS division
          </Text>
        </View>
    
        <Text style={[styles.smallQuestionWithBig, {alignSelf:'flex-start'}]}>GN Division</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => setGnDivision({...gnDivision, division: text})}/>
        </View>
    
        <Text style={[styles.smallQuestionWithBig, {alignSelf:'flex-start'}]}>GN Division Number</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => setGnDivisionNumber({...gnDivisionNumber, divisionNumber: text})}/>
        </View>
    
        <Text style={[styles.smallQuestionWithBig, {alignSelf:'flex-start'}]}>Email alerts (optional)</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Enter your email" onChangeText={(text) => setEmail({...email, email: text})}/>
        </View>
    
        <Text style={[styles.smallQuestionWithBig, {alignSelf:'flex-start'}]}>DS office</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => setDsOffice({...dsOffice, dsOffice: text})}/>
        </View>
    
        <Text style={[styles.smallQuestionWithBig, {alignSelf:'flex-start'}]}>Services</Text>
        <View style={{flexDirection:'row'}}>
        
          <Text style={styles.smallQuestionWithBig}>Normal</Text>
          <TouchableOpacity onPress={() => (normalChecked(true), onedayChecked(false))}
          style={[styles.box_unchecked, normal && styles.box_checked, {marginTop: 5}]}>
            {normal && <Text style={styles.tickMark}>✓</Text>}
          </TouchableOpacity>
    
          <Text style={[styles.smallQuestionWithBig, {marginLeft: 40}]}>One-day</Text>
          <TouchableOpacity onPress={() => (normalChecked(false), onedayChecked(true))}
          style={[styles.box_unchecked, oneday && styles.box_checked, {marginTop: 6}]}>
            {oneday && <Text style={styles.tickMark}>✓</Text>}
          </TouchableOpacity>
        </View>
              <View style={{flexDirection:'row'}}>
          <Text style={[styles.smallQuestion, {marginTop: 20}]}>Confirm this is the correct DS office and the{'\n'}
          service type</Text>
          <TouchableOpacity onPress={() => confirm1checked(!confirm1)}
          style={[styles.box_unchecked, confirm1 && styles.box_checked, {marginTop: 20, marginRight: 10}]}>
            {confirm1 && <Text style={styles.tickMark}>✓</Text>}
          </TouchableOpacity>
        </View>
    
        <Text style={[styles.bigQuestion, {marginLeft: -30}]}>Divisional secretariat office will check</Text>
        <Text style={[styles.smallQuestion, {marginLeft: 20}]}>
          Please make sure to that you select the proper service type you want for Your NIC as well as the divisional secretariat office that your are under
        </Text>
              <Text style={[styles.bigQuestion, {marginLeft: 10}]}>Grama Niladhari will consider and approve</Text>
        <Text style={[styles.smallQuestion, {marginLeft: 20}]}>
          Please make sure to attach all the necessary document otherwise you will not be able to proceed to next steps.
          Your NIC being checked by the GN and it will go through
          GN to the Register Department
        </Text>
                    <View style={{flexDirection:'row'}}>
          <Text style={[styles.smallQuestion, {marginTop: 10}]}>Confirm this is the correct GN division that{'\n'}Im registerd
          service type</Text>
          <TouchableOpacity onPress={() => confirm2Checked(!confirm2)}
          style={[styles.box_unchecked, confirm2 && styles.box_checked, {marginTop: 10, marginRight: 0}]}>
            {confirm2 && <Text style={styles.tickMark}>✓</Text>}
          </TouchableOpacity>
        </View>
    
        {/* Buttons */}
        <View>
          <TouchableOpacity style={[styles.checkoutButton, {marginTop: 10}]} onPress={() => {sendDataFunc; navigation.navigate('Fees' as never)}}>
            <Text style={styles.checkoutText}>Request</Text>
          </TouchableOpacity>
    
          <TouchableOpacity>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Select_GN_DS;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 50,
  },
  container: {
    backgroundColor: "#007BFF",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 250
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#CCCDD2',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 0, // Picker looks better without extra padding
    backgroundColor: '#FFFFFF',
    width: '90%',
    marginBottom: 5,
  },
  bigQuestion: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  smallQuestionWithBig: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    paddingHorizontal: 25,
  },
  smallQuestion:{
    fontSize: 14,
    marginBottom: 5,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
  },
  picker: {
    width: '100%',
  },
  box_unchecked: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#b7b8bbff',
    marginTop: -3,
    marginLeft: 30
  },
  box_checked: {
    width: 30,
    height: 30,
    backgroundColor: '#006FFD',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#b7b8bbff',
    marginTop: -3,
    marginLeft: 30,
    justifyContent: 'center',  // centers vertically
    alignItems: 'center',
  },
  tickMark: {
    color: 'white',
    fontSize: 12,
    alignContent: 'center'
  },
  checkoutButton: {
    backgroundColor: '#1976F3',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: 380
  },
  checkoutText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelText: {
    textAlign: 'center',
    color: '#FFC107',
    fontSize: 15,
    fontWeight: '500',
  },
});
