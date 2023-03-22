import { StyleSheet } from "react-native-web";

const elementWidth = 300 * 0.9;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
  },
  // Texts
  link: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#2196f3",
    textAlign: "center",
    paddingTop: 10,
    fontSize: 20
  },
  textLinks: {
    paddingTop: 10
  },
  // Buttons
  button: {
    justifyContent: "center",
    alignItems: "center",
    minWidth: elementWidth,
    height: 50,
    backgroundColor: "#2196f3",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  buttonEnabled: {
    justifyContent: "center",
    alignItems: "center",
    minWidth: elementWidth,
    height: 50,
    backgroundColor: "#2196f3",
    borderRadius: 5,
    marginTop: 15,
  },
  buttonDisabled: {
    justifyContent: "center",
    alignItems: "center",
    minWidth: elementWidth,
    height: 50,
    borderRadius: 5,
    marginTop: 15,
    backgroundColor: "gray",
  },
  // Inputs
  input: {
    height: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 30,
    minWidth: elementWidth,
  },
  inputError: {
    height: 60,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 30,
    minWidth: elementWidth,
  },
});
