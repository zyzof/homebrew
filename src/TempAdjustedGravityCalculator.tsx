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
			<p className='calc-label'>Temperature Adjusted Gravity</p>
			Measured Gravity: <input onChange={this.onStateChange.bind(this, 'og')}/>
			Temperature: <input onChange={this.onStateChange.bind(this, 'temp')} />
			<p className='calc-label'>Room Temperature Gravity: { adjustedGravity } </p>
		</div>;
	}
}