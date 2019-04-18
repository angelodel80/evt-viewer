(function () {
    angular.module('evtviewer.imageViewerService',[])
    
    .service('imageViewerModel',function(){
        var viewerModel = this;
        
        console.log("caricato servizio  imageViewerService");

        //var tileSources = [ "data/tails/sanmatteo.dzi", "data/tails/schema.dzi"];
    
        var options = {
            id: "osd-img",
            prefixUrl: "data/osd-images/",
            tileSources: ["data/tiles/scaled_70_verticale.dzi","data/tiles/teobaldo_verso-rotated.dzi"],
            //tileSources: tileSources, // immagine SanMatteo
            //tileSources: "data/test-img/quamusdzi/QuamusImgManuscript.dzi", // immagine per Marocco
            //overlays: [{
            //rotationMode: OpenSeadragon.OverlayRotationMode.NO_ROTATION,
            //    id: 'example-overlay',
            //    x: 0.03,
            //    y: 0.20,
            //    width: 0.15,
            //    height: 0.45,
            //    className: 'nohighlight'
            //}],            
            /*tileSources: ["data/bellinidzi/4-26giugno1834a.dzi", // immagini per bellini
                            "data/bellinidzi/4-26giugno1834b.dzi"],*/
            
            showRotationControl: true,                
            showNavigator: true,
            //navigatorId: "navscroll",
            //visibilityRatio: 0.8,
            visibilityRatio: 1, 
            defaultZoomLevel: 1,
            panHorizontal: true,
            constrainDuringPan: true,
            //minZoomLevel: 0.8,
            minZoomLevel: 1,
            maxZoomLevel: 8.0,
    
            wrapVertical: false,
            navigatorPosition: "ABSOLUTE",
            //navigatorTop: "0",
            //navigatorLeft: "94%",
            //navigatorHeight: "100%",
            //navigatorWidth: "6%",
            navigatorTop:"1%",
            navigatorLeft:"94%",
            navigatorHeight:"95%",
            navigatorWidth:"6%",
            //per sequetnza immagini
            //sequenceMode: true,
            preserveOverlays: false,
            sequenceMode: true,
            preserveViewport: true,
            showReferenceStrip: false,
            referenceStripSizeRatio: 0.2,
            referenceStripWidth: 0.01,
            showHomeControl: false
            //OpenSeadragon.OverlayRotationMode.NO_ROTATION
         };
  

         
         // {id:"box_body_mainImage",prefixUrl:"images/",tileSources:"data/tails/scaled_70_verticale.dzi",showNavigator:!0,visibilityRatio:1,defaultZoomLevel:1,panHorizontal:!0,constrainDuringPan:!0,minZoomLevel:1,wrapVertical:!0,navigatorPosition:"ABSOLUTE",navigatorTop:"1%",navigatorLeft:"98%",navigatorHeight:"95%",navigatorWidth:"8%"}
    
         viewerModel.getOptions = function(){
            console.log("getOpt di imageViewerService");
             return options;
         };
    
    
    
    
    });
    console.log("prova caricato modulo evtviewer.imageViewerService");
})();

