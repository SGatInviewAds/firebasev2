(function() {
  'use strict';
  angular.module('app')
  .controller('NavBarController', NavBarController);

  NavBarController.$inject = ['UserFactory', '$state', '$rootScope', "$firebaseObject", "$firebaseArray"];

  function NavBarController( UserFactory, $state, $rootScope, $firebaseObject, $firebaseArray) {
      var vm = this;
      var config = {
          apiKey: "AIzaSyBiLb1v-5YCa0Ml72nu_OMI_XgX3wQDk-Y",
          authDomain: "webtest-fdd58.firebaseapp.com",
          databaseURL: "https://webtest-fdd58.firebaseio.com",
          storageBucket: "webtest-fdd58.appspot.com",
        };

      firebase.initializeApp(config);

              // Get a reference to the database service
      var database = firebase.database();
      vm.user = {};
      vm.editUserObj = {}
      vm.savedUser = false;
      vm.showEdit = false;
      vm.data;
      vm.userInfo;

      getUserData(config, database);

      getAuth();

      function getUserData(config, database){ //sets vm.data to array of
         var ref = database.ref().child("users");
         vm.data = $firebaseArray(ref);
        //  console.log(vm.data);
      }

      function getAuth(){ //Finds out which user is logged in
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
              // console.log('user signed in', user)
              vm.userInfo = user;
              vm.status = true;
          } else {
              console.log("// No user is signed in.");
              var blank_user = {email: "----"}
              // vm.userInfo.email = 'NONE';
          }
        });
      }


      vm.signOut = function(){
      // console.log('signing out')
       firebase.auth().signOut().then(function() {
            getAuth();
            // Sign-out successful.
            vm.status = false;
            $state.go('Home');
          }, function(error) {
            getAuth();
            getUserData();

            // An error happened.
          });
        }


      vm.googleLogin = function(){
        var provider = new firebase.auth.GoogleAuthProvider();
        // console.log(provider);

        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // console.log(user, token);
            // saveUserData();
            writeGoogleUserData(user, token);
            $state.go(Profile);
            // ...
          }).catch(function(error) {
              // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      }



      function writeGoogleUserData(userObject, token){ // function for saving user to FireBase
        // console.log("this is token", token)
        // console.log("inside googledata funct", userObject)
        var anonPic = "http://responserates.org/media/accounts/profiles_pictures/anonymous-user_1.png";
        // console.log(userObject.email, userObject.displayName, userObject.photoURL)

        if(userObject.photoURL === null){
          database.ref('users/' + userObject.uid).set({
            email: userObject.email,
            username: userObject.email,
            image: anonPic,
            refreshToken: userObject.refreshToken
          });
        }else{
          database.ref('users/' + userObject.uid).set({
            email: userObject.email,
            username: userObject.displayName,
            image: userObject.photoURL,
            refreshToken: userObject.refreshToken
          });
        }
        vm.savedUser = true;
        savedUser();
        getUserData(config, database);
        // onSignIn(userObject);
      }
  }
})();
