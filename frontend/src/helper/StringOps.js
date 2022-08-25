export function breakPipe(s) {
  let curr = [];
  let now = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "|") {
      curr.push(now);
      now = "";
    } else {
      now = now + s[i];
      if(i == s.length - 1){
        curr.push(now);
      }
    }
  }
  return curr;
}
