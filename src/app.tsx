import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Brauhaus from 'brauhaus-ts';

import { ExpandableMenu, ExpandableMenuItem } from './ExpandableMenu';
import { Mash } from './Mash';
import { Boil } from './Boil';

export interface AppProps { 

};

enum ActivePanelsBitMask {
	None = 0,
	Mash = 1,
	Boil = 2,
	Timers = 4,
	Fermentation = 8,
	Carbonation = 16
}

export interface AppState {
	recipe: any;	// Brauhaus.Recipe (typings TODO)
	activePanels: ActivePanelsBitMask;
};

interface Recipe { og: number };

export class App extends React.Component<AppProps, AppState> {

	constructor(props: AppProps) {
		super(props);

		let recipe = this.loadMostRecent();
		console.log('app.tsx ctor');
		console.log(recipe);

		this.state = {
			recipe: recipe,
			activePanels: ActivePanelsBitMask.None
		};
		this.state.recipe.add('yeast', { attenuation: 75 });	// Required for ABV calc. TODO allow user-specified fg
		this.state.recipe.ibuMethod = 'tinseth';	// Required for ibu calc
	}

	private loadMostRecent(): any/*: Brauhaus.Recipe {*/ {
		let recipeStr: string = localStorage.getItem('recipes');
		// TODO display recipes to allow selection
		let recipe = recipeStr 
				? new Brauhaus.Recipe(JSON.parse(recipeStr)) 
				: new Brauhaus.Recipe();

		recipe.calculate();
		return recipe;
	}

	private togglePanel(panelId: ActivePanelsBitMask): void {
		this.state.activePanels = panelId ^ this.state.activePanels;
		this.setState(this.state);
	}

	private onRecipeChange(): void {
		console.log('app.tsx onRecipeChange()');
		
		localStorage.setItem('recipes', JSON.stringify(this.state.recipe));
		this.state.recipe.calculate();
		this.setState(this.state);
	}

    public render(): JSX.Element {
    	console.log('app.tsx render()');
    	console.log('activePanels = ' + this.state.activePanels);

        return <ExpandableMenu>

		    <ExpandableMenuItem headerText='Mash'
		    		icon='mash'
		    		onClick={this.togglePanel.bind(this, ActivePanelsBitMask.Mash)} />
		    { 
	    		(this.state.activePanels & ActivePanelsBitMask.Mash) 
	    			== ActivePanelsBitMask.Mash 
	    				? <Mash recipe={this.state.recipe} 
	    					onRecipeChange={this.onRecipeChange.bind(this)} />
	    				: null
			}

		    <ExpandableMenuItem headerText='Boil'
		    		icon='boil'
	    			onClick={this.togglePanel.bind(this, ActivePanelsBitMask.Boil)} />
		    {
	    		(this.state.activePanels & ActivePanelsBitMask.Boil) 
	    			== ActivePanelsBitMask.Boil 
	    				? <Mash recipe={this.state.recipe} 
	    					onRecipeChange={this.onRecipeChange.bind(this)} />
	    				: null
	    	}

		    <ExpandableMenuItem headerText='Timers'
		    		icon='timers'
		    		onClick={this.togglePanel.bind(this, ActivePanelsBitMask.Timers)}/>

		    <ExpandableMenuItem headerText='Fermentation'
		    		icon='fermentation'
		    		onClick={this.togglePanel.bind(this, ActivePanelsBitMask.Fermentation)}/>

		    <ExpandableMenuItem headerText='Carbonation'
		    		icon='carbonation' 
		    		onClick={this.togglePanel.bind(this, ActivePanelsBitMask.Carbonation)}/>

		</ExpandableMenu>;
    }

    public showContentForId(id: string) {

    }
}

ReactDOM.render(
	<App />,
	document.getElementById("example")
);