import * as React from 'react';

interface State {

};

interface Props {
	alpha: number;
	weightG: number;
	durationM: number;
	onChange: Function;
	onRemove: Function;
};

export class BoilIngredientField extends React.Component<Props, State> {
	
	constructor(props: Props) {
		super(props);
	}

	private onAlphaChange(event: Event) {
		let alpha = +(event.target as any).value;
		console.log('BoilIngredientField onAlphaChange()');
		console.log(alpha);
		this.props.onChange({
			alpha: alpha,
			weightG: this.props.weightG,
			durationM: this.props.durationM
		});
	}

	private onWeightChange(event: Event) {
		let weight = +(event.target as any).value;
		console.log('weight ' + weight);
		this.props.onChange({
			alpha: this.props.alpha,
			weightG: weight,
			durationM: this.props.durationM
		});
	}

	private onDurationChange(event: Event) {
		let duration = +(event.target as any).value;
		console.log('duration ' + duration);
		this.props.onChange({
			alpha: this.props.alpha,
			weightG: this.props.weightG,
			durationM: duration
		});
	}

	public render(): JSX.Element {
		return <div className='row boil-ingredient-row form-group form-horizontal'>
				<div className='col-3 quantity-input form-control'>
					<input id='alpha' defaultValue={ String(this.props.alpha) } 
							onChange={this.onAlphaChange.bind(this)} />
				</div>
				<div className='col-3 quantity-input form-control'>
					<input id='weight' defaultValue={ String(this.props.weightG) } 
							onChange={this.onWeightChange.bind(this)} />
				</div>
				<div className='col-6'>
					<div className='quantity-input form-control'>
						<input id='duration' defaultValue={ String(this.props.durationM) } 
								onChange={this.onDurationChange.bind(this)} />
					</div>
					<div className='remove-ingredient-btn'>
						<button onClick={this.props.onRemove.bind(this)}>X</button>
					</div>
				</div>
			</div>;
	}
}