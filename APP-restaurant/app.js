const menuItems = [
    {
        id : 1,
        name : "Crispy corn",
        price : 150,
        category : "starters"
  
    },
    {
        id : 2,
        name :  "Spring rolls",
        price : 180,
        category : "starters"
    },
  {
      id : 3,
      name : "Chicken biryani",
      price : 250,
      category : "biryani"
  },
  
  {
      id : 4,
      name : "Butter Naan",
      price : 60,
      category : "main"
  },
  {
      id : 5,
      name : "Veg Biryani",
      price : 300,
      category : "biryani"
  }
  ,
  {
      id : 6,
      name : "Paneer biryani",
      price : 250,
      category : "biryani"
  },
  {
      id : 7,
      name : "ice-cream",
      price : 100,
      category : "desserts"    
  }
  
];
const table = [
    {
        id : 1,
        name : "Table-1",
        itemList : new Map(),
        price : 0,
            
    },
    {
        id : 2,
        name : "Table-2",
        itemList : new Map(),
        price : 0,
        
    },
    {
        id : 3,
        name : "Table-3",
        itemList : new Map(),
        price : 0,
          
    }
  
  ];

document.addEventListener('DOMContentLoaded',()=>
{
   
  const menuList=document.querySelector(".menu-list");
  menuItems.forEach(item => {
     let node=`<div class='menu-list-item' draggable=true   id='menu-item-${item.id}'>
                <h2 id='name${item.id}'>${item.name}</h2>
                <h4 id='price${item.id}'>${item.price}.00</h4>
            </div>`;
            console.log(item.name);
        menuList.insertAdjacentHTML('beforebegin',node);
 });

 const tableList=document.querySelector(".table-list");
    table.forEach(table => {
     let node=`<div class='table-list-item' id='table-${table.id}' >
                    <h2 >${table.name}</h2>
                    <p>Bill : Rs.${table.price}| Total Items:${table.itemList.size}</p>
                 </div>`;
            console.log(table.name);
        tableList.insertAdjacentHTML('beforebegin',node);
 });
 var items=document.querySelectorAll(".menu-list-item");
var tables=document.querySelectorAll(".table-list-item");
for(let i=0;i<items.length;i++)
{
    items[i].addEventListener('dragstart',dragStart);
}
for(let i=0;i<tables.length;i++)
{
    tables[i].addEventListener('drop',drop);
    tables[i].addEventListener('dragover',allowDrop);
    tables[i].addEventListener('dragenter',dragEnter);
    tables[i].addEventListener('dragleave',dragLeave);
    tables[i].addEventListener('click',showModal);
    console.log("added");
}



});

document.getElementById("itemSearch").addEventListener('keyup',()=>
{
  
    var input=document.getElementById("itemSearch").value.toLowerCase();
    const listItem=  document.querySelectorAll(".menu-list-item");
   for(let i=0;i<listItem.length;i++)
   {
        console.log(i);
        let name=listItem[i].firstElementChild.innerHTML.toLowerCase();
        console.log(name);
        if(name.indexOf(input)!=-1 || menuItems[i]['category'].indexOf(input)!=-1)
        {
            listItem[i].style.display='';
        }
        else
        {
            listItem[i].style.display='none';
        }
   }

});
document.getElementById("tableSearch").addEventListener('keyup',()=>
{
  
    var input=document.getElementById("tableSearch").value.toLowerCase();
    const listItem=  document.querySelectorAll(".table-list-item");
   for(let i=0;i<listItem.length;i++)
   {
     
        let name=listItem[i].firstElementChild.innerHTML.toLowerCase();
        console.log(name);
        if(name.indexOf(input)!=-1)
        {
            listItem[i].style.display='';
        }
        else
        {
            listItem[i].style.display='none';
        }
   }

});

function dragStart(event){
    console.log("drag");
    event.dataTransfer.setData("itemId", event.target.id);
    console.log(event.target.id);
    console.log("get");
  }
  function drop(event)
  {
   
    
    console.log("drop");
    var itemId=event.dataTransfer.getData("itemId").match(/\d+/g)[0];
    var tableId=event.currentTarget.id.match(/\d+/g)[0];
    
    var newItem=menuItems[itemId-1];
    var price=0;
    if(table[tableId-1]['itemList'].has(newItem.id))
    {
        var noOfItems=table[tableId-1]['itemList'].get(newItem.id);
        table[tableId-1]['itemList'].set(newItem.id,noOfItems+1);
        
    }
    else
    {
        table[tableId-1]['itemList'].set(newItem.id,1); 
    }
    var list = document.getElementById(event.currentTarget.id);
    for(let orderedItem of table[tableId-1]['itemList'].entries() )
    {
        price+=menuItems[orderedItem[0]-1]['price']*orderedItem[1];
    }
    table[tableId-1]['price']=price;

    var node= `<p>Bill : Rs.${price} | Total Items:${table[tableId-1]['itemList'].size}</p>`;
    
      list.removeChild(list.lastElementChild);
      list.innerHTML+=node;
  }
  function allowDrop(event){
    event.preventDefault();

  }
  function dragEnter(event){
    event.preventDefault();
    
   
  }
  function dragLeave(event){
    console.log("leave");
    
  }
  function showModal(event){
      event.preventDefault();
      const tableId=event.currentTarget.id.match(/\d+/g)[0];
      console.log(tableId);
      const modal=document.getElementsByClassName("modal")[0];
      let header=
            `
            <div class='modal-header row' onclick="document.getElementById('modal').style.display='none';
            ">
                <div class='column'>Table-${tableId}</div>
                <div class='column'>
                    <div class='close'> &times;</div>
               </div>
            </div>
            `;
      let data=`<div class='modal-content'><table><thead>
                    <td>S.NO</td>
                    <td>Ordered Items</td>
                    <td>Price</td>
                    <td >No Of Servings </td>
                </thead><tbody>`;
      
    var i=1;
      for(let orderedItem of table[tableId-1]['itemList'].entries()  )
      {
        
        data+=`<tr>
                <td >${i}</td>
                <td class='table-${tableId}-item-${menuItems[orderedItem[0]-1]['id']}'>${menuItems[orderedItem[0]-1]['name']}</td>
                <td class='table-${tableId}-item-${menuItems[orderedItem[0]-1]['id']}'>${menuItems[orderedItem[0]-1]['price']}</td>
                <td class='table-${tableId}-item-${menuItems[orderedItem[0]-1]['id']}'><input type='number' min=0 id='input-${tableId}-item-${menuItems[orderedItem[0]-1]['id']}' onchange='update(event)' value='${orderedItem[1]}'/></td>
                <td class='table-${tableId}-item-${menuItems[orderedItem[0]-1]['id']}'><img class="trashicon"  src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png" styles="height:1px" onclick='deleteItem(event)'/></td>
            </tr>`;
            i++;
      }

      let bill=`<tr>
            <td></td>
            <td></td>
            <td >Total Bill</td>
            <td id='table-${tableId}-bill'>${table[tableId-1]['price']}</td></tr>`
      let last=`</tbody></table>
                <div class='button'>
                    <button class='generate' type="button" onclick='generateBill(event)' id="button-${tableId}" >Generate Bill</button>
                </div>
                </div>`;
      console.log(data );
      if(table[tableId-1]['itemList'].size===0)
      {
          modal.innerHTML=header+`<h1>No Orders Placed!</h1>`;
      }
      else
      {
        modal.innerHTML=header+data+bill+last;
      }
  
      document.getElementById('modal').style.display='block';
         
  }

  var deleteItem=(event)=>
  {
    let tableId=  event.currentTarget.parentNode.className.match(/\d+/g)[0];

    let itemId=  event.currentTarget.parentNode.className.match(/\d+/g)[1];
    event.currentTarget.parentNode.parentNode.remove();
    
    console.log(table[tableId-1]['itemList'].delete(parseInt(itemId)));
    
    updateBill(tableId);
  };

 
  var update=(event)=>
  {
      console.log("update");
      var input=document.getElementById(event.currentTarget.id).value;
      let tableId=  event.currentTarget.id.match(/\d+/g)[0];
      let itemId=  event.currentTarget.id.match(/\d+/g)[1];
      
      console.log("before");
      
      table[tableId-1]['itemList'].delete(parseInt(itemId));
      table[tableId-1]['itemList'].set(parseInt(itemId),parseInt(input));

      updateBill(tableId);

      
  };

var generateBill=(event)=>
{
    var tableId=  event.currentTarget.id.match(/\d+/g)[0];
    if(table[tableId-1]['price']!=0 && confirm(`Collect Rs. ${table[tableId-1]['price']} `))
    {
       
        table[tableId-1]['itemList'].clear();
        table[tableId-1]['price']=0;
        updateBill(tableId);
        document.getElementById('modal').style.display='none';
    }
};
var updateBill=(tableId)=>
{
    
    let price=0;
    console.log("after");
    for(let orderedItem of table[tableId-1]['itemList'].entries() )
      {
          console.log(orderedItem[0]+" "+orderedItem[1]);
          price+=menuItems[orderedItem[0]-1]['price']*orderedItem[1];
        
      }
      console.log("price"+price);
      table[tableId-1]['price']=price;
      var list=document.getElementById(`table-${tableId}`);
      console.log(list.innerHTML);
      var bill=document.getElementById(`table-${tableId}-bill`).parentNode;
      bill.removeChild(bill.lastElementChild);
      bill.innerHTML+=`<td id='table-${tableId}-bill'>${price}</td>`;
      var node= `<p>Bill : Rs.${price} | Total Items:${table[tableId-1]['itemList'].size}</p>`;
      list.removeChild(list.lastElementChild);
      list.innerHTML+=node;
}