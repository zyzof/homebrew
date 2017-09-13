import * as React from 'react';
import * as $ from 'jquery';

import * as Brauhaus from 'brauhaus-ts';
import { MashIngredientField } from './MashIngredientField';
import { Utils } from './utils';

class FermentableFromDataFile {
	public name: string;
	public gravity: number;
	public lovibond: number;
	public description: string;
}

export interface MashProps {
	recipe: Brauhaus.Recipe;
	onRecipeChange: Function;
}

export interface MashState {
	fermentableOptions: string[];
};

export class Mash extends React.Component<MashProps, MashState>{

	private fermentableDataByName: { [name: string]: FermentableFromDataFile };

	public constructor(props: MashProps) {
		super(props);
		this.state = {
			fermentableOptions: []
		};
		this.fermentableDataByName = {};
		
		this.loadFermentables();

		if (this.props.recipe.fermentables.length === 0) {
			this.addIngredientField();
		}
	}

	private loadFermentables(): void {
		let self = this;
		// TODO bundle fermentables.json and avoid GET request
		let json: any = $.getJSON('./fermentables.json', (values: FermentableFromDataFile[]) => {
			for (let fermentable of values) {
				this.state.fermentableOptions.push(fermentable.name);
				this.fermentableDataByName[fermentable.name] = fermentable;
			}
			this.setState(this.state);
		});
	}

	private onEfficiencyChange(event: Event) {
		let efficiency = +(event.target as any).value;
		this.props.recipe.mashEfficiency = efficiency
		this.props.recipe.steepEfficiency = efficiency;
		this.props.onRecipeChange();
	}

	private onVolumeChange(event: Event) {
		this.props.recipe.batchSize = +(event.target as any).value;
		this.props.onRecipeChange();
	}

	private onFermentableChange(index: number, fermentable: {name: string, quantity: number}) {
		console.log('Mash.tsx onFermentableChange()');
		console.log(fermentable);

		let recipeFermentable = this.props.recipe.fermentables[index];
		recipeFermentable.name = fermentable.name;
		recipeFermentable.weight = fermentable.quantity;
		recipeFermentable.yield = Brauhaus.Utils.ppgToYield((this.fermentableDataByName[fermentable.name].gravity - 1) * 1000); //TODO
		recipeFermentable.color = Brauhaus.Utils.lovibondToSrm(this.fermentableDataByName[fermentable.name].lovibond);

		this.props.onRecipeChange();
	}

	private addIngredientField() {
		this.props.recipe.fermentables.push(new Brauhaus.Fermentable({
			name: '',
			yield: 0,
			color: 0,
			weight: 0
		}));
		this.props.onRecipeChange();
	}

	private removeFermentableAtIndex(index: number) {
		this.props.recipe.fermentables.splice(index, 1);
		this.props.onRecipeChange();
	}

	public render(): JSX.Element {
		console.log('Mash.tsx render()');
		//console.log('Mash.tsx recipe og: ' + this.props.recipe.og)
		console.log('Recipe fermentables: ');
		console.log(this.props.recipe.fermentables);

		return <div className='container'>
			<hr />

			<div className='row bottom-pad'>
				<div className='col-6'>
					<label for='volume'>Volume (L): </label>
					<input className='volume' 
							onChange={ this.onVolumeChange.bind(this) }
							defaultValue={ String(this.props.recipe.batchSize) } />
				</div>
				<div className='col-6 right-align'>
					<label for='efficiency'>Efficiency %: </label>
					<input className='efficiency'
							onChange={ this.onEfficiencyChange.bind(this) }
							defaultValue={ String(this.props.recipe.mashEfficiency) } />
				</div>
			</div>

			<div className='row bottom-pad'>
				<div className='col-12 sm-bottom-pad'>
					<label>Fermentables:</label>
				</div>
				{
					this.props.recipe.fermentables.map((value: Brauhaus.Fermentable, index: number) => {
						return <MashIngredientField key={value.id}
								options={this.state.fermentableOptions}
								name={value.name} 
								quantity={value.weight}
								onChange={this.onFermentableChange.bind(this, index)}
								onRemove={this.removeFermentableAtIndex.bind(this, index)} />;
					})
				}
				<div className='add-btn'>
					<button onClick={this.addIngredientField.bind(this)}>Add Ingredient</button>
				</div>
			</div>
			
			<div className='row'>
				<div className='calculated-label col-4 left-align'>
					OG: { Utils.formatNumberForDisplay(this.props.recipe.og, 3) }
				</div>
				<div className='calculated-label col-4 center-align'>
					SRM: { Utils.formatNumberForDisplay(this.props.recipe.color, 1) }
				</div>{/*TODO colour display*/}
				<div className='calculated-label col-4 right-align'>
					ABV: { Utils.formatNumberForDisplay(this.props.recipe.abv, 1) }%
				</div>
			</div>

			<hr />
		</div>;
	}
};