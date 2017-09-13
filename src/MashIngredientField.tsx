import * as React from 'react';

interface Props {
	options: string[];
	name: string;
	quantity: number;
	onChange: Function;
	onRemove: Function;
};

interface State {

};

export class MashIngredientField extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
	}

	private onMaltChange(event: Event) {
		let name = (event.target as any).value;
		this.props.onChange({
			name: name,
			quantity: this.props.quantity
		});
	}

	private onQuantityChange(event: Event) {
		let quantity = +(event.target as any).value;
		this.props.onChange({
			name: this.props.name,
			quantity: quantity
		});
	}

	public render(): JSX.Element {
		return <div className='row mash-ingredient-row'>
			<div className="col-8 fermentable-select">
				<select onChange={this.onMaltChange.bind(this)} 
						value={this.props.name}>
					{
						this.props.options.map((value: string, index: number) => {
							return <option key={index}>{value}</option>;
						})
					}
				</select>
			</div>
			<div className="col-2 no-side-padding">
				<input className='quantity-input' onChange={this.onQuantityChange.bind(this)}
						defaultValue={ String(this.props.quantity) } />
			</div>

			<div className="col-2 remove-ingredient-btn">
				<button onClick={this.props.onRemove.bind(this)}>X</button>
			</div>

		</div>;
	}
}