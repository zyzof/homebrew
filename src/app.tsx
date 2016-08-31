import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Brauhaus from 'brauhaus-ts';

import { ExpandableMenu, ExpandableMenuItem } from './ExpandableMenu';
import { Mash } from './Mash';
import { Boil } from './Boil';

export interface AppProps { 

};

export interface AppState {
	recipe: any;	// Brauhaus.Recipe (typings TODO)
};

interface Recipe { og: number };

export class App extends React.Component<AppProps, AppState> {

	constructor(props: AppProps) {
		super(props);

		let recipe = new Brauhaus.Recipe();
		this.state = {
			recipe: recipe
		};
		this.state.recipe.add('yeast', { attenuation: 75 });	// Required for ABV calc. TODO allow user-specified fg
	}

	private toggleMashIngredients(): void {
		//TODO: make this work, or remove
	}

	private onRecipeChange(): void {
		console.log('app.tsx onRecipeChange()');
		this.state.recipe.calculate();
		this.setState(this.state);
	}

	/* TODO
	 * - onclick of first ExpandableMenuItem displays MashIngredients
	 * - remove onclick funcs/calls if unused
	 */
    render() {
    	console.log('app.tsx render()');

        return <ExpandableMenu>

			<Mash recipe={this.state.recipe} onRecipeChange={this.onRecipeChange.bind(this)}/>

			<hr />
			
			<Boil recipe={this.state.recipe} onRecipeChange={this.onRecipeChange.bind(this)} />


		    <ExpandableMenuItem headerText={'Mash'} onClick={this.toggleMashIngredients}>
		    	{ /* TODO <Mash /> here */ }
		    </ExpandableMenuItem>

		    <ExpandableMenuItem headerText={'Boil'} onClick={this.toggleMashIngredients}>
		    	{ /* TODO <Boil /> here */ }
		    </ExpandableMenuItem>

		    <ExpandableMenuItem headerText={'Timers'} onClick={this.toggleMashIngredients}/>

		    <ExpandableMenuItem headerText={'Fermentation'} onClick={this.toggleMashIngredients}/>

		    <ExpandableMenuItem headerText={'Carbonation'} onClick={this.toggleMashIngredients}/>

		</ExpandableMenu>;
    }

    public showContentForId(id: string) {

    }
}

ReactDOM.render(
	<App />,
	document.getElementById("example")
);