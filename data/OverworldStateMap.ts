import DemoRoom from './maps/DemoRoom';
import Kitchen from './maps/Kitchen';

const OverworldMaps: Partial<Record<MapName, OverworldConfig>> = {
	DemoRoom,
	Kitchen,
};

export default OverworldMaps;
