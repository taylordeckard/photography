import { ICollection, IExpectedHierarchyResponse, INeo4jRecord } from '@app/types';
import * as _ from 'lodash-es';

/**
 * Recursively finds nodes given uuid and a group of starting nodes
 */
export function findNodeInTree (nodes: ICollection[], uuid: string): ICollection {
	let match: ICollection = null;
	_.each(nodes, node => {
		// base case - node is found
		if (node.uuid === uuid) {
			match = node;
			return false; // break
		}

		if (node.content) {
			match = findNodeInTree(node.content as ICollection[], uuid);
		}
	});

	return match;
}

export function buildHierarchy (response: IExpectedHierarchyResponse[]): ICollection[] {
	const collections: ICollection[] = [];

	_.each(response, record => {
		let convertedA = record.a ? findNodeInTree(collections, record.a.properties.uuid) : null;
		const relationship = record.r ? record.r : null;
		if (!convertedA && record.a) {
			if (record.b) {
				record.a.properties.content = [record.b.properties];
			}
			collections.push(record.a.properties);
			convertedA = findNodeInTree(collections, record.a.properties.uuid);
		}

		const convertedB = record.b ? findNodeInTree(collections, record.b.properties.uuid) : null;
		if (!convertedB && record.b) {
			convertedA.content = [...(convertedA.content || []), record.b.properties];
		}
	});
	return collections;
}
