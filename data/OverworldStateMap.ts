import DemoRoom from './maps/DemoRoom';
import Kitchen from './maps/Kitchen';
import Street from './maps/Street';

const OverworldMaps: Partial<Record<MapName, OverworldConfig>> = {
	DemoRoom,
	Kitchen,
	Street,
};

export default OverworldMaps;
