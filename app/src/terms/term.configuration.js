angular.module('evtviewer.term')

.constant('NAMEDENTITYDEFAULTS', {
    
})

.config(function(evtTermProvider, configProvider, NAMEDENTITYDEFAULTS) {
    var defaults = configProvider.makeDefaults('term', NAMEDENTITYDEFAULTS);
    evtTermProvider.setDefaults(defaults);
});