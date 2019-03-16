(function () {
    angular.module('evtviewer.imageViewerService',['evtviewer.dataHandler'])
    
    .service('imageViewerModel',function(parsedData){
        var viewerModel = this;
        var options = {
            id: "osd-img",
            prefixUrl: "bower_components/openseadragon/built-openseadragon/openseadragon/images/",
            tileSources: [], // immagine SanMatteo
            showRotationControl: true,                
            showNavigator: true,
            //navigatorId: "navscroll",
            //visibilityRatio: 0.8,
            visibilityRatio: 1, 
            defaultZoomLevel: 1,
            panHorizontal: true,
            constrainDuringPan: true,
            //minZoomLevel: 0.8,
            minZoomLevel: 0.8,
            maxZoomLevel: 8.0,
    
            wrapVertical: false,
            navigatorPosition: "ABSOLUTE",
            //navigatorTop: "0",
            //navigatorLeft: "94%",
            //navigatorHeight: "100%",
            //navigatorWidth: "6%",
            navigatorTop:"0%",
            navigatorLeft:"94%",
            navigatorHeight:"100%",
            navigatorWidth:"6%",
            //per sequetnza immagini
            sequenceMode: true,
            preserveOverlays: false,
            //OpenSeadragon.OverlayRotationMode.NO_ROTATION
         };
  

         
         // {id:"box_body_mainImage",prefixUrl:"images/",tileSources:"data/tails/scaled_70_verticale.dzi",showNavigator:!0,visibilityRatio:1,defaultZoomLevel:1,panHorizontal:!0,constrainDuringPan:!0,minZoomLevel:1,wrapVertical:!0,navigatorPosition:"ABSOLUTE",navigatorTop:"1%",navigatorLeft:"98%",navigatorHeight:"95%",navigatorWidth:"8%"}
    
         viewerModel.getOptions = function(){
             return options;
         };
    
    
    
    
    });
    console.log("prova caricato modulo evtviewer.imageViewerService");
})();