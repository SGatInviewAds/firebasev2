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
      vm.savedUser = false;
      vm.editUserObj = {}
      vm.showEdit = false;
      vm.userInfo;
      vm.data;

      getUserData(config, database);
      getAuth();

      vm.sendUser = function(){
        let UserUid = makeId();
        console.log(UserUid);
        console.log(vm.user)
        writeUserData(UserUid, vm.user.name, vm.user.image, database);
      }


      vm.editUser = function(id){
        console.log('inside edit');
        vm.showEdit = true;
        vm.id = vm.data[id].$id;
        // makeEdit(id);
        //get id then pass to next funciton


      }

      vm.makeEdit = function(){
        console.log(vm.id, vm.editUserObj);
          if(vm.editUserObj.image && vm.editUserObj.name){
            console.log('inside real edit to fb')
            var ref = database.ref('users/' + vm.id).set({
              username: vm.editUserObj.name,
              image: vm.editUserObj.image
            });

            vm.showEdit = false;
            vm.editUserObj = {};
            getUserData(config, database);
          }
        }

      vm.deleteUser = function(id){
        vm.id = vm.data[id].$id;
        var ref = database.ref('users/' + vm.id).set({
          username: null,
          image: null
        });
        // remove()
      }

      function getAuth(){
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
      console.log('signing out')
       firebase.auth().signOut().then(function() {
          getAuth();
          // Sign-out successful.
          vm.status = false;
          $state.go('Home');
          }, function(error) {
            getAuth();
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

      function writeUserData(userId, name, image, database) {
        // console.log("running fuction to export data to FB")
        database.ref('users/' + userId).set({
          username: name,
          image: image
        });
        vm.savedUser = true;
        vm.user = {};
        getUserData(config, database);
      }

      function writeGoogleUserData(userObject, token){
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

      function getUserData(config, database){

         var ref = database.ref().child("users");
         vm.data = $firebaseArray(ref);
        //  console.log(vm.data);

      }

      function makeId(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }



  }
})();
