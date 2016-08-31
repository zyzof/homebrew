import * as React from 'react';
import { BoilIngredientField } from './BoilIngredientField';
import * as Brauhaus from 'brauhaus-ts';

interface BoilProps {
	onRecipeChange: Function;
	recipe: any;
}

interface BoilState {
	ibu: number;
	//hops: Hop[];
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
			volume: 20
		};

		this.addIngredientField();	//TODO remove if loading an existing recipe
	}

	private onVolumeChange(event: Event): void {
		console.log('Boil.tsx onVolumeChange()');

		let volume = (event.target as any).value;
		this.props.recipe.batchSize = volume;
		this.props.onRecipeChange();
	}

	private addIngredientField(): void {
		console.log('addIngredientField');

		this.props.recipe.spices.push(new Brauhaus.Spice({
			name: '',
			weight: 0,
			aa: 0,
			time: 0,
			use: '',
			form: ''
		}));
		this.setState(this.state);
	}

	private removeHopAtIndex(index: number): void {
		console.log('removeHopAtIndex: ' + index);

		this.props.recipe.spices.splice(index, 1);
		this.props.onRecipeChange();
	}

	private onHopChange(index: number, hop: Hop): void {
		console.log('onHopChange: ' + hop);

		let existingHop = this.props.recipe.spices[index];
		existingHop.aa = hop.alpha;
		existingHop.weight =  hop.weightG / 1000.0;
		existingHop.time = hop.durationM;

		this.props.onRecipeChange();
	}

	public render(): JSX.Element {
		console.log('Boil.tsx render()');
		console.log('recipe hops: ');
		console.log(this.props.recipe.spices);
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
				this.props.recipe.spices.map((value: any/*Brauhaus.ISpice*/, index: number, array: Hop[]) => {
					return <BoilIngredientField
							key={value.id}
							alpha={value.aa}
							weightG={value.weight}
							durationM={value.time}
							onChange={this.onHopChange.bind(this, index)}
							onRemove={this.removeHopAtIndex.bind(this, index)} />;
				})
			}
			<button className='add-ingredient-btn' onClick={this.addIngredientField.bind(this)}>Add Ingredient</button>
		</div>;
	}
}