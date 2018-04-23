/**
 * @ngdoc service
 * @module evtviewer.navBar
 * @name evtviewer.navBar.evtNavbar
 * @description 
 * # evtNavbar
 * This provider expands the scope of the
 * {@link evtviewer.navBar.directive:evtNavbar evtNavbar} directive 
 * and stores its reference untill the directive remains instantiated.
 *
 * @requires $log
 * @requires evtviewer.interface.evtInterface
 * @requires evtviewer.core.config
 * @requires evtviewer.dataHandler.parsedData
 * @requires evtviewer.select.evtSelect
**/
angular.module('evtviewer.navBar')

.provider('evtNavbar', function() {

    var defaults = this.defaults;

    this.setDefaults = function(_defaults) {
        defaults = _defaults;
    };

    var currentAppEntry = '';
	
	this.$get = function($log, config, parsedData, evtInterface, evtSelect) {
        var navBar     = {},
            collection = {},
            list       = [],
            idx        = 0;
        
        var number = 0;
		
        var destroy = function() {
            var tempId = this.uid;
            // this.$destroy();
            navBar.destroy(tempId);
        };
		// 
        // navBar builder
        // 
        /**
         * @ngdoc method
         * @name evtviewer.navBar.evtNavbar#build
         * @methodOf evtviewer.navBar.evtNavbar
         *
         * @description
         * <p>This method will extend the scope of {@link evtviewer.navBar.directive:evtNavbar evtNavbar} directive 
         * according to selected configurations.</p>
         *
         * @param {Object} scope initial scope of the directive
         *
         * @returns {Object} extended scope:
         */
        navBar.build = function(scope) {
            var currentId  = idx++;
            var scopeHelper = {};
            
            if (typeof(collection[currentId]) !== 'undefined') {
                return;
            }
			
			var doc = {
				value: evtInterface.getState('currentDoc')
			};
			var page = evtInterface.getState('currentPage');
			
            var pagesCollection = parsedData.getPages();
			var documentsCollection = parsedData.getDocuments();
            
			//var insertPage = parsedData.addPage('currentPage', doc);
            var pageSlider = {
                value: 0,
                options: {
                    floor: 0,
                    ceil: pagesCollection ? pagesCollection.length : 0,
                }
            };
			
			
			var updateOptions = function(options) {
                var vm = this;
                vm.pageSlider.options = options;
            };
			
			var updatePage = function(value, docId) {
				var vm = this;
				var pageId = vm.pagesCollection[value];
                var page = evtInterface.updateState('currentPage', pageId);
                //TODO: Check if document is the new page is still part of the current document
                // otherwise update currentDoc too (see 'page' callback in select.provider)
				evtInterface.updateUrl();
			};
			
			var updateDocument = function(value){
				var vm = this;
				var pageId = vm.pagesCollection[value];
				var currentDocument = evtInterface.getState('currentDoc');
				var page = evtInterface.getState('currentPage', pageId);
				var docs = vm.documentsCollection[value];
				if (page.docs.length > 0 && page.docs.indexOf(currentDocument) < 0) { // page not part of the document
					evtInterface.updateState('currentDoc', page.docs[0]);
				}
				evtInterface.updateUrl();
			};
				
            scopeHelper = {
                // Scope expansion
                uid: currentId,
                pageSlider: pageSlider,
				pagesCollection: pagesCollection,
				documentsCollection: documentsCollection,
				page: page,
				doc: doc,

                // Functions
                updateOptions: updateOptions,
				updateDocument: updateDocument,
				updatePage: updatePage,
                destroy: destroy
            };

            collection[currentId] = angular.extend(scope.vm, scopeHelper);
            list.push({
                id: currentId
            });

            return collection[currentId];
        };
		
        navBar.destroy = function(tempId) {
            delete collection[tempId];
        };

        //le varie cose da far fare al provider sono da mettere qua
        return navBar;
    };
});