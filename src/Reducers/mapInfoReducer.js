import * as actions from '../Actions/mapInfoActions';
import * as mapActions from '../Actions/mapActions';
import * as selectActions from '../Actions/mapSelectActions';
import * as filterSearchActions from '../Actions/filterSearchMapAction';

import * as MapLayerType from '../components/map/mapLayerTypes';

import { combineReducers } from 'redux';

const mapDataInitialState = {
	mapStoredData: {
		UC: null,
		TEHSIL: null,
		DISTRICT: null,
		PROVINCE: null,
		NATIONAL: null,
		LSO: null,
	},
	mapLayerToDisplay: MapLayerType.NONE,
	loadingMapLayer: false,
	mapLayerLoadedpercent: null,
	// mapLayerButtonNumber: null,
	hasErrorLoadingMapLayer: false,
	fetchedMapLayer: false,
};

function mapDataReducer(state = mapDataInitialState, action) {
	switch (action.type) {
		case mapActions.LOAD_LAYER_RESET:
			return {
				...state,
				//Do i even need this actually... check later
			};
		case mapActions.LOAD_LSO_LAYER:
			return {
				...state,
				loadingMapLayer: true,
				hasErrorLoadingMapLayer: false,
				fetchedMapLayer: false,
			};
		case mapActions.LOAD_LSO_LAYER_SUCCESS:
			return {
				...state,
				loadingMapLayer: false,
				fetchedMapLayer: true,
				mapStoredData: {
					...state.mapStoredData,
					LSO: action.payload,
				},
				mapLayerToDisplay: MapLayerType.LSO,
			};
		case mapActions.LOAD_LSO_LAYER_FAILURE:
			return {
				...state,
				hasErrorLoadingMapLayer: true,
				loadingMapLayer: false,
			};
		case mapActions.LOAD_NATIONAL_LAYER:
			return {
				...state,
				loadingMapLayer: true,
				hasErrorLoadingMapLayer: false,
				fetchedMapLayer: false,
			};
		case mapActions.LOAD_NATIONAL_LAYER_SUCCESS:
			return {
				...state,
				loadingMapLayer: false,
				fetchedMapLayer: true,
				mapStoredData: {
					...state.mapStoredData,
					NATIONAL: action.payload,
				},
			};
		case mapActions.LOAD_NATIONAL_LAYER_FAILURE:
			return {
				...state,
				hasErrorLoadingMapLayer: true,
				loadingMapLayer: false,
			};
		case mapActions.LOAD_LAYER:
			return {
				...state,
				loadingMapLayer: true,
				hasErrorLoadingMapLayer: false,
				fetchedMapLayer: false,
			};
		case mapActions.LOAD_LAYER_UPDATE:
			return {
				...state,
				mapLayerLoadedpercent: (action) => {
					if (action.payload.lengthComputable) {
						return (action.payload.loaded - action.payload.total) * 100;
					} else {
						return null;
					}
				},
			};
		case mapActions.LOAD_LAYER_CACHED:
			return {
				...state,
				mapLayerToDisplay: action.payload,
			};
		case mapActions.LOAD_LAYER_SUCCESS:
			switch (action.payload.mapLayerType) {
				case MapLayerType.NONE:
					return {
						...state,
						mapLayerToDisplay: MapLayerType.NONE,
					};
				case MapLayerType.UC:
					return {
						...state,
						mapStoredData: {
							...state.mapStoredData,
							UC: action.payload.layerData,
						},
						mapLayerToDisplay: action.payload.mapLayerType,
						loadingMapLayer: false,
						fetchedMapLayer: true,
					};
				case MapLayerType.TEHSIL:
					return {
						...state,
						mapStoredData: {
							...state.mapStoredData,
							TEHSIL: action.payload.layerData,
						},
						mapLayerToDisplay: action.payload.mapLayerType,
						loadingMapLayer: false,
						fetchedMapLayer: true,
					};
				case MapLayerType.DISTRICT:
					return {
						...state,
						mapStoredData: {
							...state.mapStoredData,
							DISTRICT: action.payload.layerData,
						},
						mapLayerToDisplay: action.payload.mapLayerType,
						loadingMapLayer: false,
						fetchedMapLayer: true,
					};
				case MapLayerType.PROVINCE:
					return {
						...state,
						mapStoredData: {
							...state.mapStoredData,
							PROVINCE: action.payload.layerData,
						},
						mapLayerToDisplay: action.payload.mapLayerType,
						loadingMapLayer: false,
						fetchedMapLayer: true,
					};
				default:
					return state;
			}
		case mapActions.LOAD_LAYER_FAILURE:
			return {
				...state,
				hasErrorLoadingMapLayer: true,
			};
		default:
			return state;
	}
}

const mapActionInitialState = {
	loading: false,
	hasErros: false,
	fetched: false,
	mapMode: 'PROJECTS',
	objects: [],
	selectedObject: null,
	justSelected: false,
	mapLayer: 'NONE',
	showList: true,
	filterCategory: 'all',
	filter: 'all',
	search: '',
	showModal: false,
	selectedProject: null,
};

function mapActionReducer(state = mapActionInitialState, action) {
	switch (action.type) {
		case actions.GET_MAP_INFO:
			return {
				...state,
				loading: true,
			};
		case actions.GET_MAP_INFO_SUCCESS:
			return {
				...state,
				loading: false,
				fetched: true,
				objects: action.payload,
			};
		case actions.GET_MAP_INFO_FAILURE:
			return {
				...state,
				loading: false,
				hasErros: true,
				fetched: false,
			};
		case actions.GET_MAP_RESET_FETCH:
			return {
				...state,
				fetched: false,
				hasErros: false,
				loading: false,
			};
		case selectActions.SELECT_OBJECT:
			return {
				...state,
				selectedObject: action.payload,
				justSelected: true,
			};
		case selectActions.TOGGLE_SHOW_LIST:
			return {
				...state,
				showList: !state.showList,
			};
		case selectActions.JUST_SELECTED_OBJECT:
			return {
				...state,
				justSelected: false,
			};
		case selectActions.SELECTED_PROJECT_MARKER:
			return {
				...state,
				selectedProject: action.payload,
			};
		case selectActions.CHANGE_MAP_MODE:
			return {
				...state,
				mapMode: action.payload,
				filter: 'all',
				filterCategory: 'all',
			};
		case selectActions.TOGGLE_MAP_MODAL:
			return {
				...state,
				showModal: !state.showModal,
			};
		case filterSearchActions.FILTER_EVENT:
			return {
				...state,
				filter: action.payload,
			};
		case filterSearchActions.FILTER_CATEGORY_TYPE:
			return {
				...state,
				filterCategory: action.payload,
			};
		case filterSearchActions.SEARCH_EVENT:
			return {
				...state,
				search: action.payload.toLowerCase(),
			};
		default:
			return state;
	}
}

const mapInfoReducer = combineReducers({
	mapActions: mapActionReducer,
	mapData: mapDataReducer,
});

export default mapInfoReducer;
