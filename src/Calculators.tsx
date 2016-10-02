import * as React from 'react';
import * as Brauhaus from 'brauhaus-ts';

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
			<p className='calc-label'>ABV Estimation</p>
			<label for='calc-og'>OG: </label><input className='calc-og' onChange={this.onOgChange.bind(this)} />
			<label for='calc-fg'>FG: </label><input className='calc-fg' onChange={this.onFgChange.bind(this)}/>
			<br />
			ABV: { Brauhaus.Utils.calculateAbv(this.state.og, this.state.fg) }

			<p className='calc-label'>Strike temp</p>
			{/* TODO weight of grains, water vol */}

			<p className='calc-label'>Temperature increment</p>
			{/* TODO target temp, target volume(?) */}

			<p className='calc-label'>Temperature adjusted gravity</p>
			{/* TODO gravity reading, temperature */}

		</div>;
	}
}