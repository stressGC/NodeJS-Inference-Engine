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

## IV] Structure

All the code related to the map generation is in the "env" folder.

The "bot" folder contains everything about our agent: its creation, its inference engine and its sensors / effectors.

## V] Inference Engine

The agent is based on an inference engine. All the rules can be found in "bot/logic". They are applied in the following order :

- **Rule 1: Death Check**

This rule checks weither the agent is dead or not (= he moved to a monster or a rift). If the agent is dead, an action _*DEAD*_ will be passed back, causing its death.

- **Rule 2: Win Check**

This rule checks if the agent escaped the forest (= he found the portal).If the agent has found the portal, an action _*WIN*_ will be passed back, triggering the next level forest.

- **Rule 3: Possible Moves**

This rule loops through the forest and lists the possible moves.

- **Rule 4: Safe Filter**

This rule iterates through the possible moves and selects only the one that are safe. If a safe cell is found, an action _*GOTO*_ is passed, else the logic continues through the engine.

- **Rule 5: Compute Border Cells**

This rule computes the cells that are at the edge of the unknown.

- **Rule 6: Detect Obvious Danger**

This rule checks every cell in the forest to see if it is an obvious danger. If so, returns an action _*UPDATE_KNOWLEDGE*_ is passed.

- **Rule 7: Shot Possible**

This rule checks if we are blocked by monster(s). If it's the case, the rule will determine where the monsters may be, and an action _*SHOOT*_ will be passed.

- **Rule 8: Random Move**

This rule is quite the trash of the inference engine, if no other solution has been found, then a random _*GOTO*_ action will be send back.

## V] Results

All the current computing steps will be printed in console for each forest.

![Screenshot of a result](https://github.com/stressGC/python-backtracking-CSP-sudoku-solver/blob/master/img/result.png "Screenshot of a result")
