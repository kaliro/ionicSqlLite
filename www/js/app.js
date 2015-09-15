// Ionic Starter App

//This variable contains the instance of the data base.
var db; //TODO: buscar una mejor forma posiblemente esto sea una mala practica.

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }


    // Important!!
    //
    // Instantiate database file/connection after ionic platform is ready.
    //
    db = $cordovaSQLite.openDB("kalirosqui.db");
    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Messages (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)');


  });

})

.controller('NFController', ['$scope', '$cordovaSQLite', function($scope, $cordovaSQLite) {

  $scope.save = function(newMessage) {

    // execute INSERT statement with parameter
    $cordovaSQLite.execute(db, 'INSERT INTO Messages (message) VALUES (?)', [newMessage])
      .then(function(result) {
        $scope.statusMessage = "Message saved successfull, Bitch!";
      }, function(error) {
        $scope.statusMessage = "Error on saving that s!h3t: " + error.message;
      })

  }

  $scope.load = function() {

    // Execute SELECT statement to load message from database.
    $cordovaSQLite.execute(db, 'SELECT * FROM Messages ORDER BY id DESC')
      .then(
      function(res) {

        if (res.rows.length > 0) {

          $scope.newMessage = res.rows.item(0).message;
          $scope.statusMessage = "Message loaded successfull, Bitch!";
        }
      },
      function(error) {
        $scope.statusMessage = "Error on loading: " + error.message;
      }
    );
  }

}])
