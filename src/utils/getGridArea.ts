import { GRID_AREAS } from "../constants"

export const getGridArea = (precipitation: boolean, alerts: boolean) => {
	if (precipitation && alerts) {
		return GRID_AREAS.both
	} else if (precipitation) {
		return GRID_AREAS.willPreciptate
	} else if (alerts) {
		return GRID_AREAS.alerts
	}
	return GRID_AREAS.def
}
