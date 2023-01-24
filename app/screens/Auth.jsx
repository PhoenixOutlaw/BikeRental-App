import { Button, SafeAreaView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { login, register } from "../redux/features/login/loginAPI";
import {
  Register_inputs,
  Signin_inputs,
  strongPasswordOpt,
} from "../constants";
import { TextInput } from "react-native-paper";
import { Gbs } from "../styles/Global.style";
import Notify from "../utils/notification";
import { useDispatch } from "react-redux";
import * as validator from "validator";
import form from "../utils/form";
import { useState } from "react";
import isEmail from "validator/lib/isEmail";

export const Auth = ({ type }) => {
  const [formvalues, setformvalues] = useState({});
  const nav = useNavigation();
  const [errors, seterrors] = useState([]);
  const dispatch = useDispatch();

  function submit() {
    if (
      (type === "signin" ? Signin_inputs : Register_inputs).length !==
      Object.keys(formvalues).length
    ) {
      Notify.error("All fields are required");
      return null;
    }
    console.log(
      validator.isStrongPassword(formvalues.password, strongPasswordOpt)
    );
    if (!validator.isEmail(formvalues.email)) {
      Notify.error("Please enter a valid email");
      return null;
    }
    if (!validator.isStrongPassword(formvalues.password, strongPasswordOpt)) {
      Notify.error(
        "Password must contain atleast a-z,1-9,*etc and min length of 8",
        { position: "bottom" }
      );
      return null;
    }

    if (type === "signin") {
      dispatch(login({ data: formvalues }));
      return null;
    }
    if (values.password !== values.repassword) {
      Notify.error("Password does not match");
      return null;
    }
    console.log(formvalues);
    // dispatch(register({data:formvalues}))
  }

  return (
    <SafeAreaView style={[Gbs.GlobalPaddingx]}>
      {/* <Text>{type === "signin" ? "signin" : "register"}</Text> */}
      <View style={[Gbs.SafeArea, Gbs.center]}>
        <Text
          style={[
            {
              fontFamily: "RubikDistressed-Regular",
            },
          ]}
          className="text-6xl mb-12 text-center capitalize text-basecolor-default"
        >
          {type === "signin" ? "login" : "register"}
        </Text>

        <View className="flex flex-row justify-center">
          <View className="w-5/6 pb-7">
            {(type === "signin" ? Signin_inputs : Register_inputs).map(
              (e, i) => (
                <TextInput
                  key={i}
                  className="mb-6"
                  style={[Gbs.text_style1]}
                  // error={true}
                  onChangeText={(value) => {
                    form({
                      object:
                        type === "signin" ? Signin_inputs : Register_inputs,
                      field: `${e.field}`,
                      value: value,
                      setvalues: setformvalues,
                    });
                  }}
                  key={i}
                  secureTextEntry={e.opt.type === "password"}
                  Type="outlined"
                  outlined
                  label={e.field.toUpperCase()}
                  placeholder={e.placeholder}
                />
              )
            )}
            <TouchableOpacity>
              <Button
                title="submit"
                color={Gbs.basecolor.color}
                onPress={submit}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text className="capitalize text-center text-basecolor-default text-base ">
          {type === "signin"
            ? "Dont have a account  / "
            : "already have an account  / "}
          <Text
            className="text-black"
            onPress={() =>
              nav.navigate(type === "signin" ? "Register" : "Signin")
            }
          >
            {type === "signin" ? "register" : "login"}
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};
