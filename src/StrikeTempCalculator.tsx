import * as React from 'react';
import * as Brauhaus from 'brauhaus-ts';

interface Props {

}

interface State {
	volume: number;
	grainWeight: number;
	grainTemp: number;
	targetTemp: number;
}

export class StrikeTempCalculator extends React.Component<Props, State> {

	public constructor(props: Props) {
		super(props);
		this.state = {
			volume: 0, 
			grainWeight: 0,
			grainTemp: 0,
			targetTemp: 0
		};
	}

	private onStateChange(propName: string, event: Event) {
		let value = +(event.target as any).value;
		this.state[propName] = value;
		this.setState(this.state);
	}

	public render(): JSX.Element {
		let strikeTemp: number = Brauhaus.Utils.calcStrikeTemp(
			this.state.volume,
			this.state.grainWeight,
			this.state.grainTemp,
			this.state.targetTemp
		);

		return <div>
			<p className='calc-label'>Strike Temperature</p>
			Volume: <input onChange={this.onStateChange.bind(this, 'volume')}/>
			Grain weight: <input onChange={this.onStateChange.bind(this, 'grainWeight')} />
			Grain temperature: <input onChange={this.onStateChange.bind(this, 'grainTemp')} />
			Target temperature: <input onChange={this.onStateChange.bind(this, 'targetTemp')} />

			<p className='calc-label'>Strike temp: { strikeTemp } </p>
		</div>;
	}
}