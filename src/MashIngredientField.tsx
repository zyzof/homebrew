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
		return <div>
			<select onChange={this.onMaltChange.bind(this)} 
					defaultValue={this.props.name}>
				{
					this.props.options.map((value: string, index: number) => {
						return <option key={index}>{value}</option>;
					})
				}
			</select>
			<input onChange={this.onQuantityChange.bind(this)} defaultValue={this.props.quantity} />
			<button onClick={this.props.onRemove.bind(this)}>X</button>

		</div>;
	}
}