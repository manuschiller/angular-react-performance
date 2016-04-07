angular.module("app")
    .value( "ReactActivity", React.createClass( {

        propTypes : {
            activities: React.PropTypes.array.isRequired
        },

        getDefaultProps: function() {
            return { activities: []} ;
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
            var panels = this.props.activities.map(function(activity){
                    return React.createElement(
                        "div",
                        { "className": "panel panel-default" },
                        React.createElement(
                            "div",
                            { "className": "panel-heading" },
                            React.createElement(
                                "h3",
                                null,
                                "Activity #" + activity.id
                            )
                        ),
                        React.createElement(
                            "div",
                            { "className": "panel-body" },
                            React.createElement(
                                "p",
                                null,
                                activity.author + "'s  ",
                                React.createElement(
                                    "small",
                                    null,
                                    "favourite quote:"
                                )
                            ),
                            React.createElement(
                                "p",
                                null,
                                React.createElement(
                                    "strong",
                                    null,
                                    activity.quote
                                )
                            )
                        )
                    );
                });

            return React.DOM.div({key:"activity-feed"},[panels]);
        }
    }))

    .directive( 'reactActivity', function( reactDirective ) {
        return reactDirective( 'ReactActivity' );
    });