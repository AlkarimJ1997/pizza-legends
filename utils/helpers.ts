export const asGridCoord = (x: number, y: number) => `${x},${y}`;

export const emitEvent = (name: string, detail: { whoId: string }) => {
	const event = new CustomEvent(name, { detail });

	document.dispatchEvent(event);
};
