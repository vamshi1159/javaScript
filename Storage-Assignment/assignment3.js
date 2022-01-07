
class LocalStorage
{
 static  increment()
  {
    let value;
    if(!localStorage.getItem('count'))
    {
      value=0;
      localStorage.setItem('count',JSON.stringify(value));
    }
    else
    {
      value=localStorage.getItem('count');
      value++;
      localStorage.setItem('count',JSON.stringify(value));
    }
    console.log(value);
    return value;
  }
 
  static decrement()
  {
    let value;
    if(!localStorage.getItem('count'))
    {
      value=0;
      localStorage.setItem('count',JSON.stringify(value));
    }
    else
    {
      value=localStorage.getItem('count');
      value--;
      localStorage.setItem('count',JSON.stringify(value));
    }
    return value;
  }
  static display()
  {
    let value;
    if(!localStorage.getItem('count'))
    {
      value=0;
      localStorage.setItem('count',JSON.stringify(value));
    }
    else
    {
      value=localStorage.getItem('count');
    }
    const ui=new UI();
    ui.displayLocalContent(value);
  }
}
class SessionStorage
{
 static  increment()
  {
    let value;
    if(!sessionStorage.getItem('count'))
    {
      value=0;
      sessionStorage.setItem('count',JSON.stringify(value));
    }
    else
    {
      value=sessionStorage.getItem('count');
      value++;
      sessionStorage.setItem('count',JSON.stringify(value));
    }
    console.log(value);
    return value;
  }
 
  static decrement()
  {
    let value;
    if(!sessionStorage.getItem('count'))
    {
      value=0;
      sessionStorage.setItem('count',JSON.stringify(value));
    }
    else
    {
      value=sessionStorage.getItem('count');
      value--;
      sessionStorage.setItem('count',JSON.stringify(value));
    }
    return value;
  }
  static display()
  {
    let value;
    if(!sessionStorage.getItem('count'))
    {
      value=0;
      sessionStorage.setItem('count',JSON.stringify(value));
    }
    else
    {
      value=sessionStorage.getItem('count');
    }
    const ui=new UI();
    ui.displaySessionContent(value);
  }
}
class UI
{
   displayLocalContent(x)
  {
    
    document.getElementById('localValue').innerHTML=x;
  }
  displaySessionContent(x)
  {
    document.getElementById('sessionValue').innerHTML=x; 
  }
}

document.addEventListener('DOMContentLoaded',LocalStorage.display);
document.addEventListener('DOMContentLoaded',SessionStorage.display);
document.getElementById('incrementLocal').addEventListener('click',function(e)
{
 var val=LocalStorage.increment();
 LocalStorage.display(val);
});
document.getElementById('decrementLocal').addEventListener('click',function(e)
{
 var val=LocalStorage.decrement();
 LocalStorage.display(val);
});
document.getElementById('incrementSession').addEventListener('click',function(e)
{
 var val=SessionStorage.increment();
 SessionStorage.display(val);
});
document.getElementById('decrementSession').addEventListener('click',function(e)
{
 var val=SessionStorage.decrement();
 SessionStorage.display(val);
});

