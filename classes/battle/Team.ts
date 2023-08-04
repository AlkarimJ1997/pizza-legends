import type { Combatant } from "@/classes/battle/Combatant";
import { TEAMS } from "@/utils/consts";

export class Team {
  owner: keyof typeof TEAMS;
  name: string;
  combatants: Combatant[] = [];

  constructor(owner: keyof typeof TEAMS, name: string) {
    this.owner = owner;
    this.name = name;
  }
}
