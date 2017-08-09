/**
 * Created by Julius Alvarado on 8/8/2017.
 */

angular.module('app').controller('ContactCtrl', ['jUsers',
    function (jUsers) {
        var vm = this;
        vm.users = jUsers.all;

        vm.selectUser = function (user) {
            vm.selected = user;
            console.log("jha - vm.selectUser invoked");
        }
    }
]);