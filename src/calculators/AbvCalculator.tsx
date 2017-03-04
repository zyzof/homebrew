import * as React from 'react';
import * as Brauhaus from 'brauhaus-ts';
import { Utils } from '../utils';

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
		let abv: number = Brauhaus.Utils.calcAbv(this.state.og, this.state.fg);
		let abvStr: string = Utils.formatNumberForDisplay(abv, 1);
		return <div className="panel-container">
			<h2>ABV Estimation</h2>

			<div className="panel">
				<div className='one-quarter'>
					<label for='calc-og' className='label'>OG: </label>
					<input className='calc-og' onChange={this.onOgChange.bind(this)} />
				</div>

				<div className='one-quarter'>
					<label for='calc-fg' className='label'>FG: </label>
					<input className='calc-fg' onChange={this.onFgChange.bind(this)}/>
				</div>
			</div>

			<div className='calculated-label full-span'>
				<p className='label'>ABV: { abvStr }%</p>
			</div>

			<hr className="full-span" />
		</div>;
	}
}