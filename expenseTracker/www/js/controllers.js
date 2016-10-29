angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $localStorage, $state) {
  if (!$localStorage.ledger) {
    $localStorage.ledger = [];
  }

  $scope.ledger = $localStorage.ledger;

  $scope.editMonth = function(x) {
    console.log(x);
    $state.go('tab.chats', {
      ledgerIndex: x
    })
  }

})

.controller('ChatsCtrl', function($scope, Chats, $stateParams, $localStorage) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
    $scope.month = $localStorage.ledger[$stateParams.ledgerIndex];
  });

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $localStorage) {
  $scope.addYear = function(yr) {
    if ($scope.checkYrExists(yr)) {
      $scope.error = "Year has already been added to the ledger";
    } else {
      var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      for (var i = 0; i < 12; i++) {
        var days = $scope.daysInMonth(i, yr);
        var name = monthNames[i];
        var year = yr;
        $localStorage.ledger.push({
          name: name,
          year: year,
          days: days,
          budget: null,
          actual: null
        })
      }
    }

  };

  $scope.checkYrExists = function(yr) {
    var obj = $localStorage.ledger.filter(function(obj) {
      return obj.year === yr;
    })[0];

    if (obj) {
      return true;
    } else {
      return false;
    }
  }

  $scope.daysInMonth = function(month, year) {
    return new Date(year, month, 0).getDate();
  }

});
