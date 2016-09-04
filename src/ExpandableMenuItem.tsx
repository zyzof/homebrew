import * as React from 'react';

interface Props {
	headerText: string;
	icon: string;
	onClick: Function;
};

interface State {
	isOpen: boolean;
}

export class ExpandableMenuItem extends React.Component<Props, State> {

	public constructor(props: Props) {
		super(props);
		this.state = {
			isOpen: false
		};
		this.setState(this.state);
	}

	public handleClick(): void {
		console.log('menu item clicked');


		this.state.isOpen = !this.state.isOpen;
		this.props.onClick();
	}

	private getIcon(): string {
		let isOpen = this.state.isOpen;
		let iconUri = this.props.icon;
		if (isOpen) {
			iconUri += '-open';
		} else {
			iconUri += '-closed';
		}
		iconUri += '.png';

		return iconUri;
	}

	public render(): JSX.Element {
		return <div className='expandable-menu-item-header' onClick={ this.handleClick.bind(this) }>
			{ this.getIcon() /* TODO image element+styling */ }
			{ this.props.headerText }
		</div>;
	}
};