import * as React from 'react';
import * as Brauhaus from 'brauhaus-ts';

interface Props {

}

interface State {
	volume: number;
	grainWeight: number;
	initialTemp: number;
	targetTemp: number;
}

export class TempIncrementCalculator extends React.Component<Props, State> {

	public constructor(props: Props) {
		super(props);
		this.state = {
			volume: 0, 
			grainWeight: 0,
			initialTemp: 0,
			targetTemp: 0
		};
	}

	private onStateChange(propName: string, event: Event) {
		let value = +(event.target as any).value;
		this.state[propName] = value;
		this.setState(this.state);
	}

	public render(): JSX.Element {
		return <div>
			<p className='calc-label'>Temperature increment</p>
			Volume: <input onChange={this.onStateChange.bind(this, 'volume')}/>
			Grain weight: <input onChange={this.onStateChange.bind(this, 'grainWeight')} />
			Initial temperature: <input onChange={this.onStateChange.bind(this, 'initialTemp')} />
			Target temperature: <input onChange={this.onStateChange.bind(this, 'targetTemp')} />

			Add 
			{
				Brauhaus.Utils.calcVolumeOfWaterForTempIncrement(
					this.state.volume,
					this.state.grainWeight,
					this.state.initialTemp,
					this.state.targetTemp
				)
			} L boiling water
		</div>;
	}
}