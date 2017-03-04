import * as React from 'react';
import * as Brauhaus from 'brauhaus-ts';
import { Utils } from '../utils';

interface Props {

}

interface State {
	og: number, 
	temp: number
}

export class TempAdjustedGravityCalculator extends React.Component<Props, State> {

	public constructor(props: Props) {
		super(props);
		this.state = {
			og: 1.000,
			temp: 80
		};
	}

	private onStateChange(propName: string, event: Event) {
		let value = +(event.target as any).value;
		this.state[propName] = value;
		this.setState(this.state);
	}

	public render(): JSX.Element {
		let adjustedGravity: number = Brauhaus.Utils.calcTempAdjustedGravity(
			this.state.og,
			this.state.temp
		);
		let adjustedGravityStr: string = Utils.formatNumberForDisplay(adjustedGravity, 3);

		return <div className='panel-container'>
			<h2>Temperature Adjusted Gravity</h2>

			<div className='panel'>
				<div className='one-half'>
					<label className='label'>Measured Gravity: </label>
					<input onChange={this.onStateChange.bind(this, 'og')}/>
				</div>

				<div className='one-half'>
					<label className='label'>Temperature: </label>
					<input onChange={this.onStateChange.bind(this, 'temp')} />
				</div>
			</div>

			<div className='calculated-label full-span'>
				<p className='label'>Room Temperature Gravity: { adjustedGravityStr } </p>
			</div>
		</div>;
	}
}