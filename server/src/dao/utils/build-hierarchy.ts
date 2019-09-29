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
	const convertedById: { [key: string]: INeo4jRecord<ICollection> } = { };

	_.each(response, record => {
		const relationship = record.r && record.r[record.r.length - 1];
		if (!relationship) {
			collections.push(record.a.properties);
			convertedById[record.a.identity] = record.a;
			return; // continue
		}
		const convertedA = record.a ? findNodeInTree(collections, record.a.properties.uuid) : null;
		if (!convertedA && record.a) {
			let bothNodesConverted = false;
			if (record.b && relationship.end === record.b.identity) {
				record.a.properties.content = [record.b.properties];
				convertedById[record.b.identity] = record.b;
				bothNodesConverted = true;
			}
			collections.push(record.a.properties);
			convertedById[record.a.identity] = record.a;
			if (bothNodesConverted) {
				return;
			}
		}
		const convertedStart = findNodeInTree(
			collections,
			convertedById[relationship.start].properties.uuid,
		);
		const convertedB = record.b ? findNodeInTree(collections, record.b.properties.uuid) : null;
		if (!convertedB && record.b) {
			convertedStart.content = [...(convertedStart.content || []), record.b.properties];
			convertedById[record.b.identity] = record.b;
		}
	});

	return collections;
}
