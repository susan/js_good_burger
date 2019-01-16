document.addEventListener("DOMContentLoaded", () => {
  //Implement Your Code Here
})

//*******************
//variables here
//*******************
const menu = document.querySelector("#burger-menu");
const burgerURL = "http://localhost:3000/burgers"
const postURL= "http://localhost:3000/burgers"
let burgerInfo =[];
let orderList = document.querySelector("#order-list");

  const customPostForm= document.querySelector("#custom-burger")
 // const burgerName = document.querySelector("#burger-name").value
 // const burgerDescription = document.querySelector("#burger-description").value
 // const burgerImage = document.querySelector("#burger-image").value



//*******************
// on load fetch actions
//*******************
  fetch(burgerURL)
  .then(function(response) {
	   return response.json();
  })
  .then(function (parsedJSON){
  	//console.log(parsedJSON)
    burgerInfo = parsedJSON;
    //console.log(burgerInfo)
    //use helper function to get them onto page
    burgerInfo.forEach(burgerMaker);

   });


  // fetch(postURL,
  // {
  // 	method: 'POST',
  // 	headers: {
  // "Content-Type": "application/json",
  // },
  // 	body: JSON.stringify({
  // 	     name: burgerName,
  //        description: burgerDescription,
  //        image: burgerImage
  //        })

  //  }).then(function(response){
  //    return (response.json());
  //    console.log(response.json());
  //  })
  // .then(console.log)
  // //had to post to server, then any internal data, then rerender?


 //*******************
//listeners
//input is on click of button, takes order and appends to orderList
//can i attach this to the menu?

    menu.addEventListener("click", function(event) {
     //console.log(event); //is the button
     if (event.target.className === "button"){
    	//console.log(event.target.childNodes[3]);
   	    let newLi = document.createElement("li")
    	    newLi.innerHTML= event.target.parentNode.childNodes[0].innerHTML
         orderList.append(newLi);
      }
 });



customPostForm.addEventListener("submit", function (event){
  //stop it from posting to itself
	 event.preventDefault();
   console.log(event.target);

   const burgerName = event.target.querySelector("#burger-name").value;
   const burgerDescription = event.target.querySelector("#burger-description").value;
   const burgerImage = event.target.querySelector("#burger-image").value;
//call fetch up here
//
//helper method whose job it is to fetch (make an object with burgerName, desecription adn image
//and json is useful)
  fetch(postURL,
  {
  	method: 'POST',
  	headers: {
  "Content-Type": "application/json",
  },
  	body: JSON.stringify({
  	     name: burgerName,
         description: burgerDescription,
         image: burgerImage
         })

   }).then(function(response){
     return (response.json());
     //console.log(response.json());
     })
     .then(function(data) {
  	//server sends back newly created thing!
  //had to post to server, then any internal data, then rerender?
     console.log(data);
         // menu.innerHTML +=
         burgerMaker(data)
         //we already have it appended as part of the burgerMaker
        //              <div>
        //               <h3>${data.burgerName} </h3>
        //               <img src="${data.burgerImage}" >
        //               <p>  ${data.burgerDescription}  </p>
        //              </div>
        //             `
        })
     });
//this one on line 113 is end of listener
//im getting an error, it is on the page but im not rerendering
//also what about pulling out json
//also refactoring


//*******************
//helper functions
//*******************


    function burgerMaker(burger){
       const div = document.createElement("div")
       div.className = "burger";
       div.width = "250 px";
       const h3 = document.createElement("h3")
       h3.className = "burger_title";
       h3.innerHTML= burger.name
       const img = document.createElement("img")
       img.src =burger.image
       img.style.width = "200 px"
       img.style.height = "200 px"
       const p = document.createElement("p")
       p.className = "burger_description";
       p.innerHTML = burger.description
       const button = document.createElement("button")
       button.className = "button"
       button.dataSet = "alert";
       button.innerHTML = "Add to Order";
       menu.append(div);
       div.append(h3);
       div.append(img);
       div.append(p);
       div.append(button);
       //console.log(div);
     };
