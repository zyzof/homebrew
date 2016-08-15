import * as React from 'react';
import * as Brauhaus from 'brauhaus-ts';
import * as $ from 'jquery';

export class Fermentable {
	public name: string;
	public gravity: number;
	public lovibond: number;
	public description: string;
}

export interface MashIngredientsProps {

};

export interface MashIngredientState {
	og: number;
	abv: number;
	srm: number;

	efficiency: number;
	volume: number;
	fermentableOptionElements: JSX.Element[];	//List of elements in selector
	fermentableSelections: { [name: string]: number };	//name->quantity map
	fermentables: Fermentable[];	//All possible fermentables. Read from json.
	fermentableInputElements: JSX.Element[];
}

class FermentableSelection {
	fermentable: Fermentable;
	quantity: number;
}


export class MashIngredients extends React.Component<MashIngredientsProps, MashIngredientState>{

	public constructor(props: MashIngredientsProps) {
		super(props);
		this.state = { 
			og: 0.000,
			efficiency: 0,
			abv: 0.0,
			volume: 0.0,
			srm: 0.0,
			fermentableOptionElements: [],
			fermentableSelections: { },
			fermentables: [],
			fermentableInputElements: []
		};
		
		this.loadFermentables();
		this.addIngredientField();
	}

	private loadFermentables(): void {
		let self = this;
		let json: any = $.getJSON('./fermentables.json', (values) => {
			let i = 0;
			for (let fermentable of values) {
				this.state.fermentables.push(fermentable);
				this.state.fermentableOptionElements.push(
					<option key={fermentable.name}>
						{fermentable.name}
					</option>
				);

				console.log(fermentable);
				this.setState(this.state);
			}
		});
	}

	private onEfficiencyChange(event: Event) {
		this.state.efficiency = (event.target as any).value;
		this.onStateChange();
		console.log('updated efficiency');
	}

	private onVolumeChange(event: Event) {
		this.state.volume = (event.target as any).value;
		this.onStateChange();
		console.log('updated volume');
	}

	private onFermentableChange(event: Event) {
		let malt = (event.target as any).value;

		let quantity = (event.target as any).parentNode
				.getElementsByClassName('malt-quantity')[0].value;

		console.log('added fermentable ' + malt + ' of quantity ' + quantity);

		this.state.fermentableSelections[malt] = quantity;
		// TODO increase/decrease quantity based on malt
		// if there is more than one instance of the malt in the recipe

		console.log('onFermentablesChange ' + malt);
		this.onStateChange();
	}

	private onFermentableQuantityChange(event: Event) {
		// TODO find associated fermentable
		// & update this.state.fermentableSelection
		let quantity = (event.target as any).value;
		let malt = (event.target as any).parentNode
				.getElementsByClassName('malt')[0].value;

		this.state.fermentableSelections[malt] = quantity;
		// TODO increase/decrease quantity based on malt
		// if there is more than one instance of the malt in the recipe

		this.onStateChange();
	}

	private onStateChange() {
		this.state.og = this.calculateOg();
		this.state.abv = this.calculateAbv();
		this.state.srm = this.calculateSrm();

		this.setState(this.state);
		console.log('onStateChange()');
	}

	private calculateOg(): number {
		//Read from inputs
		//return number OG, or update UI here
		return 1.0;
	}

	private calculateSrm(): number {
		//this.state.fermentable.lovibond
		//Convert to srm
		//get colour value

		let lovibond = 0.0;
		// TODO
		// Lookup this.state.fermentableSelections
		// Find Fermentable in state.fermentables
		// Sum of fermentable lovibond contributions

		return Brauhaus.Utils.lovibondToSrm(lovibond);
	}

	private calculateAbv(): number {
		return 10.0;
	}

	private addIngredientField() {
		let index = this.state.fermentableInputElements.length;
		this.state.fermentableInputElements.push(
			<div className='malt-container'>
				<select className='malt' onChange={this.onFermentableChange.bind(this)} >
					{this.state.fermentableOptionElements}
				</select>
				<input className='malt-quantity' onChange={this.onFermentableQuantityChange.bind(this)} /> (kg)
				<button onClick={ () => this.removeIngredientFieldAtIndex(index) }>X</button>
			</div>
		);
		this.setState(this.state);
	}

	private removeIngredientFieldAtIndex(index: number) {
		this.state.fermentableInputElements.splice(index, 1);
		this.onStateChange();
		console.log('remove ingredient field at idx ' + index);
	}

	public render(): JSX.Element {

		//console.log(fermentableOptionElements);

		// TODO allow multiple malt-selections
		return <div className='input-screen'>
			<hr />

			<div className='og'>OG: { this.state.og }</div>
			<div className='srm'>SRM: { this.state.srm }</div>
			<br />
			<div className='expected-abv'>%ABV: { this.state.abv }</div>
			<br />
			<div className='volume'>
				<label for='volume'>Volume (L): </label><input className='volume' onChange={ this.onVolumeChange.bind(this) } />
			</div>
			<div className='efficiency'>
				<label for='efficiency'>Efficiency %: </label><input className='efficiency' onChange={ this.onEfficiencyChange.bind(this) } />
			</div>
			<br />
			Fermentables:
			{this.state.fermentableInputElements}
			<button className='add-ingredient-btn' onClick={this.addIngredientField.bind(this)}>Add Ingredient</button>
		</div>;
	}
};