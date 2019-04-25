angular.module('evtviewer.openseadragonService')

   .service('imageScrollMap', function (evtInterface) {
      console.log('in service imageScrollMap');
      var key = 'yPage';
      var imageScrollMap = this;
      
      var map = {
         yPage1: {
            from: 0.00,
            to: 1.15
        },
         yPage2: {
            from: 1.15,
            to: 2.30
         },
         yPage3: {
            from: 2.30,
            to: 3.45
         },
         yPage4: {
            from: 3.45,
            to: 4.48
         },
         yPage5: {
            from: 4.48,
            to: 5.60
         },
         yPage6: {
            from: 5.60,
            to: 6.70
         },
         yPage7: {
            from: 6.70,
            to: 7.95
         },
         yPage8: {
            from: 7.95,
            to: 9.00
         },
         yPage9: {
            from: 9.00,
            to: 10.10
         },
         yPage10: {
            from: 10.10,
            to: 10.50
         },
         yPage11: {
            from: 10.50,
            to: 11.20
         },
         yPage12: {
            from: 11.20,
            to: 11.70
         },
         yPage13: {
            from: 11.70,
            to: 12.23
         },
         yPage14: {
            from: 12.23,
            to: 12.75
         },
         yPage15: {
            from: 12.75,
            to: 13.25
         },
         yPage16: {
            from: 13.25,
            to: 13.75
         },
         yPage17: {
            from: 13.75,
            to: 14.30
         },
         yPage18: {
            from: 14.30,
            to: 15.30
         },
         size: 18
       };


      imageScrollMap.mapDown = function (bounds) {
         return mapFun(bounds, 'down');
      };
      imageScrollMap.mapUP = function (bounds) {
         return mapFun(bounds, 'up');
      };
      imageScrollMap.map = function (bounds) {
         return mapFun(bounds, '');
      };

     var mapFun = function (bounds, type) {
         var box = bounds.getBoundingBox();
         
         console.log('mapping bounds-pages', box);
         console.log(map);
         //console.log(key);

         switch (type) {

            case 'down':
               console.log('mapping moving down');
               if (box.y < map[key + '1'].to) {
                  return (key + '1').substr(1).toLowerCase(); // 'page1';
               } else {
                  for (var i = 1; i <= map.size; i++) {
                     if (box.y < map[key + i].to && box.y >= map[key + i].from) {
                        console.log(key + i);
                        return (key + i).substr(1).toLowerCase();
                     }
                  }
               }
               break;


            case 'up':
               console.log('mapping moving up');
               if(box.y <= 0){
                  return (key + '1').substr(1).toLowerCase(); // 'page1';
               }
               for (var i = 1; i <= map.size; i++) {
                  console.log('nel for di scrolling up', (map[key + i].from + map[key + i].to) / 2);
                  console.log('box y:', box.y);
                  console.log('from:', map[key + i].from);
                  if (box.y < ((map[key + i].from + map[key + i].to) / 2) && box.y >= map[key + i].from) {
                     console.log('nel if di scrolling up', i);
                     console.log(key + i);
                     return (key + i).substr(1).toLowerCase();
                  }
               }
               return '';


            default:
               console.log('mapping moving down');
               if (box.y < map[key + '1'].to) {
                  return (key + '1').substr(1).toLowerCase();
               } else {
                  for (var i = 1; i <= map.size; i++) {
                     if (box.y < map[key + i].to && box.y >= map[key + i].from) {
                        console.log(key + i);
                        return (key + i).substr(1).toLowerCase();
                     }
                  }
               }
               return '';

         }


      };

      imageScrollMap.isInBounds = function (y, page) {
         console.log('isInBounds', y, page);
         //var ypage = "y"+ page.charAt(0).toUpperCase() + page.slice(1);
         // FIXME
         var ypage = undefined;
         if (page.length == 5)
            ypage = key + page.substr(page.length - 1);
         else
            ypage = key + page.substr(page.length - 2);

         console.log('isInBounds', ypage, map[ypage]);
         
         if(map[ypage]!=undefined){
            if (y >= map[ypage].from && y < map[ypage].to) {
               console.log('true');
               return true;
            } else {
               console.log('false');
               return false;
            }
         }
      };

      imageScrollMap.updateBounds = function (viewer, page) {
         console.log('updateBounds', page);
         var oldBounds = viewer.viewport.getBounds();
         // gestire condizione di errore pagina non presente nell'insieme delle pagine
         var ypage = undefined;
         if (page.length == 5)
            ypage = key + page.substr(page.length - 1);
         else
            ypage = key + page.substr(page.length - 2);
         console.log('updateBounds', ypage);
         var h = oldBounds.height / oldBounds.width;
         if(map[ypage]!=undefined){
            var newBounds = new OpenSeadragon.Rect(0, map[ypage].from, 1, h); // try-catch?
            console.log('updateBounds', newBounds);
            viewer.viewport.fitBounds(newBounds, false);
            evtInterface.updateState('currentPage',page);
            evtInterface.updateUrl();
         }

      };



   });
