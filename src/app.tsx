import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ExpandableMenu, ExpandableMenuItem } from './ExpandableMenu';
import { MashIngredients } from './MashIngredients';

export interface AppProps { compiler: string; framework: string; }

export class App extends React.Component<AppProps, {}> {

	private toggleMashIngredients(): void {
		//TODO: make this work, or remove
	}

	/* TODO
	 * - onclick of first ExpandableMenuItem displays MashIngredients
	 * - remove onclick funcs/calls if unused
	 */
    render() {
        return <ExpandableMenu>

		    <ExpandableMenuItem headerText={'Mash'} onClick={this.toggleMashIngredients}>
		    	<MashIngredients />
		    </ExpandableMenuItem>

		    <ExpandableMenuItem headerText={'Boil'} onClick={this.toggleMashIngredients}/>

		    <ExpandableMenuItem headerText={'Timers'} onClick={this.toggleMashIngredients}/>

		    <ExpandableMenuItem headerText={'Fermentation'} onClick={this.toggleMashIngredients}/>

		    <ExpandableMenuItem headerText={'Carbonation'} onClick={this.toggleMashIngredients}/>

			<MashIngredients />

		</ExpandableMenu>;
    }

    public showContentForId(id: string) {

    }
}

ReactDOM.render(
	<App compiler="Typescript" framework="React" />,
	document.getElementById("example")
);