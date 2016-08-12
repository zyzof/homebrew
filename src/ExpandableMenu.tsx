import * as React from 'react';

export interface ExpandableMenuProps {
	//width: number;
	//style: any;
};

export class ExpandableMenu extends React.Component<ExpandableMenuProps, {}>{

	public constructor(props: ExpandableMenuProps) {
		super(props);
	}

	public handleItemClick(): void {
		console.log('menu area clicked');
	}

	public renderCards(): void {
	}

	public render(): JSX.Element {
		/* TODO
		 * display content areas as siblings of item titles in here!!
		 */
		return <div className='expandable-menu' onClick={ this.handleItemClick }>
					{this.props.children}
				</div>;
	}
};

export interface ExpandableMenuItemProps {
	headerText: string;
	onClick: Function;
};

export interface ExpandableMenuItemState {
	showContent: boolean;
}

export class ExpandableMenuItem extends React.Component<ExpandableMenuItemProps, ExpandableMenuItemState> {

	public constructor(props: ExpandableMenuItemProps) {
		super(props);
		this.state = { showContent: false };
	}

	public handleClick(): void {
		console.log('menu item clicked');
		this.state.showContent = !this.state.showContent;
		this.setState(this.state);
		this.props.onClick()	//TODO Do I need to pass this.id? Can i remove this entirely?
	}

	/*private getContentArea(): JSX.Element {
		let contentAreaId: string = this.props.content;

		return <MashIngredients />
	}*/

	public render(): JSX.Element {
		/* TODO
		 * Get this.props.children (the input-screen) to display as a sibling of this elements siblings
		 */
		return <div className='expandable-menu-item' onClick={ this.handleClick.bind(this) }>
					{this.props.headerText}
					{this.state.showContent ? this.props.children : null}
				</div>;
				//<div>{this.state.showContent ? this.props.children : null}</div>;
	}
};