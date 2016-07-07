(function() {
  "use strict";
  angular.module('app').factory('UserFactory', UserFactory);
  UserFactory.$inject = ['$q', '$http', "$window", "$rootScope", "$firebaseObject", "$firebaseArray"];

  function UserFactory($q, $http, $window, $rootScope, $firebaseObject, $firebaseArray) {
    var o = {};
    o.status = {};
    //---------------------TOKENS----------------------------------------------------
    // o.status._user = "stuart"
    //   var database = firebase.database();
    //
    //   o.googleLogin = function(){
    //   var provider = new firebase.auth.GoogleAuthProvider();
    //   console.log(provider);
    //
    //   firebase.auth().signInWithPopup(provider).then(function(result) {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //       var token = result.credential.accessToken;
    //       // The signed-in user info.
    //       var user = result.user;
    //       // console.log(user, token);
    //       saveUserData();
    //       writeGoogleUserData(user, token);
    //       // ...
    //     }).catch(function(error) {
    //         // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     // ...
    //   });
    // }
    // o.getAuth = function(){
    //   firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //       // console.log('user signed in', user)
    //       o.userInfo = user;
    //     } else {
    //       console.log("// No user is signed in.");
    //       var blank_user = {email: "----"}
    //       o.userInfo.email = 'NONE';
    //
    //     }
    //   });
    // }
    // o.getAuth();
    return o;
  }
})();
