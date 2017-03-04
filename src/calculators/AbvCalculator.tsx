import * as React from 'react';
import * as Brauhaus from 'brauhaus-ts';

interface Props {

}

interface State {
	og: number;
	fg: number;
}

export class AbvCalculator extends React.Component<Props, State> {

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
			<h2>ABV Estimation</h2>

			<label for='calc-og' className='label'>OG: </label>
			<input className='calc-og' onChange={this.onOgChange.bind(this)} />

			<label for='calc-fg' className='label'>FG: </label>
			<input className='calc-fg' onChange={this.onFgChange.bind(this)}/>

			<div className='calculated-label'>
				<p className='label'>ABV: { Brauhaus.Utils.calcAbv(this.state.og, this.state.fg) }</p>
			</div>
		</div>;
	}
}