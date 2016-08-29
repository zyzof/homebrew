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

	private onAlphaChange() {
		let alpha = (event.target as any).value;
		this.props.onChange({
			//id: this.props.id,
			alpha: alpha,
			weightG: this.props.weightG,
			durationM: this.props.durationM
		});
	}

	private onWeightChange(event: Event) {
		let weight = (event.target as any).value;
		this.props.onChange({
			//id: this.props.id,
			alpha: this.props.alpha,
			weightG: weight,
			durationM: this.props.durationM
		});
	}

	private onDurationChange(event: Event) {
		let duration = (event.target as any).value;
		this.props.onChange({
			//id: this.props.id,
			alpha: this.props.alpha,
			weightG: this.props.weightG,
			durationM: duration
		});
	}

	public render(): JSX.Element {
		return <div>
				<label for='alpha'>Alpha: </label>
				<input className='alpha' defaultValue={this.props.alpha} 
						onChange={this.onAlphaChange.bind(this)} />

				<label for='weight'>Weight: </label>
				<input className='weight' defaultValue={this.props.weightG} 
						onChange={this.onWeightChange.bind(this)} />

				<label for='duration'>Duration: </label>
				<input className='duration' defaultValue={this.props.durationM} 
						onChange={this.onDurationChange.bind(this)} />

				<button onClick={this.props.onRemove.bind(this)}>X</button>
			</div>;
	}
}