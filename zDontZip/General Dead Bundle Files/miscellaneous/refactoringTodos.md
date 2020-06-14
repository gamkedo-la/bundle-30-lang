# Laundry list for initial refactoring of a specific game


- [ ] implement `<specificGame>.isPlaying()`, should return a boolean and replace `playerShouldBePlaying<SpecificGame>`
- [ ] implement `<specificGame>.startPlaying()`, should set whatever internal variables are required so `isPlaying` would return `true`.
- [ ] implement `<specificGame>.initialize()`, should replace game specific initialization code found in `initializeGameSettings.js`.
- [ ] implement `<specificGame>.stopPlaying()`, should set whatever internal variables are required so `isPlaying` would return `false`.
- [ ] implement `<specificGame>.update()`, should replace <specificGame>'s code found in the `gameSpecificUpdates` function in `main.js`.
- [ ] implement `<specificGame>.draw()`, should replace <specificGame>'s draw code found in `drawEverythingInTheGame` function in `main.js`.
- [ ] implement `<specificGame>.movePlayerCharacter()`, should replace <specificGame>'s player movement code found in `moveGameSpecificPlayer` function in `player.js`.
- [ ] implement `<specificGame>.drawBackground()`, should replace <specificGame>'s background draw code found in `drawGameSpecificBackground` function in `backgrounds.js`.
- [ ] debug <specificGame>
- [ ] move specific game global variables into <specificGame> class

