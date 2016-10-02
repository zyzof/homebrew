import * as React from 'react';
import * as Brauhaus from 'brauhaus-ts';
import { AbvCalculator } from './AbvCalculator';
import { TempIncrementCalculator } from './TempIncrementCalculator';

interface Props {

}

interface State {
	og: number;
	fg: number;
}

export class Calculators extends React.Component<Props, State> {

	public constructor(props: Props) {
		super(props);
		this.state = { og: 0, fg: 0 }
	}

	private onOgChange(event: Event) {
		let value = +(event.target as any).value;
		this.state.og = value;
		this.setState(this.state);
	}

	private onFgChange(event: Event) {
		let value = +(event.target as any).value;
		this.state.fg = value;
		this.setState(this.state);
	}

	public render(): JSX.Element {
		return <div>
			<AbvCalculator />

			<p className='calc-label'>Strike temp</p>
			{/* TODO weight of grains, water vol */}

			<TempIncrementCalculator />

			<p className='calc-label'>Temperature adjusted gravity</p>
			{/* TODO gravity reading, temperature */}

		</div>;
	}
}