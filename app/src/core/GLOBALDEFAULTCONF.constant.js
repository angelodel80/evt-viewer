angular.module('evtviewer.core')

.constant('GLOBALDEFAULTCONF', {

    // TODO: select doc system 
    /**
     * @module evtviewerCore
     * @ngdoc object
     * @name test
     * @description
     * `object`
     *
     * Some info
     *
     * Default:
     * <pre>
     * test: {
     *   active: false
     * }
     * </pre>
     */
    test: {
        active: false
    },

    /**
     * @module evtviewerCore
     * @ngdoc object
     * @name debugAllModules
     * @description
     * `boolean`
     * Active debug log for all modules.
     *
     * Default:
     * <pre> debugAllModules: false </pre>
     */
    debugAllModules: true,

    debugConf: {
        log: true,
        info: true,
        warn: true,
        debug: true
    },

    modules: {
        interface: {
            active: true
        }
    },
    /**
     * @module evtviewerCore
     * @ngdoc object
     * @name configUrl
     * @description
     * `boolean`
     * Url for external configuration file
     *
     * Default for DEV:
     * <pre> configUrl: '../../config/config.json' </pre>
     * Default for BUILD:
     * <pre> configUrl: 'config/config.json' </pre>
     */
    configUrl       : '../../config/config.json',
    

    dataUrl          : '../../data/Phibor_Esempio_codifica.xml',
    /*sourcesUrl*/
    /*Url of the XML file encoding the list of all the bibliographic references for the sources apparatus.*/
    sourcesUrl       : '',
    /*analoguesUrl*/
    /*Url of the XML file encoding the list of all the bibliographic references for the analogues apparatus.*/
    analoguesUrl     : '../../data/analogues.xml',
    preferredWitness : 'A',
    skipWitnesses    : '',

    indexTitle       : 'EVT Critical Viewer',
    webSite          : '',
    
    editionType        : 'critical',

    defaultViewMode    : 'readingTxt',
    defaultEdition     : 'critical',
    availableViewModes : [
                            {
                                label    : 'Reading Text',
                                icon     : 'reading-txt',
                                viewMode : 'readingTxt',
                                visible  : true
                            },
                            {
                                label    : 'Versions',
                                icon     : 'mode-versions',
                                viewMode : 'versions',
                                visible  : true
                            },
                            {
                                label    : 'Image Text',
                                icon     : 'mode-imgTxt',
                                viewMode : 'imgTxt',
                                visible  : true
                            },
                            {
                                label    : 'Text Text',
                                icon     : 'mode-txtTxt',
                                viewMode : 'txtTxt',
                                visible  : false
                            },
                            {
                                label    : 'Collation',
                                icon     : 'mode-collation',
                                viewMode : 'collation',
                                visible  : true
                            },
                            {
                                label    : 'Source Text',
                                icon     : 'mode-srcTxt',
                                viewMode : 'srcTxt',
                                visible  : true
                            }],

    toolHeatMap : true,
    toolPinAppEntries : false,
    
    listDef                    : 'listWit, listChange',
    versionDef                 : 'witness, change',
    fragmentMilestone          : '<witStart>, <witEnd>',
    lacunaMilestone            : '<lacunaStart>, <lacunaEnd>',
    skipCriticalEntriesFilters : 'wit, target, corresp',
    possibleVariantFilters     : 'type, cause, hand',
    possibleLemmaFilters       : 'resp, cert',
    notSignificantVariant      : '<orig>, <sic>, [type=orthographic]',

    /*Versions*/
    /*Array to encode cases of double or multiple redactions of the text*/
    /*The array collects the id used inside of the XML file as values of*/
    /*the @ana attribute on the rdgGrp element.                         */
    /*The first id will correspond to the default version.              */
    versions : ["rec_1", "rec_2", "rec_3"],

    /*witnessesGroups*/
    /*Used to divide the readings of all critical apparatus entries into groups.*/
    /*The witnesses property is required in order to have the partition.        */
    /*The groupName is optional: if set the name will be displayed.             */
    witnessesGroups: [
        {
            groupName : "Grp_1",
            witnesses : ["V", "P", "N", "M", "G", "C", "R"]
        },
        {
            groupName : "Grp_2",
            witnesses : ["F", "D", "O", "W", "M5mg", "B", "U"]
        }
    ],

    /*Definition of the element used within the XML file to encode quotes for the sources apparatus.*/
    quoteDef    : '',
    /*Definition of the element used within the XML file to encode passages for the analogues apparatus.*/
    analogueDef : '',
    
    loadCriticalEntriesImmediately : true,
    maxWitsLoadTogether            : 5,

    variantColors : { },
    filterColors  : { },
    genericColors : ['rgb(52, 197, 173)', 'rgb(238, 194, 66)', 'rgb(253, 153, 54)', 'rgb(253, 95, 58)',
                     'rgb(235, 77, 153)', 'rgb(252, 144, 172)', 'rgb(171, 99, 219)', 'rgb(67, 135, 217)',
                     'rgb(163, 207, 81)', 'rgb(238, 194, 66)', 'rgb(228, 99, 220)', 'rgb(124, 113, 232)'],
    
    variantColorLight : 'rgb(208, 220, 255)',
    variantColorDark  : 'rgb(101, 138, 255)',
    heatmapColor      : 'rgb(255, 108, 63)',
    xsltUrl: ''
});