(function(){
    'use strict';

    angular.module("app")
        .directive("anyTable",anytableDirective);

    function anytableDirective(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/anytable/anytable.template.html',
            scope:{
                tableData: "="
            },
            link: function(scope,el,attr){
                // any
            }

        }
    }
})();