/**
 * @ngdoc service
 * @module evtviewer.dataHandler
 * @name evtviewer.dataHandler.evtTermsParser
 * @description 
 * # evtTermsParser
 * Service containing methods to parse data regarding primary source information
 *
 * @requires $q
 * @requires xmlParser
 * @requires evtviewer.core.config
 * @requires evtviewer.dataHandler.evtParser
 * @requires evtviewer.dataHandler.parsedData
**/
angular.module('evtviewer.dataHandler')

.service('evtTermsParser', function($q, $http, xmlParser, evtParser, parsedData, config) {
	var parser = { };

	var defElement = 'text',
		defHotSpotDivType = 'term';
	/**
     * TODO: add documentation
    */
	parser.parseTerms = function(doc) { 
        console.time('parseTerms');
        console.log('parseTerms', doc);
        var currentDoc = angular.element(doc);
        console.log('!##!currentElement!##!', currentDoc);
        var currentElem = currentDoc.find("text");
        console.log('!##!TextElement!##!', currentElem);
        angular.forEach(currentElem.find('term'),
            function(term) { 
                console.log(term);
                var newTerm = {};
                newTerm.writtenrepresentation = term.textContent;
                newTerm.id = newTerm.writtenrepresentation; //term.attributes['key'].nodeValue;
                newTerm.key = term.attributes['key'].nodeValue;
                newTerm.ref = term.attributes['ref'].nodeValue;
                newTerm.type = term.attributes['type'].nodeValue;

                // potenzialmente mettere qui la richiesta http

                var url = newTerm.ref;
                
                var succ = function(response){
                    console.log('success get http', response);
                    var translation = response.data.senses[0].propertyValues.entry[1].value;
                    var sumo = response.data.senses[0].propertyValues.entry[2].value;
                    var wn = response.data.senses[0].propertyValues.entry[3].value;
                    var properties = response.data.propertyValues;
                    var pos = properties.entry[1].value;
                    newTerm.translation = translation;
                    newTerm.properties = properties;
                    newTerm.pos = pos;
                    newTerm.sumo = sumo;
                    newTerm.wn = wn;
                    
                    console.log('nuovo termine', newTerm);
                    parsedData.addTerm(newTerm);
                };

                var fail = function(response){
                    console.log('fail get http', response);
                };

                $http({
                        method: 'GET',
                        url: url
                     }).then(succ,fail);

               // console.log('nuovo termine', newTerm);

               // parsedData.addTerm(newTerm);
            }
        );
		
        console.log('## TERMS ##', parsedData.getTerms());
        console.timeEnd('parseTerms');
	};

	return parser;
});


/*angular.forEach(currentBackElement.find("div[type='hotspot']"), 
			function(HotSpotDivGroup) {
				//var surfaceId = surfaceElement.getAttribute('xml:id'),
				//	surfaceCorresp = surfaceElement.getAttribute('corresp');
				//surfaceCorresp = surfaceCorresp ? surfaceCorresp.replace('#', '') : surfaceCorresp;
				//TODO: decide if it's better to save facsimile infos in page object model	
				angular.forEach(HotSpotDivGroup.childNodes, function(child){
					if (child.tagName === 'div') {
						var newHotSpot = {};

						if (child.attributes) {
							for (var i = 0; i < child.attributes.length; i++) {
								var attrib = child.attributes[i];
								if (attrib.specified) {
									var attrName = attrib.name === 'xml:id' ? 'id' : attrib.name.replace(':', '-');
									newHotSpot[attrName] = attrib.value;
								}
							}
						}
                        newHotSpot.content = angular.element(child).text().trim();
                        //newHotSpot.images = angular.element(child).find('graphic');
                        console.log('newHotSpot:',newHotSpot);
						parsedData.addHotSpot(newHotSpot);
						
					}
				});
		});*/