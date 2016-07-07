
(function() {
  'use strict';
  angular.module('app')
  .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['UserFactory', '$state', '$rootScope', "$firebaseObject", "$firebaseArray", "$stateParams"];

  function ProfileController( UserFactory, $state, $rootScope, $firebaseObject, $firebaseArray, $stateParams) {
      var vm = this;
      var id = $stateParams.id;
      console.log(id)
      var uuuid;
      var config = {
          apiKey: "AIzaSyBiLb1v-5YCa0Ml72nu_OMI_XgX3wQDk-Y",
          authDomain: "webtest-fdd58.firebaseapp.com",
          databaseURL: "https://webtest-fdd58.firebaseio.com",
          storageBucket: "webtest-fdd58.appspot.com",
        };


              // Get a reference to the database service
      // var database = firebase.database();
      // var user = database.auth().currentUser;
      // console.log(user)
      function getAuth(){
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
              // console.log('user signed in', user)
              vm.userInfo = user;
              vm.status = true;
              vm.uuuid = user.uid;
              console.log(vm.userInfo, vm.status)
              getUserInfo(id, vm.uuuid)
          } else {
              console.log("// No user is signed in.");
              var blank_user = {email: "----"}
              // vm.userInfo.email = 'NONE';
          }
        });
      }
      getAuth();

      function getUserInfo(id, uuuid){
        if(id === uuuid){

          var userNow = firebase.auth().currentUser;
          console.log('right user is here!', userNow)
          if (userNow != null) {
            userNow.providerData.forEach(function (profile) {
               vm.userObject = {
                id: profile.providerId,
                uid: profile.uid,
                name: profile.displayName,
                email: profile.email ,
                photo: profile.photoURL
              }
            });
          }
        }
      }

  }
})();
