import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Brauhaus from 'brauhaus-ts';

import { ExpandableMenu, ExpandableMenuItem } from './ExpandableMenu';
import { Mash } from './Mash';
import { Boil } from './Boil';
import { Calculators } from './Calculators';

export interface AppProps {

};

enum ActivePanelsBitMask {
	None = 0,
	Mash = 1,
	Boil = 2,
	Timers = 4,
	Calculators = 8
}

export interface AppState {
	recipe: Brauhaus.Recipe;
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


		this.state.recipe.batchSize = this.state.recipe.batchSize || 23;
		this.state.recipe.boilSize = this.state.recipe.boilSize || 20;
		this.state.recipe.mashEfficiency = this.state.recipe.mashEfficiency || 75;
		this.state.recipe.steepEfficiency = this.state.recipe.steepEfficiency || 75;
	}

	private loadMostRecent(): Brauhaus.Recipe {
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
	    		this.isOpen(ActivePanelsBitMask.Mash)
	    				? <Mash recipe={this.state.recipe} 
	    					onRecipeChange={this.onRecipeChange.bind(this)} />
	    				: null
			}

		    <ExpandableMenuItem headerText='Boil'
		    		icon='boil'
	    			onClick={this.togglePanel.bind(this, ActivePanelsBitMask.Boil)} />
		    {
	    		this.isOpen(ActivePanelsBitMask.Boil)
	    				? <Boil recipe={this.state.recipe} 
	    					onRecipeChange={this.onRecipeChange.bind(this)} />
	    				: null
	    	}

		    {/*
		    <ExpandableMenuItem headerText='Timers'
		    		icon='boil'
		    		onClick={this.togglePanel.bind(this, ActivePanelsBitMask.Timers)} />
	    	*/}

		    <ExpandableMenuItem headerText='Calculators'
		    		icon='calculators'
		    		onClick={this.togglePanel.bind(this, ActivePanelsBitMask.Calculators)} />
		    {
	    		this.isOpen(ActivePanelsBitMask.Calculators) 
	    				? <Calculators />
	    				: null
	    	}

		</ExpandableMenu>;
    }

    private isOpen(panelId: ActivePanelsBitMask): boolean {
    	return (this.state.activePanels & panelId) == panelId;
    }
}

ReactDOM.render(
	<App />,
	document.getElementById("example")
);