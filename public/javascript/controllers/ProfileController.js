
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
      vm.emailStatus = false;
      getAuth();


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
          if(vm.userObject.name){
            vm.nameStatus = true;
          }else {
            vm.nameStatus = false;
          }
          if(vm.userObject.photo){
            vm.photoStatus = true;
          }else {
            vm.photoStatus = false;
          }
        }
      }
      vm.setEdit = function() {
        console.log("inside setEdit")
        // var user = firebase.auth().currentUser;
        //
        // user.updateEmail(vm.email).then(function() {
        //   console.log("Update successful");
        // }, function(error) {
        //   // An error happened.
        // });
        firebase.database().ref('users/' + id).set({
          // username: name,
          email: vm.email
        });

        vm.emailStatus = false;
        getAuth();
      }


      vm.showEmailEdit = function(){
        vm.emailStatus = true;
      }

            // vm.editUser = function(id){
            //   console.log('inside edit');
            //   vm.showEdit = true;
            //   vm.id = vm.data[id].$id;
            //   // makeEdit(id);
            //   //get id then pass to next funciton
            //
            //
            // }

            // vm.makeEdit = function(){
            //   console.log(vm.id, vm.editUserObj);
            //     if(vm.editUserObj.image && vm.editUserObj.name){
            //       console.log('inside real edit to fb')
            //       var ref = database.ref('users/' + vm.id).set({
            //         username: vm.editUserObj.name,
            //         image: vm.editUserObj.image
            //       });
            //
            //       vm.showEdit = false;
            //       vm.editUserObj = {};
            //       getUserData(config, database);
            //     }
            //   }
            //
            // vm.deleteUser = function(id){
            //   vm.id = vm.data[id].$id;
            //   var ref = database.ref('users/' + vm.id).set({
            //     username: null,
            //     image: null
            //   });
            //   // remove()
            // }


  }
})();
