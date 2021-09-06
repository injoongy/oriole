export const getExclusiveSubstring = (existingNote: string, newNote: string) => {
  let exclusiveSubstring = '';
  // Given two strings (existingNote and newNote), check the substring of existingNote, 
  // starting from the whole string, to the whole string minus the first character, and so on
  // until the entirety of existingNote can be found within newNote.
  for (let i = 0; i < existingNote.length; i++) {
    if (newNote.includes(existingNote.substring(i))) {
      // return the substring of existingNote up until that point - a.k.a, the part that wasn't found
      exclusiveSubstring = existingNote.substring(0, i - 1);
      break;
    }
  }
  return exclusiveSubstring;
  // Since this is just checking from the beginning of existingNote forwards, it will not work if it
  // overlaps with newNote in part but also has characters unique to itself at the end of the string.
  // All of the unique characters MUST be at the beginning of the string.
};
