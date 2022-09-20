export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function removeCameCase(s) {
  let an = s.toUpperCase();

  let ans = "";
  ans += an[0];
  for (let j = 1; j < s.length; j++) {
    if (isNaN(s[j]) && s[j] === an[j]) {
      ans += " ";
      ans += s[j];
    } else {
      ans += s[j];
    }
  }
  return ans;
}


export function makeStringDate(year, month, day) {
  let ans = "";
  ans += year.toString();
  ans += "-";
   if (month < 10) ans += "0";
  ans += month.toString();
  ans += "-";
   if (day < 10) ans += "0";

  ans += day.toString();
  return ans;
}