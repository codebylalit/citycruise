import React, { useContext, useState } from "react";
import {
  Modal,
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import AuthContext from "./authContext";
import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "./userAuth";
import * as ImagePicker from "expo-image-picker"; // Import expo-image-picker
import {
  getStorage,
  ref,
  uploadString,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import tw from "tailwind-react-native-classnames";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import HomeScreen from "../Screens/HomeScreen";
import { useEffect } from "react";

const AuthenticationModal = () => {
  const [type, setType] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageURL, setProfileImageURL] = useState(null); // Define profileImageURL state
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Define isLoggedIn state
  const [newMobileNumber, setNewMobileNumber] = useState("");


  useEffect(() => {
    // Load isLoggedIn state from AsyncStorage when component mounts
    AsyncStorage.getItem("isLoggedIn").then((value) => {
      setIsLoggedIn(value === "true");
    });
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await loginWithEmailAndPassword(email, password);
      setCurrentUser(res.user);
      setIsLoggedIn(true);
      // Save isLoggedIn state to AsyncStorage on successful login
      AsyncStorage.setItem("isLoggedIn", "true");
    } catch (error) {
      console.error("Login error:", error.message);
      Alert.alert("Login Failed", "Incorrect email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setCurrentUser(null);
    ToastAndroid.show("Logged Out Successfully", ToastAndroid.BOTTOM);
  };
  const handleRegister = async () => {
    setLoading(true);
    if (password.length < 6) {
      Alert.alert(
        "Password Too Short",
        "Password should be at least 6 characters long."
      );
      setLoading(false);
      return;
    }
    try {
      const res = await registerWithEmailAndPassword(name, email, password);
      if (res.success === true) {
        setCurrentUser({ name, email });
        // setModalVisible(false);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Registration error:", error.message);
      Alert.alert("Registration Failed", "Failed to register user.");
    } finally {
      setLoading(false);
    }
  };

  const storage = getStorage();
const handleChoosePhoto = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permission denied for accessing the photo library.");
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.cancelled) {
      console.log("Image selection cancelled by the user.");
      return;
    }

    if (!result.uri) {
      throw new Error("No image URI returned.");
    }

    setProfileImage(result.uri);
    uploadProfileImage(result.uri);
  } catch (error) {
    console.error("Error choosing photo:", error);
    Alert.alert(
      "Photo Selection Error",
      "Failed to choose photo. Please try again."
    );
  }
};
const handleAddMobileNumber = async () => {
  setLoading(true);
  try {
    // Update phone number in Firestore
    await updateUserPhoneNumber(currentUser.uid, newMobileNumber);
    setCurrentUser({ ...currentUser, phoneNumber: newMobileNumber });
    setShowAddMobileNumberModal(false);
  } catch (error) {
    console.error("Error updating phone number:", error);
    Alert.alert("Update Failed", "Failed to update phone number.");
  } finally {
    setLoading(false);
  }
};
const uploadProfileImage = async (uri) => {
  try {
    if (!uri) {
      throw new Error("Invalid image URI.");
    }

    const imageRef = ref(storage, `profileImages/${currentUser.uid}`);
    const response = await fetch(uri);
    const blob = await response.blob();

    await uploadBytes(imageRef, blob);
    const downloadURL = await getDownloadURL(imageRef);
    setProfileImageURL(downloadURL);
    console.log("Image uploaded successfully:", downloadURL);
  } catch (error) {
    console.error("Error uploading image:", error);
    Alert.alert(
      "Upload Failed",
      "Failed to upload profile photo. Please try again."
    );
  }
};

  const navigation = useNavigation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      // visible={modalVisible}
      onRequestClose={() => {
        // setModalVisible(false);
      }}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
        >
          <Icon name="arrowleft" color="black" type="antdesign" />
        </TouchableOpacity>

        <View style={styles.modalContent}>
          {currentUser ? (
            <View style={styles.profileContainer}>
              <TouchableOpacity onPress={handleChoosePhoto}>
                <View style={styles.profilePhotoContainer}>
                  {profileImage ? (
                    <Image
                      source={{ uri: profileImage }}
                      style={styles.profilePhoto}
                    />
                  ) : (
                    <Text style={styles.profilePhotoText}>Upload Photo</Text>
                  )}
                </View>
              </TouchableOpacity>
              {profileImageURL && (
                <Image
                  source={{ uri: profileImageURL }}
                  style={styles.profilePhotoPreview}
                />
              )}
              <Text style={styles.profileText}>Name: {currentUser.name}</Text>
              <Text style={styles.profileText}>Email: {currentUser.email}</Text>
              <View>
                <TextInput
                  placeholder="Enter Mobile Number"
                  value={newMobileNumber}
                  onChangeText={setNewMobileNumber}
                  keyboardType="phone-pad"
                />
                <TouchableOpacity
                  onPress={handleAddMobileNumber}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <Text style={styles.label}>Password:</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
              {type === "login" ? (
                <>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#000" }]}
                    onPress={handleLogin}
                  >
                    <Text style={styles.buttonText}>Login</Text>
                  </TouchableOpacity>
                  <View style={styles.switch}>
                    <Text style={styles.switchText}>Not a User?</Text>
                    <Pressable onPress={() => setType("register")}>
                      <Text style={[styles.switchText, { fontWeight: "bold" }]}>
                        Register
                      </Text>
                    </Pressable>
                  </View>
                </>
              ) : (
                <>
                  <Text style={styles.label}>Name:</Text>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                  />
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#000" }]}
                    onPress={handleRegister}
                  >
                    <Text style={styles.buttonText}>Register</Text>
                  </TouchableOpacity>
                  <View style={styles.switch}>
                    <Text style={styles.switchText}>Already a User?</Text>
                    <Pressable onPress={() => setType("login")}>
                      <Text style={[styles.switchText, { fontWeight: "bold" }]}>
                        Login
                      </Text>
                    </Pressable>
                  </View>
                </>
              )}
            </>
          )}
          {loading && <ActivityIndicator />}
        </View>
        {isLoggedIn && (
          <View style={styles.logoutContainer}>
            <Pressable onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>Log Out</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: Dimensions.get("window").width * 0.8,
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
  switch: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  switchText: {
    color: "#666",
  },
  profileContainer: {
    alignItems: "center",
  },
  profilePhotoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePhoto: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  profilePhotoText: {
    color: "#666",
  },
  profilePhotoPreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileText: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  logoutContainer: {
    alignItems: "center",
    padding: 15,
  },
  logoutButton: {
    backgroundColor: "black",
    width: "100%",
    padding: 16,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonText:{
    backgroundColor:"black",
    padding:5,
    color:"white",
    borderRadius:2
  }
});

export default AuthenticationModal;
