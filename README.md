# angular-react-performance

Demo-Project for testing differences between rendering and scripting performance between pure angular (mainly ng-repeat) and angular + react.

**before use**:
`bower install`

**if needed**:
`npm install serve`
`serve`

**performance insights**:
Chrome Dev Tools -> timeline tab

## Results

Table contains 1000 rows and 13 columns

**initial rendering**
![initial rendering](https://raw.githubusercontent.com/manuschiller/angular-react-performance/master/bench/init.png "initial rendering")

**rerendering**
![rerendering](https://raw.githubusercontent.com/manuschiller/angular-react-performance/master/bench/rerender.png "rerendering")

**filtering**
(note: names were genereated randomly and therefore are not represented equally in the different versions. So it probably is not the best benchmark ever made by mankind but it should be enough for demo purposes...)
![filtering](https://raw.githubusercontent.com/manuschiller/angular-react-performance/master/bench/filter.png "filtering")

**update single value**
(one value in the dataset changes and view needs to be rerendered. According to other benchmarks reactjs is more intelligent in rerendering only changed elements.
![single value](https://raw.githubusercontent.com/manuschiller/angular-react-performance/master/bench/update-single.png "single value update")

##Conclusion:
Differences are small to none with realistic dataset sizes (< 100 rows) but become huge when adding more iterations or bloating up the HTML Templates that will be repeated.
Could be an option for projects where a lot of directives use their own templates (initial rendering time before templates are cached) and / or long lists, tables or other elements with repetitive content.

##Drawbacks:
* Nested directives have to be rewritten to nested ReactJS components 

```
<my-parent-directive>
  <my-child-directive />
<my-parent-directive>
``` 

won't work out of the box.

* All ng-*x and custom directives can NOT be used in react components. Functionality can be achieved with custom wiring of event-handlers between controllers - directives - ReactJS components. (Try to click on a header in the boundToReactive.react.html example) 

For the sake of simplicity I did not use JSX-Templates for the demo. If used, they would improve readability and maintainability and could provide an easy way to keep templates in separated files.

All in all substituting angular's rendering engine for react can provide some major performance impacts but it's probably only appropriate for special use cases.



