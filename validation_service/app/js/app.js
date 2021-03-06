// Bootstrap function 

(function() {

    window.base_url = 'https://127.0.0.1:8000/';
    // window.base_url = '';
    //window.base_url = 'https://validation-dev.brainsimulation.eu:443/';
    // window.base_url = 'https://138.197.190.105:443/';

    window.ver_api = '/api/v2/';

    angular.bootstrap().invoke(function($http, $log, $location) {
        $http.get('/config.json').then(function(res) {
            window.bbpConfig = res.data;

            angular.element(document).ready(function() {


                angular.bootstrap(document.getElementById("validation-app"), ['testApp']);
                angular.bootstrap(document.getElementById("configuration-app"), ['ParametersConfigurationApp']);
                angular.bootstrap(document.getElementById("model-catalog-app"), ['ModelCatalogApp']);


                setTimeout(function() {
                    // angular.clbBoostrap(document, ['testApp', /*'ModelCatalogApp', 'ParametersConfigurationApp'*/ ]);
                }, 1000);



                $log.info('Booted nmpi application');
            });

        }, function() {
            $log.error('Cannot boot nmpi application');
            window.location.href = '/login/hbp/?next=' + encodeURIComponent(window.location.pathname + window.location.search + window.location.hash);
        });
    });


    var testApp = angular.module('testApp', [
        'ui.router',
        'ng',
        'ngResource',
        'ParametersConfigurationServices',
        'ApiCommunicationServices',
        'DataHandlerServices',
        'GraphicsServices',
        'ngCookies',
        'nvd3',
        'ngTextTruncate',
        'HelpServices',

        'clb-ui-error',
        'clb-env',
        'clb-app',
        'hbpCollaboratory',

        // 'hbpCollaboratory',
        // 'clbBoostrap',
        // 'clb-env',
        // 'clb-error',
        // 'clb-ui-error',
        // 'clb-app',

        // 'hbpCollaboratoryCore',
        // 'angular-hbp-collaboratory',

        // 'clb-storage',



    ]);

    testApp.config(
        function($cookiesProvider, $httpProvider, $stateProvider, $locationProvider, $rootScopeProvider, $resourceProvider, $urlRouterProvider) {
            $resourceProvider.defaults.stripTrailingSlashes = false;
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/static/templates/validation_framework/home_1.tpl.html',
                    controller: 'HomeCtrl'
                })
                .state('help', {
                    url: '/home/validation_test/help',
                    templateUrl: '/static/templates/validation_framework/validation_help.tpl.html',
                    controller: 'ValHelpCtrl'
                })
                .state('validation_test', {
                    url: '/home/validation_test',
                    templateUrl: '/static/templates/validation_framework/validation_test.tpl.html',
                    controller: 'ValTestCtrl'
                })
                .state('create_validation_test', {
                    url: '/home/validation_test/create',
                    templateUrl: '/static/templates/validation_framework/validation_test_create.tpl.html',
                    controller: 'ValTestCreateCtrl'
                })
                .state('validation_test_detail', {
                    url: '/home/validation_test/:uuid',
                    templateUrl: '/static/templates/validation_framework/validation_test_detail.tpl.html',
                    controller: 'ValTestDetailCtrl'
                })

            .state('validation_test_result_detail', {
                url: '/home/validation_test_result/:uuid',
                templateUrl: '/static/templates/validation_framework/validation_test_result_detail.tpl.html',
                controller: 'ValTestResultDetailCtrl'
            })

            .state('validation_model_detail', {
                    url: '/home/validation_model_detail/:uuid',
                    templateUrl: '/static/templates/validation_framework/validation_model_detail.tpl.html',
                    controller: 'ValModelDetailCtrl'
                })
                .state('test_result', {
                    url: '/home/test_result',
                    templateUrl: '/static/templates/validation_framework/test_result.tpl.html',
                    controller: 'TestResultCtrl'
                });

            $urlRouterProvider.otherwise('/home');

        });



    //Model Catalog App
    var ModelCatalogApp = angular.module('ModelCatalogApp', [

        'ui.router',
        'ng',
        'ngResource',
        'ApiCommunicationServices',
        'DataHandlerServices',
        'ParametersConfigurationServices',
        'ContextServices',
        'HelpServices',
        'ngTextTruncate',
        'hbpCollaboratory',
    ]);

    ModelCatalogApp.config(
        function($httpProvider, $stateProvider, $locationProvider, $rootScopeProvider, $resourceProvider, $urlRouterProvider) {

            $resourceProvider.defaults.stripTrailingSlashes = false;
            $stateProvider
                .state('ModelCatalog', {
                    url: '/model-catalog',
                    templateUrl: '/static/templates/model_catalog/model-catalog.tpl.html',
                    controller: 'ModelCatalogCtrl'
                })
                .state('help', {
                    url: '/model-catalog/help',
                    templateUrl: '/static/templates/model_catalog/model-catalog_help.tpl.html',
                    controller: 'ModelCatalogHelpCtrl'
                })
                .state('ModelCatalogCreate', {
                    url: '/model-catalog/create',
                    templateUrl: '/static/templates/model_catalog/model-catalog-create.tpl.html',
                    controller: 'ModelCatalogCreateCtrl'
                })
                .state('ModelCatalogVersion', {
                    url: '/model-catalog/version',
                    templateUrl: '/static/templates/model_catalog/model-catalog-version.tpl.html',
                    controller: 'ModelCatalogVersionCtrl'
                })
                .state('ModelCatalogVersionUuid', {
                    url: '/model-catalog/version/:uuid',
                    templateUrl: '/static/templates/model_catalog/model-catalog-version.tpl.html',
                    controller: 'ModelCatalogVersionCtrl'
                })
                .state('ModelCatalogDetail', {
                    url: '/model-catalog/detail/:uuid',
                    templateUrl: '/static/templates/model_catalog/model-catalog-detail.tpl.html',
                    controller: 'ModelCatalogDetailCtrl'
                })
                .state('ModelCatalogEdit', {
                    url: '/model-catalog/edit/:uuid',
                    templateUrl: '/static/templates/model_catalog/model-catalog-edit.tpl.html',
                    controller: 'ModelCatalogEditCtrl'
                });
            $urlRouterProvider.otherwise('/model-catalog');

        });




    //Config App
    var ParametersConfigurationApp = angular.module('ParametersConfigurationApp', [
        'ui.router',
        'ng',
        'ngResource',
        'ParametersConfigurationServices',
        'ApiCommunicationServices',
        'ContextServices',
    ]);

    ParametersConfigurationApp.config(
        function($httpProvider, $stateProvider, $locationProvider, $rootScopeProvider, $resourceProvider, $urlRouterProvider) {

            $resourceProvider.defaults.stripTrailingSlashes = false;
            $stateProvider
                .state('ParametersConfiguration', {
                    url: '/parametersconfiguration',
                    templateUrl: '/static/templates/configuration/parameters-configuration.html',
                    controller: 'ParametersConfigurationCtrl'
                })
                .state('ValidationParametersConfiguration', {
                    url: '/validationparametersconfiguration',
                    templateUrl: '/static/templates/configuration/validation-parameters-configuration.tpl.html',
                    controller: 'ParametersConfigurationCtrl'
                })
                .state('ModelParametersConfiguration', {
                    url: '/modelparametersconfiguration',
                    templateUrl: '/static/templates/configuration/model-parameters-configuration.tpl.html',
                    controller: 'ParametersConfigurationCtrl'
                })

            $urlRouterProvider.otherwise('/parametersconfiguration');

        });

}());