function signIn() {
    if (firebase.auth().currentUser == null) {
        redirect('signin.html');
    } else {
        firebase.auth().signOut();
    }
};

function eToggleSignIn() {
    var password = document.getElementById('password').value;
    var email = document.getElementById('emailemail').value;
    if (email.length < 8) {
        alert('Please enter a longer email.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a longer password.');
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        firebase.auth().onAuthStateChanged(function (user) {
            redirect("dashboard.html");
        });
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
};

// Google Login
function gToggleSignIn() {
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            var user = result.user;
            var uid = user.uid.toString();

            firebase.auth().onAuthStateChanged(function (user) {
                if (user != null) {
                    user.providerData.forEach(function (profile) {
                        var username = profile.displayName.toString();
                        var email = profile.email.toString();
                        var userDataEmails = emails.doc(username);
                        var userDataUsers = users.doc(uid);

                        userDataEmails.get().then(function (doc) {
                            if (!doc.exists) {
                                userDataEmails.set({
                                    email: email,
                                    uid: uid,
                                }).then(function () {
                                    console.log("Document successfully written!");
                                }).catch(function (error) {
                                    console.error("Error writing document: ", error);
                                });
                            } else {
                                console.log("Emails doc already exists, skipped writing.");
                            }
                        }).then(function () {
                            userDataUsers.get().then(function (doc) {
                                if (!doc.exists) {
                                    userDataUsers.set({
                                        displayName: username,
                                        email: email,
                                    }).then(function () {
                                        console.log("Document successfully written!");
                                    }).catch(function (error) {
                                        console.log("Error writing document: ", error);
                                    });
                                } else {
                                    console.log("Users doc already exists, skipped writing.");
                                }
                            });
                        });
                    });
                    redirect('dashboard.html');
                };
            });
        }).catch(function (error) {
            var errorCode = error.code;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different method for that email. If you want to merge your Google account with an Email/Password account, go to the Account page.');
            } else {
                console.log(error);
            }
        });
    } else {
        alert("There is already a user signed in, please sign out before proceeding.");
    }
};
// Google Login End

// Signup
function handleSignUp() {
    var permusername = document.getElementById('suusername').value.toString();
    var permemail = document.getElementById('suemail').value.toString();
    var permpassword = document.getElementById('supassword').value.toString();

    if (permusername.length < 3) {
        alert('Please enter a longer username.');
        return;
    }
    if (permemail.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (permpassword.length < 4) {
        alert('Please enter a password.');
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(permemail, permpassword).then(function () {
        firebase.auth().signInWithEmailAndPassword(permemail, permpassword).catch(function (error) {
            console.log(error);
        });

        firebase.auth().onAuthStateChanged(function (user) {
            emails.doc(permusername).set({
                email: permemail,
                uid: user.uid,
            }).then(function () {
                console.log("Document successfully written!");
            }).catch(function (error) {
                console.error("Error writing document: ", error);
            });

            users.doc(user.uid).set({
                displayName: permusername,
                email: permemail,
            }).then(function () {
                console.log("Document successfully written!");
            }).catch(function (error) {
                console.error("Error writing document: ", error);
            });

            user.updateProfile({
                displayName: permusername,
            }).then(function () {
                console.log(user.displayName);
            }).catch(function (error) {
                console.log(error);
                console.log(user.displayName);
            });
            redirect('dashboard.html');
        });
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
};
// Signup End

// User Health Survey Start
function getUserInput() {
    if (!user) {
        alert("Sorry, an error has occurred. This error is not your fault and will be fixed by the developers soon. Please try again later.")
        return console.log("No user found for user health survey");
    }

    var age = inputText("age");
    var gender = inputText("gender");
    var weight = inputText("weight");
    var healthIssues = inputText("healthIssues").replace(/ /g, ",").replace(/,,/g, ",").split(","); // comma or space separated values
    var allergies = inputText("allergies").replace(/ /g, ",").replace(/,,/g, ",").split(","); // comma or space separated values
    var dietPlan = inputText("diet-plan"); // comma or space separated values, default should be "None"
    var prohibitedFood = inputText("prohibited-food"); // comma or space separated values, default should be "None"

    return userDoc.update({
        age: age,
        gender: gender,
        weight: weight,
        healthIssues: healthIssues,
        allergies: allergies,
        dietPlan: dietPlan,
        prohibitedFood: prohibitedFood,
    });
}
// User Health Survey End

// Password Reset
function sendPasswordReset() {
    var email = document.getElementById('premail').value;

    if (email != null) {
        firebase.auth().sendPasswordResetEmail(email).then(function () {
            alert('Password Reset Email Sent!');
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/invalid-email') {
                alert(errorMessage);
            } else if (errorCode == 'auth/user-not-found') {
                alert(errorMessage);
            }
            console.log(error);
        });
    } else {
        alert("Please enter an email.");
    }
};
// Password Reset End