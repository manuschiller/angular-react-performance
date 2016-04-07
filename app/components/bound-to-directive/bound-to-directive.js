(function(){
    'use strict';

    angular.module("app")
        .directive("boundToDirective",boundToDirective)

        /**
         * @desc
         * By using a factory, we can $inject any angular service / value / const
         * to the react component
         */
        .factory("AnyReactComponent",anyReactComponent);


    function boundToDirective(AnyReactComponent){
        return{
            restrict: 'E',
            scope: {
                table: "=",
                liveUpdate: "=",
                onColClick: "&" // will serve a basic sorting functionality
            },
            template: "<div></div>",


            link:function(scope,element,attr){

                scope.$watch(function(){return scope.table;},function(){
                    renderReactElement();
                },true);

                scope.$watch(function(){return scope.liveUpdate;},function(){
                    renderReactElement();
                });

                function renderReactElement(){
                    var reactProps = {
                        table: scope.table,
                        liveUpdate: scope.liveUpdate,
                        onColClick: function(col){
                            /* TODO: HOW CAN I PASS THE ARGUMENT WITHOUT THE NASTY SCOPE.APPLY()? */
                            scope.$apply(
                                function changeViewModel() {
                                    scope.onColClick()({col:col});
                                });
                        }
                    };

                    ReactDOM.render(
                        React.createElement(AnyReactComponent,reactProps),
                        element[0]
                    );
                }
            }
        }
    }

    function anyReactComponent(){
        var component = React.createClass({
            propTypes : {
                table: React.PropTypes.object.isRequired,
                onColClick: React.PropTypes.func,
                liveUpdate: React.PropTypes.string
            },

            getDefaultProps: function() {
                return { table: {},liveUpdate:""} ;
            },

            /**
             * @desc
             * Components could have any kind of event handlers bound to the directive
             * or even the controller and therefore services as well
              * @param col
             */
            onColClick: function(col){
                this.props.onColClick(col);
            },

            /**
             * @desc
             * JSX Templates would make it possible to have a separate file for our template
             * and to provide a better readibility:

             * render: function(){
             *  return <div>{my.value}</div>
             * }

             * @returns {*}
             */
            render: function(){
                var self = this;

                var cols = this.props.table.cols.map( function( col, i ) {
                    return React.DOM.th( { key: i,onClick: self.onColClick.bind(self, i) }, col );
                } );
                var header = React.DOM.thead( {key:"theader"}, React.DOM.tr( {key:'header'}, cols ) );

                var body = React.DOM.tbody( {key:"tbody"}, this.props.table.rows.map( function( row, i ) {

                    return React.DOM.tr( { key: i }, row.map( function( cell, j ) {
                        //if(j == 0) cell = self.props.firstName;
                        if(self.props.liveUpdate.length != 0 && j == 0) cell = self.props.liveUpdate;
                        return React.DOM.td( { key: j }, cell );
                    } ) );
                } ) );

                return React.DOM.table( {key:'body', className:'table table-striped'}, [header, body] );
            }
        });

        return (component);
    }

})();