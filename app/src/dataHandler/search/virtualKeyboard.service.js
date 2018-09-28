angular.module('evtviewer.dataHandler')
   .service('evtKeyboard', ['evtSearchDocument', 'baseData', 'parsedData', 'XPATH',
      function VirtualKeyboard(evtSearchDocument, baseData, parsedData, XPATH) {
      
      VirtualKeyboard.prototype.getDefaultKeyboardKeys = function() {
         var xmlDocDom = getXmlDom(),
            namespace = getXmlNamespace(xmlDocDom),
            gNodes = getGlyphNode(xmlDocDom, namespace.ns, namespace.nsResolver),
            glyphsInXmlDoc = getGlyphInXmlDoc(gNodes),
            glyphFrequency = getGlyphFrequency(glyphsInXmlDoc),
            glyphFreqDescendingOrder = getGlyphFreqInDescendingOrder(glyphFrequency),
            moreFrequentGlyph = getMoreFreqGlyphInDoc(glyphFreqDescendingOrder);
         
         return getDefaultKeyboardKeys(moreFrequentGlyph);
      };
      
      VirtualKeyboard.prototype.getConfigKeyboardKeys = function(configKeys) {
         var glyphs = parsedData.getGlyphs(),
            configKeyboardKeys = {};
         
         for(var glyph in glyphs) {
            for(var i = 0; i < configKeys.length; i++) {
               if(glyph === configKeys[i]) {
                  configKeyboardKeys[configKeys[i]] = glyphs[glyph].mapping.diplomatic.content;
               }
            }
         }
         return configKeyboardKeys;
         
      };
      
      function getXmlDom() {
         return baseData.getXML();
      }
      
      function getXmlNamespace(xmlDocDom) {
         var xmlNamespace = {};
         evtSearchDocument.hasNamespace(xmlDocDom);
         xmlNamespace.ns = evtSearchDocument.ns;
         xmlNamespace.nsResolver = evtSearchDocument.nsResolver;
         return xmlNamespace;
      }
      
      function getGlyphNode(xmlDocDom, ns, nsResolver) {
         return ns ? xmlDocDom.evaluate(XPATH.ns.getGlyphNodes, xmlDocDom, nsResolver, XPathResult.ANY_TYPE, null)
                    : xmlDocDom.evaluate(XPATH.getGlyphNodes, xmlDocDom, null, XPathResult.ANY_TYPE, null);
      }
      
      function getGlyphInXmlDoc(glyphNodes) {
         var currentNode,
            glyphId,
            glyphsInXmlDoc = [];
         
         currentNode = glyphNodes.iterateNext();
         while(currentNode !== null) {
            glyphId = currentNode.getAttribute('ref').replace('#', '');
            glyphsInXmlDoc.push(glyphId);
            currentNode = glyphNodes.iterateNext();
         }
         
         return glyphsInXmlDoc;
      }
      
      function getGlyphFrequency(glyphInXmlDoc) {
         var glyphFrequency = {},
            currentGlyph,
            nextGlyph,
            glyphIsInGlyphFreq;
         
         for(var i = 0; i < glyphInXmlDoc.length - 1; i++) {
            currentGlyph = glyphInXmlDoc[i];
            nextGlyph = glyphInXmlDoc[i+1];
            
            if(Object.keys(glyphFrequency).length === 0) {
               glyphFrequency[glyphInXmlDoc[0]] = 1;
            }
            
            glyphIsInGlyphFreq = glyphIsInGlyphFrequency(nextGlyph, glyphFrequency);
            
            if(currentGlyph === nextGlyph) {
               glyphFrequency[currentGlyph]++;
            }
            else {
               if(glyphIsInGlyphFreq) {
                  glyphFrequency[nextGlyph]++;
               }
               else {
                  glyphFrequency[nextGlyph] = 1;
               }
            }
         }
         return glyphFrequency;
      }
      
      function glyphIsInGlyphFrequency(glyph, glyphFrequencies) {
         for(var g in glyphFrequencies) {
            if(g === glyph) {
               return true;
            }
         }
         return false;
      }
      
      function getGlyphFreqInDescendingOrder(glyphFrequency) {
         return Object.keys(glyphFrequency).sort(
            function(a, b){
               return glyphFrequency[b] - glyphFrequency[a];
            }
            );
      }
      
      function getMoreFreqGlyphInDoc(glyphFreqInDescendingOrder) {
         var moreFrequentGlyph = [],
            glyphsNumber = glyphFreqInDescendingOrder.length,
            defaultGlyphNumber = 20;
         
         while(glyphsNumber < defaultGlyphNumber) {
            defaultGlyphNumber--;
         }
         
         for(var i = 0; i < defaultGlyphNumber; i++) {
            moreFrequentGlyph.push(glyphFreqInDescendingOrder[i]);
         }
         return moreFrequentGlyph;
      }
      
      function getDefaultKeyboardKeys(moreFrequentGlyph) {
         var glyphs = parsedData.getGlyphs(),
            keyboardGlyphs = {};
         
         for(var glyph in glyphs) {
            for(var j = 0; j < moreFrequentGlyph.length; j++) {
               if(moreFrequentGlyph[j] === glyph) {
                  keyboardGlyphs[moreFrequentGlyph[j]] = glyphs[glyph].mapping.diplomatic.content;
               }
            }
         }
         return keyboardGlyphs;
      }
      
   }]);
