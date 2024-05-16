/**
 * I might have gone a little overboard on this one...
 * My idea was to remove any duplicate descriptions by associating room descriptions
 * with the rooms they're describing. Unfortunately, that requires extra logic / tracking
 * to ensure that rooms don't re-describe themselves when they're "entered" twice in a row.
 *
 * This should mean that the code is much more maintainable / expandable. For example, adding
 * a new room now requires substantially less modification of the existing rooms. And there's less
 * nesting!
 */

type Room = "Start" | "A" | "B" | "C" | "Exit";

/**
 * Class to track the player's status.
 */
class PlayerStatus {
  room: Room = "Start";
  hasKey: boolean = false;
  windowOpen: boolean = false;
}

/**
 * Base class for room objects.
 */
abstract class RoomObj {
  abstract room: Room;
  /**
   * Describes the current room.
   * @param status - The player's current status.
   */
  abstract describe(status: PlayerStatus): void;

  /**
   * Processes the command given by the player.
   * @param command - The command entered by the player.
   * @param status - The player's current status.
   * @returns The next room the player moves to.
   */
  abstract process_command(command: string, status: PlayerStatus): Room;

  /**
   * Handles the player entering the room.
   * @param status - The player's current status.
   * @returns The next room the player moves to.
   */
  enter(status: PlayerStatus) {
    this.describe(status);
    status.room = this.room;
    let command = PromptNonEmpty("Please enter a command.");
    return this.process_command(command, status);
  }
}

function PromptNonEmpty(message: string): string {
  console.warn(message);
  let input: string | null = prompt(message);
  while(input == null || input == "") {
    console.error("Invalid input.");
    input = prompt(message);
  }
  console.log(input);
  return input;
}


class RoomGrid {
  rooms: (RoomObj|null)[][];
  constructor(x: number, y: number){
    this.rooms = [];

    for(var i: number = 0; i < x; i++) {
        this.rooms[i] = [];
        for(var j: number = 0; j< y; j++) {
            this.rooms[i][j] = null;
        }
    }
  }
}

export function play(): void {
  let room_grid = new RoomGrid(3, 3);
  console.info("Welcome to the text adventure! Open your browser's developer console to play.");

  let playerName = PromptNonEmpty("Please enter your name.");

  console.info("You have exited the building. You win!");
  console.info("Congratulations, " + playerName + "!");
}

