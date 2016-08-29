import * as React from 'react';

import * as Brauhaus from 'brauhaus-ts';
//import Brauhaus from 'brauhaus-ts';

//import { Recipe, Utils } from 'brauhaus-ts';
//import Brauhaus = require('brauhaus-ts');

import * as $ from 'jquery';

//class MyRecipe extends Brauhaus.Recipe {} // Why the fuck do i have to do this?? Why can't i use Brauhaus.Recipe directly as a type?

export class HbFermentable {
	public name: string;
	public gravity: number;
	public lovibond: number;
	public description: string;
}

export interface MashProps {
	recipe: any;	//TODO type info!!
	onRecipeChange: Function;
}

export interface MashState {
	og: number;
    abv: number;
    srm: number;

	fermentableOptionElements: JSX.Element[];	//List of elements in selector
	fermentableSelections: { [name: string]: number };	//name->quantity map
	fermentablesByName: { [name: string]: HbFermentable };	//All possible fermentables. Read from json.
	fermentableInputElements: JSX.Element[];
}

class FermentableSelection {
	fermentable: HbFermentable;
	quantity: number;
}


export class Mash extends React.Component<MashProps, MashState>{

	public constructor(props: MashProps) {
		super(props);
		this.state = {
			og: 0.000,
            abv: 0.0,
            srm: 0.0,

			fermentableOptionElements: [],
			fermentableSelections: { },
			fermentablesByName: { },
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
				this.state.fermentablesByName[fermentable.name] = fermentable;
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
		this.props.recipe.mashEfficiency = +(event.target as any).value;
		this.props.recipe.steepEfficiency = this.props.recipe.mashEfficiency;
		//this.onStateChange();
		this.props.onRecipeChange();
		console.log('updated efficiency');
	}

	private onVolumeChange(event: Event) {
		this.props.recipe.batchSize = +(event.target as any).value;
		//this.onStateChange();
		this.props.onRecipeChange();
		console.log('updated volume');
	}

	/*private onFermentableChange(event: Event) {
		// TODO clear all fermentables, readd all from UI (handles the situation where this field already had a selection)
		let malt = (event.target as any).value;

		let quantity = +(event.target as any).parentNode
				.getElementsByClassName('malt-quantity')[0].value;

		let fermentableData: HbFermentable = this.state.fermentablesByName[malt];

		// Add to Brauhaus recipe:
		let fermentable: any = new Brauhaus.Fermentable();
		fermentable.name = this.state.fermentablesByName[malt].name;
		fermentable.yield = Brauhaus.Utils.ppgToYield((fermentableData.gravity - 1) * 1000);
		fermentable.color = Brauhaus.Utils.lovibondToSrm(fermentableData.lovibond);
		fermentable.weight = quantity;
		this.props.recipe.add('fermentable', fermentable);

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
	}*/

	/*private onFermentableChange(event?: Event) {
		this.setState(this.state);
		this.props.recipe.fermentables = [];

		//
		let maltElements = document.getElementsByClassName('malt-container');
		for (let maltElement of maltElements) {
			let maltName = (maltElement.getElementsByClassName('malt')[0] as any).value;
			let quantity = (maltElement.getElementsByClassName('malt-quantity')[0] as any).value;
			let malt: HbFermentable = this.state.fermentablesByName[maltName];

			this.props.recipe.add('fermentable', {
				name: malt.name,
				yield: Brauhaus.Utils.ppgToYield((malt.gravity - 1) * 1000),
				color: Brauhaus.Utils.lovibondToSrm(malt.lovibond),
				weight: +quantity
			});
		}

		this.onStateChange();
	}*/

	private onFermentableChange(event?: Event) {
		// TODO set fermentable info on recipe
		// TODO notify app.tsx of an update, and have App propagate recipe change down to children?
	}

	private onStateChange() {

		this.props.recipe.calculate();
		this.state.og = this.props.recipe.og;
		this.state.abv = this.props.recipe.abv;
		this.state.srm = this.props.recipe.color;

		//this.setState(this.state);

		console.log('onStateChange()');
	}

	private addIngredientField() {
		let index = this.state.fermentableInputElements.length;
		this.state.fermentableInputElements.push(
			<div className='malt-container'>
				<select className='malt' onChange={this.onFermentableChange.bind(this)} >
					{this.state.fermentableOptionElements}
				</select>
				<input className='malt-quantity' onChange={this.onFermentableChange.bind(this)} /> (kg)
				<button onClick={ () => this.removeIngredientFieldAtIndex(index) }>X</button>
			</div>
		);
		this.setState(this.state);
	}

	private removeIngredientFieldAtIndex(index: number) {
		//this.state.fermentableInputElements.splice(index, 1);
		// TODO remove from recipe
		this.state.fermentableInputElements[index] = null;	//TODO avoid leaking here (remove properly - use a map?)
		this.onFermentableChange();
		console.log('remove ingredient field at idx ' + index);
	}

	public render(): JSX.Element {
		console.log('Mash.tsx render()');
		console.log('Mash.tsx recipe og: ' + this.props.recipe.og)

		return <div className='input-screen'>
			<hr />

			<div className='og'>OG: { this.props.recipe.og }</div>
			<div className='srm'>SRM: { this.props.recipe.srm }</div>
			<br />
			<div className='expected-abv'>%ABV: { this.props.recipe.abv }</div>
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