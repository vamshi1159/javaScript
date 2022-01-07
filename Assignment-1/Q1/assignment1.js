const users=
[
  {name:'ram',email:'ram@gmail.com',age:22},
  {name:'raghu',email:'raghu@gmail.com',age:21},
  {name:'raju',email:'raju@gmail.com',age:22},
  {name:'ravi',email:'ravii@gmail.com',age:23}
];


function createUser(user,getAllUsers)
{
  //create function takes 2 argument user and getAllUsers is the call back function
      users.push(user);
      getAllUsers();
}

function getUsers()
{
  setTimeout(()=>{
    let result='';
  users.forEach(user => {
    result+=`<p>${user.name} is a user with email ${user.email} and age ${user.age}</p>`;
  });
  document.body.innerHTML=result;
  },1000);

}


//invoking the function getUsers is a function passed as argument to the function
createUser({name:'ramesh',email:'ramesh@gmail.com',age:23},getUsers);