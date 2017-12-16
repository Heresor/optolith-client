import * as ActionTypes from '../constants/ActionTypes';
import { get } from '../selectors/dependentInstancesSelectors';
import { isInCharacterCreation } from '../selectors/phaseSelectors';
import { getAdventurePoints, getLocaleMessages, getSkills } from '../selectors/stateSelectors';
import { AsyncAction } from '../types/actions.d';
import { TalentInstance } from '../types/data.d';
import { _translate } from '../utils/I18n';
import { getDecreaseCost, getIncreaseCost } from '../utils/IncreasableUtils';
import { addAlert } from './AlertActions';

export interface AddTalentPointAction {
	type: ActionTypes.ADD_TALENT_POINT;
	payload: {
		id: string;
		cost: number;
	};
}

export function _addPoint(id: string): AsyncAction {
	return (dispatch, getState) => {
		const state = getState();
		const cost = getIncreaseCost(getSkills(state).get(id)!, getAdventurePoints(state), isInCharacterCreation(state));
		const messages = getLocaleMessages(state);
		if (messages) {
			if (!cost) {
				dispatch(addAlert({
					title: _translate(messages, 'notenoughap.title'),
					message: _translate(messages, 'notenoughap.content'),
				}));
			}
			else {
				dispatch<AddTalentPointAction>({
					type: ActionTypes.ADD_TALENT_POINT,
					payload: {
						id,
						cost
					}
				});
			}
		}
	};
}

export interface RemoveTalentPointAction {
	type: ActionTypes.REMOVE_TALENT_POINT;
	payload: {
		id: string;
		cost: number;
	};
}

export function _removePoint(id: string): AsyncAction {
	return (dispatch, getState) => {
		const cost = getDecreaseCost(getSkills(getState()).get(id)!);
		dispatch<RemoveTalentPointAction>({
			type: ActionTypes.REMOVE_TALENT_POINT,
			payload: {
				id,
				cost
			}
		});
	};
}

export interface SetTalentsSortOrderAction {
	type: ActionTypes.SET_TALENTS_SORT_ORDER;
	payload: {
		sortOrder: string;
	};
}

export function _setSortOrder(sortOrder: string): SetTalentsSortOrderAction {
	return {
		type: ActionTypes.SET_TALENTS_SORT_ORDER,
		payload: {
			sortOrder
		}
	};
}

export interface SwitchTalentRatingVisibilityAction {
	type: ActionTypes.SWITCH_TALENT_RATING_VISIBILITY;
}

export function _switchRatingVisibility(): SwitchTalentRatingVisibilityAction {
	return {
		type: ActionTypes.SWITCH_TALENT_RATING_VISIBILITY
	};
}
