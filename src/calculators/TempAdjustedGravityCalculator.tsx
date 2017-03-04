import * as React from 'react';
import * as Brauhaus from 'brauhaus-ts';

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

		return <div>
			<h2>Temperature Adjusted Gravity</h2>

			<label className='label'>Measured Gravity: </label>
			<input onChange={this.onStateChange.bind(this, 'og')}/>

			<label className='label'>Temperature: </label>
			<input onChange={this.onStateChange.bind(this, 'temp')} />

			<div className='calculated-label'>
				<p className='label'>Room Temperature Gravity: { adjustedGravity } </p>
			</div>
		</div>;
	}
}