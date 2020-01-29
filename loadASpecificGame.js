function pickAPromptGroup()
{
  let randomPromptGroupIndex = getRandomIntInclusive(0, arrayOfLogicalPromptAnswerGroupings.length - 1);
  let randomPromptGroup = arrayOfLogicalPromptAnswerGroupings[randomPromptGroupIndex];
}
