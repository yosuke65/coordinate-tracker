//@ts-nocheck
import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";

const SignInScreen = () => {
  const { state, signIn, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={clearErrorMessage}
        onWillBlur={clearErrorMessage}
      />
      <AuthForm
        headerText="Sign In to your Account"
        errorMessage={state.errorMessage}
        onSubmit={signIn}
        submitButtonText="Sign In"
      />
      <NavLink
        text="Don't have an account? Sign Up instead"
        routeName="SignUp"
      />
    </View>
  );
};

SignInScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250,
  },
});

export default SignInScreen;
