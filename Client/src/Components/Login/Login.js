import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Constants } from "../../Constants";
import firebase from "../Firebase";
import classes from "./login.module.css";
import Flag from "../Shared/Flag";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setcode] = useState("");
  const [captchaVerifier, setCaptchaVerifier] = useState();

  const [
    showInvalidPhoneNumberMessage,
    setShowInvalidPhoneNumberMessage,
  ] = useState("hide");
  const [
    showInvalidVerificationCode,
    setShowInvalidVerificationCode,
  ] = useState("hide");
  const [verificationErrorMessage, setVerificationErrorMessage] = useState("");
  const [showVerifyingDialog, setShowVerifyingDialog] = useState(false);
  const [
    showVerificationCodeSentDialog,
    setShowVerificationCodeSentDialog,
  ] = useState(false);

  const FirebaseErrors = [
    {
      code: "invalid-verification-code",
      message: "Please enter valid verification code",
    },
    {
      code: "code-expired",
      message: "Verification code is expired",
    },
    {
      code: "too-many-requests",
      message:
        "We have blocked all requests from this device due to too many requests. Try again later.",
    },
  ];

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
    var x = document.getElementById("AuthenticationDiv");
    setTimeout(() => {
      x.scrollTop = x.scrollHeight;
    }, 100);
  }, []);

  const isValidPhoneNumber = () => {
    if (!phoneNumber || !phoneNumber.trim()) return false;
    if (phoneNumber.length != 10) return false;
    if (!new RegExp(Constants.OnlyNumberRegEx).test(phoneNumber)) return false;

    return true;
  };

  const isValidVerificationCode = () => {
    if (!code || !code.trim()) return false;
    if (code.length != 6) return false;
    if (!new RegExp(Constants.OnlyNumberRegEx).test(code)) return false;

    return true;
  };

  const getFirebaseErrorMessage = (error) => {
    const firebaseErrors = FirebaseErrors.filter((e) =>
      error.code.includes(e.code)
    );

    return firebaseErrors && firebaseErrors.length
      ? firebaseErrors[0].message
      : "Invalid request";
  };

  const login = async () => {
    if (!isValidPhoneNumber()) {
      setShowInvalidPhoneNumberMessage("show");
      return;
    }

    setShowVerifyingDialog(true);
    try {
      await firebase
        .login("+91" + phoneNumber)
        .then((confirmationResult) => {
          setCaptchaVerifier(confirmationResult);
          setShowVerifyingDialog(false);
          //setShowVerificationCodeSentDialog(true);

          // setTimeout(() => {
          //   setShowVerificationCodeSentDialog(false);

          // }, 1000);
        })
        .catch(function (error) {
          console.log(error);
          setVerificationErrorMessage(getFirebaseErrorMessage(error));
          setShowVerifyingDialog(false);
        });
    } catch (error) {
      console.log(error);
      setShowVerifyingDialog(false);
    }
  };

  const verifyCode = () => {
    if (!isValidVerificationCode()) {
      setShowInvalidVerificationCode("show");
      return;
    }

    captchaVerifier
      .confirm(code)
      .then(function (result) {
        console.log(result);
      })
      .catch(function (error) {
        console.log(error);
        setVerificationErrorMessage(getFirebaseErrorMessage(error));
      });
  };

  const NotificationDialog = ({ children }) => {
    return <div className={classes["notification-dialog"]}>{children}</div>;
  };

  const VerificationDialog = () => {
    return (
      <NotificationDialog>
        <FontAwesomeIcon icon={["fas", "spinner"]} size="1x" spin />
        <span className={classes["dialog-message"]}>Verifying...</span>
      </NotificationDialog>
    );
  };

  const VerificationCodeDialog = () => {
    return (
      <NotificationDialog>
        <FontAwesomeIcon icon={["fas", "check"]} />
        <span className={classes["dialog-message"]}>
          Verification code sent
        </span>
      </NotificationDialog>
    );
  };

  return (
    <section
      className={`${classes["Login_Home_Page"]} row`}
      id="AuthenticationDiv"
      style={{ backgroundColor: "white" }}
    >
      <article
        className="col-5"
        style={{ backgroundColor: "white !important" }}
      >
        <div className={classes["login-container"]}>
          {captchaVerifier ? (
            <>
              <h6>Enter verification code sent to</h6>
              <h6>
                {"+91" + phoneNumber}{" "}
                <i
                  className="fa fa-pencil"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => setCaptchaVerifier(false)}
                />
              </h6>
              <input
                className={classes["input-field"]}
                placeholder="Verification code"
                autoFocus
                onKeyPress={(e) => {
                  if (
                    e.key.toLowerCase().trim() ==
                    Constants.EnterKey.toLowerCase()
                  ) {
                    verifyCode();
                  }
                }}
                onChange={(e) => {
                  setcode(e.target.value);
                  setShowInvalidVerificationCode("hide");
                }}
              />
              {showInvalidVerificationCode == "show" ? (
                <span className={classes["terms-conditions-error-message"]}>
                  Please enter 6 digit code
                </span>
              ) : null}
              {verificationErrorMessage ? (
                <span className={classes["terms-conditions-error-message"]}>
                  {verificationErrorMessage}
                </span>
              ) : null}
              <br />

              <button
                disabled={code.length != 6}
                className={classes["button-verify"] + " btn"}
                onClick={verifyCode}
              >
                LOGIN
              </button>

              {showVerificationCodeSentDialog ? (
                <VerificationCodeDialog></VerificationCodeDialog>
              ) : null}
            </>
          ) : (
            <>
              <div className={classes["Login-Logo-Container"]}>
                <h1>To Do List</h1>
              </div>
              <div className={classes["login-form"]}>
                <h6>Enter your phone number</h6>
                <div className={classes["country-flag"]}>
                  <Flag countrycode={"in"} showDialCode={true}></Flag>
                  <input
                    autoFocus
                    className={classes["input-field"]}
                    placeholder="Phone number"
                    onKeyPress={(e) => {
                      if (
                        e.key.toLowerCase().trim() ==
                        Constants.EnterKey.toLowerCase()
                      ) {
                        login();
                      }
                    }}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      setShowInvalidPhoneNumberMessage("hide");
                    }}
                  />
                </div>
                {showInvalidPhoneNumberMessage == "show" ? (
                  <span className={classes["terms-conditions-error-message"]}>
                    Please enter 10 digit phone number
                  </span>
                ) : null}
                {verificationErrorMessage ? (
                  <span className={classes["terms-conditions-error-message"]}>
                    {verificationErrorMessage}
                  </span>
                ) : null}
                <br />
                <input
                  className={classes["button-verify"] + " btn"}
                  id="recaptcha-container"
                  type="button"
                  onClick={login}
                  value="VERIFY"
                  style={{ width: "100%" }}
                  disabled={phoneNumber.length != 10}
                />
                <br />
                <label className={classes["verify-message"]}>
                  By tapping Verify, an SMS may be sent. Message & data rates
                  may apply.{" "}
                </label>
                {showVerifyingDialog ? (
                  <VerificationDialog></VerificationDialog>
                ) : null}
              </div>
            </>
          )}
        </div>
      </article>
    </section>
  );
};

export default Login;
