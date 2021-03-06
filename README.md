# Magic Forest / Inference Engine

Made for the 3rd workshop of Artificial Intelligence @ UQAC.

This is a maze problem solved by an inference engine.  The character has to escape the forest by taking the portal and avoiding dangers (monsters & rifts). The game is infinite, as the portal will only teleport him to an even bigger forest ! Once dead, the game restart again.


![Gif](https://github.com/stressGC/NodeJS-Inference-Engine/blob/master/report/demo.gif)
![Legend](https://github.com/stressGC/NodeJS-Inference-Engine/blob/master/report/legend.png)

## I] Requirements

- [git](https://git-scm.com/downloads) to download the source code

- [node](https://nodejs.org/en/download/) to execute the code

## II] Installation

Clone the project to your local machine:
```bash
git clone https://github.com/stressGC/NodeJS-Inference-Engine.git
cd NodeJS-Inference-Engine
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

The time between each plays can be configured in the [**config** file](https://github.com/stressGC/NodeJS-Inference-Engine/blob/master/config.js)

## IV] Structure

All the code related to the map generation is in the [**env** folder](https://github.com/stressGC/NodeJS-Inference-Model/tree/master/env).

The [**bot** folder](https://github.com/stressGC/NodeJS-Inference-Model/tree/master/bot) folder contains everything about our agent: its creation, its inference engine and its sensors / effectors.

The config file is the place where every constants is defined.
The display file is a script to "beautifully" display the forest.
The utils file is a custom made library for usual functions of this problem.

## V] Logic : Inference Engine

The agent logic is an inference engine. All the rules can be found in [**rules** folder](https://github.com/stressGC/NodeJS-Inference-Model/tree/master/bot/logic/rules). They are applied in the following order :

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


## VI] Actions
The agent can do the following actions :

- **GOTO (x,y)** : he moves itself to a certain cell

- **WIN** : he takes the portal and wins

- **UPDATE_KNOWLEDGE** : updates its knowledge based on the informations the inference engine has computed.
- **DEAD** : the agent died, game restarts

- **SHOOT (x,y)** : the agent shoots at a certain place

## VII] Results

The current state of the forest will be printed live in your console.

![Gif](https://github.com/stressGC/NodeJS-Inference-Engine/blob/master/report/demo.gif)
![Legend](https://github.com/stressGC/NodeJS-Inference-Engine/blob/master/report/legend.png)

## VIII] Authors

[A. Demon](https://github.com/LudoCruchot)
[A. de la Taile](https://github.com/Adlt92)

## IX] Licence

MIT License

Copyright (c) 2018 Georges Cosson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.