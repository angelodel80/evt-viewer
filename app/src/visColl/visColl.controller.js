/**
 * @ngdoc object
 * @module evtviewer.visColl
 * @name evtviewer.visColl.controller:ViscollCtrl
 * @description 
 * # ViscollCtrl
 * This is the controller for the {@link evtviewer.visColl.directive:evtViscoll evtViscoll} directive. 
 * @requires $log
 * @requires $scope
 * @requires evtviewer.core.config
 * @requires evtviewer.visColl.evtViscoll
 * @requires evtviewer.parsedData
 * @requires evtviewer.interface.evtInterface
 * @requires evtviewer.select.evtSelect
**/
angular.module('evtviewer.visColl')

.controller('ViscollCtrl', function(config, $log, $scope, $filter, evtNavbar, parsedData, evtInterface, evtSelect, evtButtonSwitch) {
    var vm = this;
    
    var _console = $log.getInstance('visColl');
    // 
    // Control function
    // 
    // metodi vari
    vm.updateViscollImage = function(item){
        console.log(item);
        for (x in vm.svgCollection.svgs){
            if (vm.svgCollection.svgs[x].hasOwnProperty('textSvg')){
                for (y in vm.svgCollection.svgs[x].svgLeaves){
                    if (vm.svgCollection.svgs[x].svgLeaves[y].id === item){
                        console.log(item);
                        var object = vm.svgCollection.svgs[x].svgLeaves[y];
                        console.log(object);
                        vm.change(object)
                    }
                }
            }
        }
    }

});