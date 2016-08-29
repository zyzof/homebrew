import * as React from 'react';
import { BoilIngredientField } from './BoilIngredientField';
import * as Brauhaus from 'brauhaus-ts';

interface BoilProps {
	onRecipeChanged: Function;
	recipe: any;
}

interface BoilState {
	ibu: number;
	hops: Hop[];	//TODO: remove this, use props.recipe.spices
	volume: number;
}

interface Hop {
	id: number;
	alpha: number;
	weightG: number;
	durationM: number;
}

export class Boil extends React.Component<BoilProps, BoilState>{

	private nextFieldId: number = 0;

	public constructor(props: BoilProps) {
		super(props);
		this.state = {
			ibu: 0,
			hops: [{id: this.nextFieldId++, alpha: 10, weightG: 0.04, durationM: 60}],
			volume: 20
		};
	}

	private onVolumeChange(event: Event): void {
		console.log('Boil.tsx onVolumeChange()');

		let volume = (event.target as any).value;
		this.props.recipe.batchSize = volume;
		this.props.onRecipeChanged({});
	}

	private addIngredientField(): void {
		console.log('addIngredientField');

		//this.props.onRecipeChanged({});

		this.state.hops.push({
			id: this.nextFieldId++,
			alpha: 0,
			weightG: 0,
			durationM: 0
		});
		this.setState(this.state);
	}

	private removeHopAtIndex(index: number): void {
		console.log('removeHopAtIndex: ' + index);

		this.state.hops.splice(index, 1);
		this.props.recipe.spices = [];
		for (let hop of this.state.hops) {
			this.props.recipe.spices.push(new Brauhaus.Spice({
				name: '',
				weight: hop.weightG / 1000,
				aa: hop.alpha,
				time: hop.durationM,
				use: '',
				form: ''
			}));
		}
		this.setState(this.state);

		this.props.onRecipeChanged({});
	}

	private onHopChange(index: number, hop: Hop): void {
		console.log('onHopChange: ' + hop);

		this.state.hops[index] = hop;

		this.props.recipe.spices = [];
		for (let hop of this.state.hops) {
			this.props.recipe.spices.push(new Brauhaus.Spice({
				name: '',
				weight: hop.weightG / 1000,
				aa: hop.alpha,
				time: hop.durationM,
				use: '',
				form: ''
			}));
		}

		this.setState(this.state);
		this.props.onRecipeChanged({});
	}

	public render(): JSX.Element {
		return <div className='input-screen'>
			<hr />

			<div className='ibu'>IBU: { this.state.ibu }</div>
			<br />
			<div className='volume'>
				<label for='volume'>Volume (L): </label>
				<input className='volume' 
						onChange={ this.onVolumeChange.bind(this) }
						defaultValue={ this.props.recipe.batchSize } />
			</div>
			{/* TODO allow OG override here? */}
			<br />
			Hops: 
			{
				this.state.hops.map((value: Hop, index: number, array: Hop[]) => {
					return <BoilIngredientField
							key={value.id}
							alpha={value.alpha}
							weightG={value.weightG}
							durationM={value.durationM}
							onChange={this.onHopChange.bind(this, index)}
							onRemove={this.removeHopAtIndex.bind(this, index)} />;
				})
			}
			<button className='add-ingredient-btn' onClick={this.addIngredientField.bind(this)}>Add Ingredient</button>
		</div>;
	}
}