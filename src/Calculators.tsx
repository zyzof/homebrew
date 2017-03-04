import * as React from 'react';
import * as Brauhaus from 'brauhaus-ts';
import { AbvCalculator } from './calculators/AbvCalculator';
import { TempIncrementCalculator } from './calculators/TempIncrementCalculator';
import { StrikeTempCalculator } from './calculators/StrikeTempCalculator';
import { TempAdjustedGravityCalculator } from './calculators/TempAdjustedGravityCalculator';

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
			<StrikeTempCalculator />
			<TempIncrementCalculator />
			<TempAdjustedGravityCalculator />
		</div>;
	}
}