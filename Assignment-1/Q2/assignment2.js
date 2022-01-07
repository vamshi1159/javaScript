function firstLetterWord(first,last)
{
  return (first[0].concat(last[0])).toUpperCase();
}
document.getElementById("form").addEventListener("submit", ()=>
{
  var firstName=document.getElementById("first").value;
  var lastName=document.getElementById("last").value;
  
  const result=firstLetterWord(firstName,lastName);
  var div=document.getElementById("result");
  var p=document.createElement("p");
  p.innerHTML=result;
  div.append(p);
});
