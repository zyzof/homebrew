import * as React from 'react';
import { ExpandableMenuItem } from './ExpandableMenuItem';

export { ExpandableMenuItem };

interface Props {
};

export class ExpandableMenu extends React.Component<Props, {}>{

	public constructor(props: Props) {
		super(props);
	}

	public handleItemClick(): void {
		console.log('menu area clicked');
	}

	public render(): JSX.Element {
		return <div className='menu' onClick={ this.handleItemClick }>
					{this.props.children}
				</div>;
	}
};