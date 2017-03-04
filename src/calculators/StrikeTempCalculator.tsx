import * as React from 'react';
import * as Brauhaus from 'brauhaus-ts';
import { Utils } from '../utils'

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
		let strikeTempStr: string = Utils.formatNumberForDisplay(strikeTemp, 1);

		return <div className="panel-container">
			<h2>Strike Temperature</h2>

			<div className='panel'>
				<div className='one-half'>
					<label class='label' className='label'>Volume: </label>
					<input onChange={this.onStateChange.bind(this, 'volume')}/>
				</div>

				<div className='one-half'>
					<label class='label' className='label'>Grain weight: </label>
					<input onChange={this.onStateChange.bind(this, 'grainWeight')} />
				</div>

				<div className='one-half'>
					<label class='label' className='label'>Grain temperature: </label>
					<input onChange={this.onStateChange.bind(this, 'grainTemp')} />
				</div>

				<div className='one-half'>
					<label class='label' className='label'>Target temperature: </label>
					<input onChange={this.onStateChange.bind(this, 'targetTemp')} />
				</div>
			</div>

			<div className='calculated-label full-span'>
				<p className='label'>Strike at: { strikeTempStr }&deg;C </p>
			</div>

			<hr />
		</div>;
	}
}