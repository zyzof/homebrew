import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Brauhaus from 'brauhaus-ts';
let CardStack = require('react-cardstack').CardStack;
let Card = require('react-cardstack').Card;


export interface HelloProps { compiler: string; framework: string; }

export class Hello extends React.Component<HelloProps, {}> {
    render() {
    	console.log(Brauhaus);
        return <CardStack
		    height={500}
		    width={400}
		    background='#f8f8f8'
		    hoverOffset={25}>

		    <Card background='#2980B9'>
		        <h1>Mash</h1>
		    </Card>

		    <Card background='#27AE60'>
		        <h1>Boil</h1>
		    </Card>

		    <Card background='#2980B9'>
		        <h1>Timers</h1>
		    </Card>

		    <Card background='#27AE60'>
		        <h1>Fermentation</h1>
		    </Card>

		    <Card background='#2980B9'>
		        <h1>Saved Recipes</h1>
		    </Card>

		    <Card background='#27AE60'>
		        <h1>Carbonation</h1>
		    </Card>

		</CardStack>;
    }
}

ReactDOM.render(
	<Hello compiler="Typescript" framework="React" />,
	document.getElementById("example")
);