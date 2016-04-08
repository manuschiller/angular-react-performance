/**
 * Created by manu on 07.04.16.
 */

(function(){
    'use strict';

    angular.module("app",["react"]);

    angular.module("app")
        .controller("ActivityController",ActivityController);

    angular.module("app")
        .factory("TableData",function(){
            var generateRows = function( ) {
                var rows = [];
                var names = ["Peter","Paul","Mary","Manu","Niels","Jens","Oliver","Henriette"];

                var numberOfRows = 1000;

                for ( var i = 0; i <= numberOfRows; i++ ) {
                    var randomEntry = Math.floor(Math.random() * numberOfRows) + 1;
                    var randomName = names[Math.floor(Math.random() * names.length)];
                    var d = new Date();
                    rows.push( [
                        randomName,
                        'Last Name ' + randomEntry,
                        'name' + randomEntry + '@domain.com',
                        '@name' + randomEntry,
                        randomEntry,
                        d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + "." + d.getMilliseconds(),
                        "any column 1",
                        "any column 2",
                        "any column 3",
                        "any column 4",
                        "any column 5",
                        "any column 6",
                        "any column 7"
                    ] );
                }
                return rows;
            };

            var tableData = {
                cols: [ 'First Name', 'Last Name', 'Email', 'Twitter', 'Id', 'Modified',"any column 1","any column 2", "any column 3", "any column 4", "any column 5", "any column 6", "any column 7", ],
                rows: generateRows()
            };

            var regenerate = function(){
                tableData.rows = generateRows();
            };

            return{
                generateRows: generateRows,
                regenerate: regenerate,
                tableData: tableData
            }
        });

    angular.module("app")
        .controller("AnytableController",AnytableController);

    angular.module("app")
        .controller("BoundToDirectiveController",BoundToDirectiveController);

    function ActivityController(){
        var vm = this;
        var numberOfActivities = 5000;

        vm.createRandomActivities = function(){
            var names = ["Robin","Alex","Manu","Henriette","Niels","Jens","Oliver","Birthe","Markus","Roman"];
            var quotes = [
                "You can do anything, but not everything.—David Allen",
                "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.—Antoine de Saint-Exupéry",
                "The richest man is not he who has the most, but he who needs the least.—Unknown Author",
                "You miss 100 percent of the shots you never take.—Wayne Gretzky",
                "Courage is not the absence of fear, but rather the judgement that something else is more important than fear.—Ambrose Redmoon",
                "You must be the change you wish to see in the world.—Gandhi",
                "When hungry, eat your rice; when tired, close your eyes. Fools may laugh at me, but wise men will know what I mean.—Lin-Chi",
                "The third-rate mind is only happy when it is thinking with the majority. The second-rate mind is only happy when it is thinking with the minority. The first-rate mind is only happy when it is thinking.—A. A. Milne",
                "To the man who only has a hammer, everything he encounters begins to look like a nail.—Abraham Maslow",
                "We are what we repeatedly do; excellence, then, is not an act but a habit.—Aristotle"
            ];
            var activities = [];

            for(var i = 1; i <= numberOfActivities; i++){
                activities.push({
                    "id": i,
                    "author": names[Math.floor(Math.random() * names.length)],
                    "quote": quotes[Math.floor(Math.random() * quotes.length)]
                });
            }
            return activities;

        };
        vm.refreshActivities = function(){
            vm.activities = vm.createRandomActivities();
        };
        vm.refreshActivities();
    }

    function AnytableController(TableData){
        var vm = this;

        this.tableData = TableData.tableData;

        this.regenerate = function() {
            this.tableData = TableData.regenerate();
        };

        this.rowClick = function(e,test){

        }
    }

    function BoundToDirectiveController($scope,TableData){
        var vm = this;
        vm.filterTableQuery = "Manu";
        vm.filterDirection = 1;

        this.tableData = TableData.tableData;
        this.tableViewData = angular.copy(this.tableData);

        this.regenerate = function() {
            TableData.regenerate();
            this.tableData = TableData.tableData;
            this.tableViewData = angular.copy(TableData.tableData);
        };

        this.sortTable = function(col){
            /** TODO: WHY CAN I ONLY PASS THE COLUMN AS OBJECT? **/
            col = col.col;

            vm.filterDirection = vm.filterDirection * (-1);

            vm.tableViewData.rows.sort(function(a,b){
                if(a[col] > b[col]) return -1*vm.filterDirection;
                if(a[col] < b[col]) return vm.filterDirection;
            });

        };

        this.updateSingelValue = function(){
            var d = new Date();
            vm.tableData.rows[5][5] = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + "." + d.getMilliseconds();
            console.time("copy tableData");
            vm.tableViewData = angular.copy(vm.tableData);
            console.timeEnd("copy tableData");
        };

        this.filterTable = function(query){
            vm.tableViewData.rows = vm.tableData.rows.filter(function(row){
                return (row[0].indexOf(query) > -1);
            });
        }
    }


})();