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
 * Abstract base class for room objects.
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

class RoomA extends RoomObj {
  room: Room = "A";
  describe(status: PlayerStatus): void {
    if(status.room != this.room) {
      console.info("You are in an empty room. There are doors on the north and west walls of this room.");
    }
  }

  process_command(command: string, status: PlayerStatus): Room {
    switch (command) {
      case "west":
        return "B";
      case "north":
        if (status.hasKey) {
          console.info("You unlock the north door with the key and go through the door.");
          return "C";
        } else {
          console.error("You try to open the north door, but it is locked.");
          return "A";
        }
      default:
        console.error("Unrecognized command.");
        return "A";
    }
  }
}

class RoomB extends RoomObj {
  room: Room = "B";
  describe(status: PlayerStatus): void {
    if (status.room != this.room) {
      console.info("You go through the west door. You are in a room with a table.");
      if (!status.hasKey) {
        console.info("On the table there is a key.");
      }
      console.info("There is a door on the east wall of this room.");
    }
  }
  process_command(command: string, status: PlayerStatus): Room {
    switch (command) {
      case "east":
        return "A";
      case "take key":
        if (status.hasKey) {
          console.error("You already have the key.");
        } else {
          console.info("You take the key from the table.");
          status.hasKey = true;
        }
        return "B";
      default:
        console.error("Unrecognized command.");
        return "B";
    }
  }
}

class RoomC extends RoomObj {
  room: Room = "C";
  describe(status: PlayerStatus): void {
    if (status.room != this.room) {
      console.info("You are in a bright room. There is a door on the south wall of this room and a window on the east wall.");
    }
  }
  process_command(command: string, status: PlayerStatus): Room {
    switch (command) {
      case "south":
        return "A";
      case "east":
        if (status.windowOpen) {
          console.info("You step out from the open window.");
          return "Exit";
        }
        console.error("The window is closed.");
        return "C";
      case "open window":
        if (status.windowOpen) {
          console.error("The window is already open.");
        } else {
          console.info("You open the window.");
          status.windowOpen = true;
        }
        return "C";
      default:
        console.error("Unrecognized command.");
        return "C";
    }
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


const rooms = {
  "Start": new RoomA(),
  "A": new RoomA(),
  "B": new RoomB(),
  "C": new RoomC(),
};

export function play(): void {
  console.info("Welcome to the text adventure! Open your browser's developer console to play.");

  let playerName = PromptNonEmpty("Please enter your name.");

  console.info("Hello, " + playerName + ".");
  console.info("You are in a building. Your goal is to exit this building.");

  let status = new PlayerStatus();
  let currentRoom: Room = "Start";
  while (currentRoom != "Exit") {
    currentRoom = rooms[currentRoom].enter(status)
  }

  console.info("You have exited the building. You win!");
  console.info("Congratulations, " + playerName + "!");
}

