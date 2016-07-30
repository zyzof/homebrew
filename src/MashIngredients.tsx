import * as React from 'react';

export interface MashIngredientsProps {

};

export class MashIngredients extends React.Component<MashIngredientsProps, {}>{

	public constructor(props: MashIngredientsProps) {
		super(props);
	}

	private calculateOg(): void {
		//Read from inputs
		//return number OG, or update UI here
	}

	public render(): JSX.Element {
		return <div className='input-screen'>
			<hr />

			<div className='og'>O.G.</div>
			<div className='fg'>Efficiency</div>
			<div className='expected-abv'>Expected %ABV</div>
			
			<label for='volume'>Volume (L):</label> <input className='volume' />
			<label for='efficiency'>Efficiency %:</label> <input className='efficiency' />

			<input className='malt-selector' />

		</div>;
	}
};