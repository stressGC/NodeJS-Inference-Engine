# Logical Agent
## Agent / logical formalism

## I] Requirements

- [git](https://git-scm.com/downloads) to download the source code

- [node](https://nodejs.org/en/download/) to execute the code

## II] Installation

Clone the project to your local machine:
```bash
git clone https://github.com/stressGC/TD3_Ia.git
cd TD3_la
```

You will need to install npm modules :
```bash
npm install
```

## III] Execution

start the code
```bash
node index.js
```

## IV] Principles

All the code related to the map generation is in the "env" folder.

The "bot" folder contains everything about our agent: its creation, its inference engine and its sensors / effectors.

The agent is based on an inference engine. All the rules can be found in "bot/logic". They are applied in the following order :

- **Rule 1: Death Check**
This rule checks weither the agent is dead or not (= he moved to a monster or a rift).
- **Rule 2: Win Check**
This rule checks if the agent escaped the forest (= he found the portal).
- **Rule 3: Possible Moves**
This rule loops through the forest and lists the possible moves.
- **Rule 4: Safe Filter**
This rule iterates through the possible moves and selects only the one that are safe. If safe move is found, then do it, else continue through the engine.
- **Rule 5: Compute Border Cells**
This rule computes the cells that are at the edge of the unknown.
- **Rule 6: Detect Obvious danger**
This rule makes it possible to identify an imminent danger and donations not to go on the box in question.

## V] Result

All the current computing steps will be printed in console for each forest.

![Screenshot of a result](https://github.com/stressGC/python-backtracking-CSP-sudoku-solver/blob/master/img/result.png "Screenshot of a result")
