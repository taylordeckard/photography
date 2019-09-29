import { Subject } from 'rxjs';
import { Collection } from './types';

export interface SharedStateChanges  {
	selectedCollection?: Collection;
}

class SharedStateClass {
	private _selectedCollection?: Collection;
	public changes: Subject<SharedStateChanges> = new Subject<SharedStateChanges>();
	public get current () {
		return {
			selectedCollection: this._selectedCollection,
		};
	}
	public get selectedCollection () {
		return this._selectedCollection;
	}
	public set selectedCollection (c: Collection | undefined) {
		this._selectedCollection = c;
		this.changes.next({ selectedCollection: this.selectedCollection });
	}

}

export const SharedState = new SharedStateClass();
