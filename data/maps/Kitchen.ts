import { BEHAVIOR_TYPES, MAPS, PLACEMENT_TYPES, SKINS } from '@/utils/consts';

const OVERWORLD_STATE: OverworldConfig = {
	map: MAPS.Kitchen,
	placements: [
		{ id: 'hero', x: 5, y: 4, skin: SKINS.HERO, type: PLACEMENT_TYPES.HERO },
		{
			id: 'npcB',
			x: 10,
			y: 7,
			skin: SKINS.NPC3,
			type: PLACEMENT_TYPES.NPC,
			talking: [
				{
					events: [
						{
							type: BEHAVIOR_TYPES.MESSAGE,
							text: 'You made it!',
							faceHero: 'npcB',
						},
					],
				},
			],
		},
	],
};

export default OVERWORLD_STATE;
