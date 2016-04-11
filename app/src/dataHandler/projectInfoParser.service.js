angular.module('evtviewer.dataHandler')

.service('evtProjectInfoParser', function($q, parsedData, evtParser, xmlParser, GLOBALDEFAULTCONF) {
    var parser = {};
    var config = GLOBALDEFAULTCONF;
    
    var projectInfoDef         = '<teiHeader>',
        fileDescriptionDef     = '<fileDesc>',
        encodingDescriptionDef = '<encodingDesc>',
        textProfileDef         = '<profileDesc>',
        outsideMetadataDef     = '<xenoData>',
        revisionHistoryDef     = '<revisionDesc>';

    parser.parseProjectInfo = function(doc){
        var currentDocument = angular.element(doc);
        angular.forEach(currentDocument.find(projectInfoDef.replace(/[<>]/g, '')), 
            function(element) {
                parser.parseFileDescription(element);
                parser.parseEncodingDescription(element);
                parser.parseTextProfile(element);
                parser.parseOutsideMetadata(element);
                parser.parseRevisionHistory(element);
        });
    };

    /* **************** */
    /* File Description */
    /* *************************************************************************** */
    /* Containing a full bibliographical description of the computer file itself,  */
    /* from which a user of the text could derive a proper bibliographic citation, */ 
    /* or which a librarian or archivist could use in creating a catalogue entry   */
    /* recording its presence within a library or archive.                         */
    /* *************************************************************************** */
    parser.parseFileDescription = function(teiHeader){
        var currentDocument = angular.element(teiHeader);
        angular.forEach(currentDocument.find(fileDescriptionDef.replace(/[<>]/g, '')), 
            function(element) {
                parsedData.updateProjectInfoContent(element.outerHTML, 'fileDescription');
        });
        // console.log('## parseFileDescription ##', parsedData.getProjectInfo().fileDescription);
    };

    /* ******************** */
    /* Encoding Description */
    /* ************************************************************************************** */
    /* which describes the relationship between an electronic text and its source or sources. */
    /* ************************************************************************************** */
    parser.parseEncodingDescription = function(teiHeader){
        var currentDocument = angular.element(teiHeader);
        angular.forEach(currentDocument.find(encodingDescriptionDef.replace(/[<>]/g, '')), 
            function(element) {
                parsedData.updateProjectInfoContent(element.outerHTML, 'encodingDescription');
        });
        // console.log('## parseEncodingDescription ##', parsedData.getProjectInfo().encodingDescription);
    };

    /* ************ */
    /* Text Profile */
    /* *************************************************************************** */
    /* Containing classificatory and contextual information about the text,        */
    /* such as its subject matter, the situation in which it was produced,         */
    /* the individuals described by or participating in producing it, and so forth */
    /* *************************************************************************** */
    parser.parseTextProfile = function(teiHeader){
        var currentDocument = angular.element(teiHeader);
        angular.forEach(currentDocument.find(textProfileDef.replace(/[<>]/g, '')), 
            function(element) {
                parsedData.updateProjectInfoContent(element.outerHTML, 'textProfile');
        });
        // console.log('## parseTextProfile ##', parsedData.getProjectInfo().textProfile);
    };

    /* **************** */
    /* Outside Metadata */
    /* ****************************************************************************** */
    /* Container element which allows easy inclusion of metadata from non-TEI schemes */
    /* ****************************************************************************** */
    parser.parseOutsideMetadata = function(teiHeader){
        var currentDocument = angular.element(teiHeader);
        angular.forEach(currentDocument.find(outsideMetadataDef.replace(/[<>]/g, '')), 
            function(element) {
                parsedData.updateProjectInfoContent(element.outerHTML, 'outsideMetadata');
        });
        // console.log('## parseOutsideMetadata ##', parsedData.getProjectInfo().outsideMetadata);
    };

    /* **************** */
    /* Revision History */
    /* ************************************************************* */
    /* which allows the encoder to provide a history of changes made */
    /* during the development of the electronic text.                */
    /* ************************************************************* */
    parser.parseRevisionHistory = function(teiHeader){
        var currentDocument = angular.element(teiHeader);
        angular.forEach(currentDocument.find(revisionHistoryDef.replace(/[<>]/g, '')), 
            function(element) {
                parsedData.updateProjectInfoContent(element.outerHTML, 'revisionHistory');
        });
        // console.log('## parseRevisionHistory ##', parsedData.getProjectInfo().revisionHistory);
    };

    return parser;
});