import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

// TODO : Replace configuration with actual firebase instance
const firebaseConfig = {
  apiKey: "AIzaSyAAXtg1gGEBY0pdrMb1skctcFAnj9VITBo",
  authDomain: "remote-assessment.firebaseapp.com",
  databaseURL: "https://remote-assessment.firebaseio.com",
  projectId: "remote-assessment",
  storageBucket: "remote-assessment.appspot.com",
  messagingSenderId: "609111823137",
  appId: "1:609111823137:web:c51d179730c61fecdc2460"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth;
    this.firestore = app.firestore();
  }

  login(username) {
    var appVerifier = window.recaptchaVerifier;
    return this.auth().signInWithPhoneNumber(username, appVerifier);
  }

  logout() {
    this.auth()
      .signOut()
      .then(r => console.log("logout", r));
  }

  addUserInfo(userInfo) {
    if (userInfo) {
      this.firestore
        .doc(`users/${this.auth().currentUser.uid}`)
        .set(userInfo)
        .then(r => console.log("from add info", r))
        .catch(e => console.log(e));
    }
  }

  updateUserInfo(userInfo) {
    if (userInfo) {
      this.firestore
        .doc(`users/${this.auth().currentUser.uid}`)
        .update(userInfo)
        .then(r => console.log("from update info", r))
        .catch(e => console.log(e));
    }
  }

  async getAccessToken() {
    return this.auth().currentUser.getIdToken(true);
  }

  async getUserinfo() {
    const data = await this.firestore
      .doc(`users/${this.auth().currentUser.uid}`)
      .get();

    return data.get("userInfo") ? data.get("userInfo") : "User data not found";
  }

  async register(name, email, pass) {
    await this.auth
      .createUserWithEmailAndPassword(email, pass)
      .then(d => console.log(d));
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }
}

export default new Firebase();
