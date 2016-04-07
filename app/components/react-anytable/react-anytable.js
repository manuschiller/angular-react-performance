/**
 * Created by manu on 07.04.16.
 */

angular.module("app")
    .value( "ReactAnyTable", React.createClass( {

        propTypes : {
            table: React.PropTypes.object.isRequired,
            rowClick: React.PropTypes.func
        },

        getDefaultProps: function() {
            return { table: {}, liveUpdate: ""} ;
        },

        rowClick: function(e,cell){
            console.log(e);
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
        render: function() {

            var self = this;

            var cols = this.props.table.cols.map( function( col, i ) {
                return React.DOM.th( { key: i }, col );
            } );
            var header = React.DOM.thead( {key:"theader"}, React.DOM.tr( {key:'header'}, cols ) );

            var body = React.DOM.tbody( {key:"tbody"}, this.props.table.rows.map( function( row, i ) {

                return React.DOM.tr( { key: i }, row.map( function( cell, j ) {
                    return React.DOM.td( { key: j,
                            onClick: self.rowClick.bind(self,cell) }, cell );
                } ) );
            } ) );

            return React.DOM.table( {key:'body', className:'table table-striped'}, [header, body] );
        }
    }))

    .directive( 'reactAnyTable', function( reactDirective ) {
        return reactDirective( 'ReactAnyTable' );
    });