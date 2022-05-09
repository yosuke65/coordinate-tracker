//@ts-nocheck
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import {FontAwesome} from '@expo/vector-icons';

const AccountScreen = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{top:'always'}}>
      <Text style={{ fontSize: 48 }}>Account Screen</Text>
      <Spacer>
        <Button title="Sign Out" onPress={signOut} />
      </Spacer>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  title: 'Account',
  tabBarIcon: <FontAwesome name='gear' size={20}/>
}

const styles = StyleSheet.create({});

export default AccountScreen;
