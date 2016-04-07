(function(){
    'use strict';

    angular.module("app")
        .directive("activity",activityDirective);

    function activityDirective(){
        return {
            restrict: 'E',
            templateUrl: 'app/components/activity/activity.template.html',
            scope:{
                activity: "="
            },
            link: function(scope,el,attr){
                //any...
            }

        }
    }
})();