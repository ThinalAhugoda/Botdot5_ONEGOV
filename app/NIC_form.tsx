import { ScrollView, 
  StyleSheet, 
  Text,
  View, 
  TouchableOpacity, 
  TextInput,
  Alert,
  Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, {startTransition, useState} from 'react';
import { useImageUpload } from '../src/hooks/useImageUpload';
import { Client, Databases, ID } from "appwrite";
import { Client as nativeClient, Storage as nativeStorage, ID as nativeID } from 'react-native-appwrite';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './Navigation';

const NIC_form = () => {
const [female, FemaleChecked] = useState(false);
const [male, MaleChecked] = useState(false);
const [married, marriedChecked] = useState(false);
const [single, singleChecked] = useState(false);  
const [widowed, widowedChecked] = useState(false);
const [divorced, divorcedChecked] = useState(false);
const [lost, lostchecked] = useState(false);
const [change, changeChecked] = useState(false);
const [renew, renewchecked] = useState(false);
const [damaged, damagedChecked] = useState(false);
const [declare, declareChecked] = useState(false);
const [notdeclare, notdeclareChecked] = useState(false);

{/* variable assigns */}
const [familySinhala, set_familySinhala] = useState({familyName: '', name: '', surname: ''})
const [familyEnglish, set_familyEnglish] = useState({familyName: '', name: '', surname: ''})
const [nameCard, set_nameCard] = useState({familyName: '', name: '', surname: ''})
const [gender, set_gender] = useState({male: false, female: false})
const [civil, set_civil] = useState({married: false, single: false, widowed: false, divorced: false})
const [profession, set_profession] = useState({profession: ''})
const [dob, set_dob] = useState({y1:'', y2:'', y3:'', y4:'', m1:'', m2:'', d1:'', d2:''})
const [dobString, set_dobString] = useState({certificate: '', place: '', division: '', district: ''})
const [dobOutside, set_dobOutside] = useState({country: '', city: '', certificate: ''})
const [residence, set_residence] = useState({name: '', buildingName: '', road: '', village: '', postal: '' })
const [citizenshipNumber, set_citizenshipNumber] = useState({number: ''})
const [cityCertIssue, set_cityCertIssue] = useState({y1:'', y2:'', y3:'', y4:'', m1:'', m2:'', d1:'', d2:''})
const [purpose, set_purpose] = useState({lost: false, changes: false, renew: false, damaged: false})
const [lastNumber , set_lastNumber] = useState({number: ''})
const [dateOfLast, set_DateOfLast] = useState({y1:'', y2:'', y3:'', y4:'', m1:'', m2:'', d1:'', d2:''})
const [station, set_station] = useState({name: ''})
const [policeReport, set_policeReport] = useState({y1:'', y2:'', y3:'', y4:'', m1:'', m2:'', d1:'', d2:''})
const [inquiries, set_inquiries] = useState({telephone: '', residence: '', mobile: '', email: ''})
const [declare1, set_declare1] = useState({number: ''})
const [declare2, set_declare2] = useState({reportNumber: ''})
const [iHaveDeclare, set_iHaveDeclare] = useState({declareYes: false, declareNo: false})
const [date, set_date] = useState({y1:'', y2:'', y3:'', y4:'', m1:'', m2:'', d1:'', d2:''})

const [imageFile, set_imageFile] = useState<any>(null) // variable which holds the image
const [imageFileName, set_imageFileName] = useState<any>(null) // variable which holds the name of the image
const [outsideFileId, set_outisdeFileId] = useState({id: ''}) // variable which holds the signature ID
const [createdCitizenId, setCreatedCitizenId] = useState<string | null>(null)
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();



 /* Prepare the data which are to be sent */
const data = {
  UserID: 9,
  FamilyNameSIN: familySinhala.familyName,
  NameSin: familySinhala.name,
  SurnameSIN: familySinhala.surname,
  FamilyNameEN: familyEnglish.familyName,
  NameEN: familyEnglish.name,
  SurnameEN: familyEnglish.surname,
  FamilyNameDif: nameCard.familyName,
  NameDif: nameCard.name,
  SurnameDif: nameCard.surname,
  Civilstatus: Object.keys(civil).find(
    (key) => civil[key as keyof typeof civil] === true),
  Profession: profession.profession,
  DOB: `${dob.d1}${dob.d2}-${dob.m1}${dob.m2}-${dob.d1}${dob.y2}${dob.y3}${dob.y4}`,
  BirthCertificateNO: dobString.certificate,
  PlaceOfBirth: dobString.place,
  Division: dobString.division,
  District: dobString.district,
  CountryOfBirth: dobOutside.country,
  City: dobOutside.city,
  CertificateNo: dobOutside.certificate,
  HouseNo: residence.name,
  TypeOfTheHouse: residence.buildingName,
  Road: residence.road,
  Village: residence.village,
  Gender: Object.keys(gender).find(
    (key) => gender[key as keyof typeof gender] === true),
  PostalCode: parseInt(residence.postal, 10),
  CitizenCertificateNo: citizenshipNumber.number,
  DateOfCitizenCertificate: `${cityCertIssue.d1}${cityCertIssue.d2}-${cityCertIssue.m1}${cityCertIssue.m2}-${cityCertIssue.y1}${cityCertIssue.y2}${cityCertIssue.y3}${cityCertIssue.y4}`,
  PurposeOfApplication: Object.keys(purpose).find(
    (key) => purpose[key as keyof typeof purpose] === true), 
  LostNICNumber: lastNumber.number,
  DateOfLostNic: `${dateOfLast.d1}${dateOfLast.d2}-${dateOfLast.m1}${dateOfLast.m2}-${dateOfLast.y1}${dateOfLast.y2}${dateOfLast.y3}${dateOfLast.y4}`,
  NameOfPolice: station.name,
  DateOfPoliceReport: `${policeReport.d1}${policeReport.d2}-${policeReport.m1}${policeReport.m2}-${policeReport.y1}${policeReport.y2}${policeReport.y3}${policeReport.y4}`,
  Residence: inquiries.residence,
  Mobile: parseInt(inquiries.mobile, 10),
  Email: inquiries.email,
  Decleration: iHaveDeclare.declareYes ? true : false, // Sends true if declareYes is true, otherwise false
  Date: `${date.d1}${date.d2}-${date.m1}${date.m2}-${date.y1}${date.y2}${date.y3}${date.y4}`,
  inquiriesTelephone: parseInt(inquiries.telephone, 10),
  signatureID: outsideFileId.id
}

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('689da5b30029c853a500');
const databases = new Databases(client);

/* send info to database */
async function sendDataFunc() {
  try {
    // Log the data object to verify its contents
    console.log('Sending data:', data);

    const sendData = await databases.createDocument(
      '689dcd030009014fa515', // Replace with your actual database ID
      '689eff02003552b94970', // Replace with your actual collection ID
      ID.unique(),
      data,
    );

    console.log('Document created successfully:', sendData);
    const newId = (sendData as any)?.$id ?? (sendData as any)?.id;
    setCreatedCitizenId(newId ?? null);
    Alert.alert('Information submitted successfully!');
    // Navigate to Progress and pass the created document id
    if (newId) {
      navigation.navigate('Progress', { citizenId: newId });
    } else {
      console.warn('No document id returned from Appwrite');
    }
  } catch (error) {
    console.error('Error creating document:', error);
    Alert.alert('Failed to submit information. Please try again.');
  }
};  

/* main function to set the mage  */
const {pickImage} = useImageUpload(); 
const onPressHandler = async () => {
  const image = await pickImage();

  if (image) {
    set_imageFile(image)
    console.log('Image successfully received:', image)
    set_imageFile(image); 
    set_imageFileName(image.name);
    
    sendImage(image.uri, image.name)
  }
}

/* send image to bucket */
async function sendImage(imageFile: any, imageFileName: any) {
  const fileId = nativeID.unique();
  set_outisdeFileId({id: fileId})

  const client2 = new nativeClient()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('689da5b30029c853a500');

  const storages2 = new nativeStorage(client2);

  try {
    console.log('Sending image to bucket...')

    const Promise = await storages2.createFile(
      '689e1cbf002bf73a9b8e', // Bucket ID 
      fileId, // New file ID
      {
        name: imageFileName,
        type: 'jpeg/png',
        size: 12345, 
        uri: imageFile, 
      }
    );
    console.log('Image has been sent successfully:', Promise);
  } catch (e) {
    console.error('Error sending image to bucket:', e);
  }
}

function showlog(){ // used for debug
  console.log(dob.y1)
  return dob.y1
}

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonColor}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Application for NIC</Text>
      </View>

      {/* Progress Step Bar */}
      <View style={styles.stepBar}>
        {["NIC Form", "Birth certificate", "Photo", "Request"].map((label, index) => (
          <View key={index} style={styles.stepItem}>
            <View
              style={[
                styles.stepCircle,
                index < 1
                  ? { backgroundColor: "#166EFF" } // completed
                  : { backgroundColor: "#FFD700" } // upcoming
              ]}
            >
              {index < 1 ? (
                <Ionicons name="checkmark" size={14} color="#fff" />
              ) : (
                <Text style={styles.stepNumber}>{index + 1}</Text> // now 2, 3, 4
              )}
            </View>
            <Text style={styles.stepLabel}>{label}</Text>
          </View>
        ))}
      </View>

      {/* Form starts */}
      <View style={styles.formContainer}>
        {/* Name in Full (Sinhala/Tamil) */}
        <Text style={styles.bigQuestion}>1. Name in Full (in Sinhala or Tamil)</Text>
        <Text style={styles.smallQuestionWithBig}>Family Name</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" 
          value = {familySinhala.familyName} onChangeText={(text) => set_familySinhala({...familySinhala, familyName: text})}/>
        </View>
        <Text style={styles.smallQuestionWithBig}>Name</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" 
          value = {familySinhala.name} onChangeText={(text) => set_familySinhala({...familySinhala, name: text})}/>
        </View>
        <Text style={styles.smallQuestionWithBig}>Surname</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here"
          value = {familySinhala.surname} onChangeText={(text) => set_familySinhala({...familySinhala, surname: text})}/>
        </View>

        {/* Name in Full (English) */}
        <Text style={styles.bigQuestion}>2. Name in Full (in English)</Text>
        <Text style={styles.smallQuestionWithBig}>Family Name</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" 
          value = {familyEnglish.familyName} onChangeText={(text) => set_familyEnglish({...familyEnglish, familyName: text})}/>
        </View>
        <Text style={styles.smallQuestionWithBig}>Name</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" 
          value = {familyEnglish.name} onChangeText={(text) => set_familyEnglish({...familyEnglish, name: text})}/>
        </View>
        <Text style={styles.smallQuestionWithBig}>Surname</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" 
          value = {familyEnglish.surname} onChangeText={(text) => set_familyEnglish({...familyEnglish, surname: text})}/>
        </View>

        {/* Name on Card */}
        <Text style={styles.bigQuestion}>3. Name to be appeared in the Card (if name differs from above)</Text>
        <Text style={styles.smallQuestionWithBig}>Family Name</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" 
          value = {nameCard.familyName} onChangeText={(text) => set_nameCard({...nameCard, familyName: text})}/>
        </View>
        <Text style={styles.smallQuestionWithBig}>Name</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" 
          value = {nameCard.name} onChangeText={(text) => set_nameCard({...nameCard, name: text})}/>
        </View>
        <Text style={styles.smallQuestionWithBig}>Surname</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" 
          value = {nameCard.surname} onChangeText={(text) => set_nameCard({...nameCard, surname: text})}/>
        </View>

        {/* Gender */}
        <Text style={styles.bigQuestion}>4. Gender</Text>
        <View style={{flexDirection:'row'}}>

          <Text style={styles.smallQuestionWithBig}>Female</Text>
          <TouchableOpacity onPress={() => (FemaleChecked(true), MaleChecked(false), set_gender({male: false, female: true}))} 
          style={[styles.box_unchecked, female && styles.box_checked]}>
            {female && <Text style={styles.tickMark}>✓</Text>}
          </TouchableOpacity>

          <Text style={[styles.smallQuestion, {marginLeft: 100}]}>Male</Text>
          <TouchableOpacity onPress={() => (FemaleChecked(false), MaleChecked(true), set_gender({male: true, female: false}))}
          style={[styles.box_unchecked, male && styles.box_checked]}>
            {male && <Text style={styles.tickMark}>✓</Text>}
          </TouchableOpacity>
        </View>

        {/* Civil status */}
        <Text style={styles.bigQuestion}>5. Civil status</Text>
        <View style={{flexDirection:'row'}}>

          <Text style={styles.smallQuestionWithBig}>Married</Text>
          <TouchableOpacity 
          onPress={() => (marriedChecked(true), singleChecked(false), widowedChecked(false), divorcedChecked(false), 
            set_civil({married: true, single: false, widowed: false, divorced: false}))}
          style={[styles.box_unchecked, married && styles.box_checked]}>
            {married && <Text style={styles.tickMark}>✓</Text>}
          </TouchableOpacity>

          <Text style={[styles.smallQuestionWithBig, {marginLeft: 100}]}>Single</Text>
          <TouchableOpacity 
          onPress={() => (marriedChecked(false), singleChecked(true), widowedChecked(false), divorcedChecked(false), 
            set_civil({married: false, single: true, widowed: false, divorced: false}))}
          style={[styles.box_unchecked, single && styles.box_checked]}>
            {single && <Text style={styles.tickMark}>✓</Text>}
          </TouchableOpacity>
        </View>
        <View style={[{flexDirection:'row'}, {paddingTop: 20}]}>

          <Text style={styles.smallQuestionWithBig}>Widowed</Text>
          <TouchableOpacity  
          onPress={() => (marriedChecked(false), singleChecked(false), widowedChecked(true), divorcedChecked(false), 
            set_civil({married: false, single: false, widowed: true, divorced: false}))}
          style={[styles.box_unchecked, widowed && styles.box_checked]}>
            {widowed && <Text style={styles.tickMark}>✓</Text>}
          </TouchableOpacity>

          <Text style={[styles.smallQuestionWithBig, {marginLeft: 92}]}>Divorced</Text>
          <TouchableOpacity  
          onPress={() => (marriedChecked(false), singleChecked(false), widowedChecked(false), divorcedChecked(true), 
            set_civil({married: false, single: false, widowed: false, divorced: true}))}
          style={[styles.box_unchecked, divorced && styles.box_checked]}>
            {divorced && <Text style={styles.tickMark}>✓</Text>}
          </TouchableOpacity>
        </View>

        {/* Profession/Occupation */}
        <Text style={styles.bigQuestion}>6. Profession/Occupation</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_profession({profession: text})}/>
        </View>

        {/* Details of birth */}
        <Text style={styles.bigQuestion}>7. Details of Birth</Text>
        <Text style={styles.smallQuestionWithBig}>Date of Birth</Text>
        <View style={[{flexDirection:'row'}, {paddingTop: 20}]}>
          <TextInput style={styles.smallInfoContainer} placeholder='Y' onChangeText={(text) => set_dob({...dob, y1: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='Y' onChangeText={(text) => set_dob({...dob, y2: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='Y' onChangeText={(text) => set_dob({...dob, y3: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='Y' onChangeText={(text) => set_dob({...dob, y4: text})}/>

          <TextInput style={[styles.smallInfoContainer, {marginLeft:20}]} placeholder='M' onChangeText={(text) => set_dob({...dob, m1: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='M' onChangeText={(text) => set_dob({...dob, m2: text})}/>

          <TextInput style={[styles.smallInfoContainer, {marginLeft:20}]} placeholder='D' onChangeText={(text) => set_dob({...dob, d1: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='D' onChangeText={(text) => set_dob({...dob, d2: text})}/>
        </View>
        
        <Text style={styles.smallQuestionWithBig}>Birth Certificate No.</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here"  onChangeText={(text) => set_dobString({...dobString, certificate: text})}/>
        </View>
        <Text style={styles.smallQuestionWithBig}>place of Birth</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_dobString({...dobString, place: text})}/>
        </View>
        <Text style={styles.smallQuestionWithBig}>Division</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_dobString({...dobString, division: text})}/>
        </View>
        <Text style={styles.smallQuestionWithBig}>District</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_dobString({...dobString, district: text})}/>
        </View>

        <Text style={styles.smallQuestion}>
          If the applicant is born outside of Sri Lanka, 
          details of Citizenship Certificate issued 
          under section 5(2) of the Citizenship Act, 
          No. 18 of 1948
        </Text>

        <Text style={styles.smallQuestionWithBig}>Country of Birth</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_dobOutside({...dobOutside, country: text})}/>
        </View>
        <Text style={styles.smallQuestionWithBig}>City</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_dobOutside({...dobOutside, city: text})}/>
        </View>
        <Text style={styles.smallQuestionWithBig}>Certificate No.</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_dobOutside({...dobOutside, certificate: text})}/>
        </View>

        {/* Details of residence */}
        <Text style={styles.bigQuestion}>8. Details of Residence</Text>
        <Text style={styles.smallQuestion}>Permanent Address</Text>

        <Text style={styles.smallQuestionWithBig}>Name or number of the House</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_residence({...residence, name: text})}/>
        </View>
        <Text style={styles.smallQuestionWithBig}>
          Name of Condominium, flat, scheme, quarters, 
          estate or any other buildings
        </Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_residence({...residence, buildingName: text})}/>
        </View>
        <Text style={styles.smallQuestionWithBig}>Road/Street/Lane/Place/Garden</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_residence({...residence, road: text})}/>
        </View>
        <Text style={styles.smallQuestionWithBig}>Village/City</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_residence({...residence, village: text})}/>
        </View>
        <Text style={styles.smallQuestionWithBig}>Postal Code</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_residence({...residence, postal: text})}/>
        </View>

                {/* Citizenship certificate */}
        <Text style={styles.bigQuestion}>
          9. Details of Citizenship Certificate
          or Dual Citizenship Certificate 
        </Text>
                <Text style={styles.smallQuestionWithBig}>Certificate Number</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_citizenshipNumber({...citizenshipNumber, number: text})}/>
        </View>

                <Text style={styles.smallQuestionWithBig}>Date of issue of Certificate</Text>
        <View style={[{flexDirection:'row'}, {paddingTop: 20}]}>
          <TextInput style={styles.smallInfoContainer} placeholder='Y' onChangeText={(text) => set_cityCertIssue({...cityCertIssue, y1: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='Y' onChangeText={(text) => set_cityCertIssue({...cityCertIssue, y2: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='Y' onChangeText={(text) => set_cityCertIssue({...cityCertIssue, y3: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='Y' onChangeText={(text) => set_cityCertIssue({...cityCertIssue, y4: text})}/>

          <TextInput style={[styles.smallInfoContainer, {marginLeft:20}]} placeholder='M' onChangeText={(text) => set_cityCertIssue({...cityCertIssue, m1: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='M' onChangeText={(text) => set_cityCertIssue({...cityCertIssue, m2: text})}/>

          <TextInput style={[styles.smallInfoContainer, {marginLeft:20}]} placeholder='D' onChangeText={(text) => set_cityCertIssue({...cityCertIssue, d1: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='D' onChangeText={(text) => set_cityCertIssue({...cityCertIssue, d2: text})}/>
        </View>

                        {/* Citizenship certificate */}
        <Text style={styles.bigQuestion}>
        10. If the duplicate of the Identity 
        Card is applied for, please do complete
        section No. 10
        </Text>
                <Text style={styles.smallQuestionWithBig}>Purpose of Application</Text>
        <View style={{flexDirection:'row'}}>

          <Text style={[styles.smallQuestionWithBig, {marginRight: -20}]}>if the Identity{'\n'}Card is lost</Text>
          <TouchableOpacity  
          onPress={() => (lostchecked(true), changeChecked(false), renewchecked(false), damagedChecked(false),
            set_purpose({lost: true, changes: false, renew: false, damaged: false}))}
          style={[styles.box_unchecked, lost && styles.box_checked, {marginTop: 5} ]}>
            {lost && <Text style={styles.tickMark}>✓</Text>}
          </TouchableOpacity>

          <Text style={[styles.smallQuestionWithBig, {marginLeft: 70}]}>to make{'\n'}changes</Text>
          <TouchableOpacity  
          onPress={() => (lostchecked(false), changeChecked(true), renewchecked(false), damagedChecked(false),
            set_purpose({lost: false, changes: true, renew: false, damaged: false}))}
          style={[styles.box_unchecked, change && styles.box_checked, {marginTop: 2}]}>
            {change && <Text style={styles.tickMark}>✓</Text>}
          </TouchableOpacity>
        </View>
        <View style={[{flexDirection:'row'}, {paddingTop: 20}]}>

          <Text style={[styles.smallQuestionWithBig, {marginLeft: 0}]}>to renew the{'\n'}period of validity</Text>
          <TouchableOpacity  
          onPress={() => (lostchecked(false), changeChecked(false), renewchecked(true), damagedChecked(false),
            set_purpose({lost: false, changes: false, renew: true, damaged: false}))}
          style={[styles.box_unchecked, renew && styles.box_checked, {marginTop: 2}]}>
            {renew && <Text style={styles.tickMark}>✓</Text>}
          </TouchableOpacity>

          <Text style={[styles.smallQuestionWithBig, {marginLeft: 27}]}>damaged/{'\n'}defaced/illegible</Text>
          <TouchableOpacity  
          onPress={() => (lostchecked(false), changeChecked(false), renewchecked(false), damagedChecked(true),
            set_purpose({lost: false, changes: false, renew: false, damaged: true}))}
          style={[styles.box_unchecked, damaged && styles.box_checked, {marginTop: 2}]}>
            {damaged && <Text style={styles.tickMark}>✓</Text>}
          </TouchableOpacity>
        </View>

                        <Text style={[styles.smallQuestionWithBig, {paddingTop: 10}]}>Lost or last obtained Identity Card Number</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_lastNumber({...lastNumber, number: text})}/>
        </View>
                        <Text style={styles.smallQuestionWithBig}>Date of issue of the Identity Card</Text>
        <View style={[{flexDirection:'row'}, {paddingTop: 20}]}>
          <TextInput style={styles.smallInfoContainer} placeholder='Y' onChangeText={(text) => set_DateOfLast({...dateOfLast, y1: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='Y' onChangeText={(text) => set_DateOfLast({...dateOfLast, y2: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='Y' onChangeText={(text) => set_DateOfLast({...dateOfLast, y3: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='Y' onChangeText={(text) => set_DateOfLast({...dateOfLast, y4: text})}/>

          <TextInput style={[styles.smallInfoContainer, {marginLeft:20}]} placeholder='M' onChangeText={(text) => set_DateOfLast({...dateOfLast, m1: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='M' onChangeText={(text) => set_DateOfLast({...dateOfLast, m2: text})}/>

          <TextInput style={[styles.smallInfoContainer, {marginLeft:20}]} placeholder='D' onChangeText={(text) => set_DateOfLast({...dateOfLast, d1: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='D' onChangeText={(text) => set_DateOfLast({...dateOfLast, d2: text})}/>
        </View>

        <Text style={styles.smallQuestionWithBig}>Details of the police report or other document pertaining to the lost Identity Card</Text>
                                <Text style={styles.smallQuestionWithBig}>Name of the Police Station</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_station({...station, name: text})}/>
        </View>
                                <Text style={styles.smallQuestionWithBig}>Date of the issue of the Police report</Text>
        <View style={[{flexDirection:'row'}, {paddingTop: 20}]}>
          <TextInput style={styles.smallInfoContainer} placeholder='Y' onChangeText={(text) => set_policeReport({...policeReport, y1: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='Y' onChangeText={(text) => set_policeReport({...policeReport, y2: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='Y' onChangeText={(text) => set_policeReport({...policeReport, y3: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='Y' onChangeText={(text) => set_policeReport({...policeReport, y4: text})}/>

          <TextInput style={[styles.smallInfoContainer, {marginLeft:20}]} placeholder='M' onChangeText={(text) => set_policeReport({...policeReport, m1: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='M' onChangeText={(text) => set_policeReport({...policeReport, m2: text})}/>

          <TextInput style={[styles.smallInfoContainer, {marginLeft:20}]} placeholder='D' onChangeText={(text) => set_policeReport({...policeReport, d1: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='D' onChangeText={(text) => set_policeReport({...policeReport, d2: text})}/>
        </View>

                                {/* 11. required inquires */}
        <Text style={styles.bigQuestion}>11. Details required for inquiries</Text>
        <Text style={styles.smallQuestionWithBig}>Teleophone No</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_inquiries({...inquiries, telephone: text})}/>
        </View>
                <Text style={styles.smallQuestionWithBig}>Residence</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_inquiries({...inquiries, residence: text})}/>
        </View>
                <Text style={styles.smallQuestionWithBig}>Mobile</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_inquiries({...inquiries, mobile: text})}/>
        </View>
                        <Text style={styles.smallQuestionWithBig}>E-mail</Text>
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_inquiries({...inquiries, email: text})}/>
        </View>
        
        {/* agreement */}
        <Text style={styles.bigQuestion}>Declaration of the Applicant</Text>
        <Text style={styles.smallQuestion}>
          1. I declare that I am a citizen of Sri Lanka;{'\n\n'}
          2. I declare that I have read and understood the instructions manual attached here to before completing this application form ;{'\n\n'}
          3. I enclose two copies of my photographs ;{'\n\n'}
          4. Select whichever is applicable{'\n'}--------------------------------------------------------------------------------------------{'\n'}
          I hereby hand over the Identity Card bearing number
        </Text>
                <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_declare1({...declare1, number: text})}/>
        </View>
                <Text style={styles.smallQuestion}>
          --------------------------------------------------------------------------------------------{'\n'}
          Police report obtained in lieu of the lost Identity Card bearing number 
        </Text>
                        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Type Here" onChangeText={(text) => set_declare2({...declare2, reportNumber: text})}/>
        </View>
                        <Text style={styles.smallQuestion}>
          --------------------------------------------------------------------------------------------{'\n'}
          to the certifying officer;{'\n\n'}
          5. Select whichever is applicable
        </Text>

        <View style={{flexDirection:'row'}}>
          <Text style={[styles.smallQuestion, {marginTop: 5}]}>I declare that I have</Text>
          <TouchableOpacity 
          onPress={() => (declareChecked(true), notdeclareChecked(false),
            set_iHaveDeclare({declareYes: true, declareNo: false}))}
          style={[styles.box_unchecked, declare && styles.box_checked, {marginTop: 2}, {marginLeft: 53.5}]}>
            {declare && <Text style={styles.tickMark}>✓</Text>}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row'}}>
          <Text style={[styles.smallQuestion, {marginTop: 5}]}>I declare that i have not</Text>
          <TouchableOpacity  
          onPress={() => (declareChecked(false), notdeclareChecked(true),
            set_iHaveDeclare({declareYes: false, declareNo: true}))}
          style={[styles.box_unchecked, notdeclare && styles.box_checked, {marginTop: 2}]}>
            {notdeclare && <Text style={styles.tickMark}>✓</Text>}
          </TouchableOpacity>
        </View>
                                <Text style={styles.smallQuestion}>
        made any other application previous to this application ;{'\n\n'}
        6. I hereby declare that the particulars given above are true and accurate to the best of my knowledge and belief ;{'\n\n'}
        7. I do hereby certify that all the documents furnished along with this application form 
        are true and accurate to the best of my knowledge and belief and they have not being subjected 
        to forgery or alterations in order to conceal true details and also I am eligible to apply for 
        and identity card/ duplicate card upon registration under the provision of Registration of Persons 
        Act. I am aware of the fact that furnishing of incorrect details, information or documents is a punishable offence.
        </Text>

                                        <Text style={styles.smallQuestionWithBig}>Date</Text>
        <View style={[{flexDirection:'row'}, {paddingTop: 20}]}>
          <TextInput style={styles.smallInfoContainer} placeholder='Y' onChangeText={(text) => set_date({...date, y1: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='Y' onChangeText={(text) => set_date({...date, y2: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='Y' onChangeText={(text) => set_date({...date, y3: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='Y' onChangeText={(text) => set_date({...date, y4: text})}/>

          <TextInput style={[styles.smallInfoContainer, {marginLeft:20}]} placeholder='M' onChangeText={(text) => set_date({...date, m1: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='M' onChangeText={(text) => set_date({...date, m2: text})}/>

          <TextInput style={[styles.smallInfoContainer, {marginLeft:20}]} placeholder='D' onChangeText={(text) => set_date({...date, d1: text})}/>
          <TextInput style={styles.smallInfoContainer} placeholder='D' onChangeText={(text) => set_date({...date, d2: text})}/>
        </View>
                <Text style={styles.bigQuestion}>Signature or left thumb impression of the applicant</Text>
        <View>
          <TouchableOpacity style={[styles.uploadSignature, {marginTop: 10}]} onPress={onPressHandler}>
            <Text style={styles.signatureText}>Upload your Signature</Text>
          </TouchableOpacity>

            {/* Show image here 
            {imageFile && (
              <View style={{ alignItems: 'center', marginVertical: 10 }}>
                <Image
                  source={{ uri: imageFile.uri }}
                  style={{ width: 200, height: 100, resizeMode: 'contain' }}
                />
              </View>
            )}
            */}

          <TouchableOpacity style={[styles.checkoutButton, {marginTop: 10}]} onPress={sendDataFunc}>
            <Text style={[styles.continue, {marginTop: 5}]}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.checkoutButton, {marginTop: 10}]} onPress={() => navigation.navigate('BirthCert' as never)}>
            <Text style={[styles.continue, {marginTop: 5}]}>Continue</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
};

export default NIC_form;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 35,
  },
  scrollContent: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingBottom: 50,
  },
  headerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Poppins',
    marginTop: -20,
  },
  backButton: {
    fontSize: 12,
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
  backButtonColor: {
    color: '#006FFD'
  },
  stepBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    paddingVertical: 16,
    marginTop: -10
  },
  stepItem: {
    alignItems: "center",
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  stepNumber: {
    color: "#fff",
    fontWeight: "700",
  },
  stepLabel: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  formContainer: {
    width: '100%',
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
  },
  smallQuestion:{
    fontSize: 14,
    marginBottom: 5,
  },
  infoContainer: {
    borderWidth: 1,        
    borderColor: '#b7b8bbff',  
    borderRadius: 12,          
    paddingHorizontal: 10,    
    paddingVertical: 8,       
    backgroundColor: '#FFFFFF', 
    width: '100%',
    marginBottom: 15,
  },
  smallInfoContainer: {
    borderWidth: 1,        
    borderColor: '#b7b8bbff',  
    borderRadius: 8,          
    paddingHorizontal: 10,    
    paddingVertical: 2,       
    backgroundColor: '#FFFFFF', 
    width: 33,
    height: 33,
    marginTop: -10,
    marginBottom: 15,
    marginLeft: 5
  },
  input: {
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
    borderWidth: 1,        
    borderColor: '#b7b8bbff',  
    borderRadius: 12,          
    paddingHorizontal: 10,    
    paddingVertical: 8,       
    backgroundColor: '#1976F3', 
    width: '100%',
    height: 50,
    marginBottom: 15,
  },
  uploadSignature: {
    borderWidth: 1,        
    borderColor: '#b7b8bbff',  
    borderRadius: 12,          
    paddingHorizontal: 10,    
    paddingVertical: 8,       
    backgroundColor: '#FFFFFF', 
    width: '100%',
    marginBottom: 15,
  },  
  signatureText: {
    textAlign: 'center',
    color: '#8a8a8eff',
    fontSize: 16,
    fontWeight: '600',
  },
  continue: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
